'use client';

import { useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { getSocket } from '@/lib/socket';
import type { editor } from 'monaco-editor';

interface User {
  id: string;
  name: string;
  color: string;
  cursor: { line: number; column: number } | null;
}

interface CodeEditorProps {
  roomId: string;
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
];

export default function CodeEditor({ roomId }: CodeEditorProps) {
  const [code, setCode] = useState('// Loading...\n');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState<User[]>([]);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isRemoteChange = useRef(false);
  const decorationsRef = useRef<string[]>([]);

  // Connect to socket and join room
  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-room', roomId);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    // Receive initial room state
    socket.on('room-state', (state: { code: string; language: string; users: User[] }) => {
      isRemoteChange.current = true;
      setCode(state.code);
      setLanguage(state.language);
      setUsers(state.users);
      isRemoteChange.current = false;
    });

    // Receive code changes from others
    socket.on('code-change', (newCode: string) => {
      isRemoteChange.current = true;
      setCode(newCode);
      isRemoteChange.current = false;
    });

    // Receive language changes
    socket.on('language-change', (newLanguage: string) => {
      setLanguage(newLanguage);
    });

    // User joined
    socket.on('user-joined', (user: User) => {
      setUsers(prev => [...prev, user]);
    });

    // User left
    socket.on('user-left', (userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    // Cursor updates
    socket.on('cursor-move', ({ id, cursor }: { id: string; cursor: { line: number; column: number } }) => {
      setUsers(prev => prev.map(u => 
        u.id === id ? { ...u, cursor } : u
      ));
    });

    // Connect if not already connected
    if (!socket.connected) {
      socket.connect();
    } else {
      setConnected(true);
      socket.emit('join-room', roomId);
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('room-state');
      socket.off('code-change');
      socket.off('language-change');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('cursor-move');
    };
  }, [roomId]);

  // Update remote cursors in editor
  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const model = editor.getModel();
    if (!model) return;

    // Clear old decorations
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);

    // Add decorations for each remote user's cursor
    const socket = getSocket();
    const newDecorations: editor.IModelDeltaDecoration[] = [];

    users.forEach(user => {
      if (user.id === socket.id || !user.cursor) return;

      newDecorations.push({
        range: {
          startLineNumber: user.cursor.line,
          startColumn: user.cursor.column,
          endLineNumber: user.cursor.line,
          endColumn: user.cursor.column + 1,
        },
        options: {
          className: 'remote-cursor',
          beforeContentClassName: 'remote-cursor-line',
          hoverMessage: { value: user.name },
          stickiness: 1,
        },
      });
    });

    decorationsRef.current = editor.deltaDecorations([], newDecorations);
  }, [users]);

  // Handle editor mount
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Send cursor position on selection change
    editor.onDidChangeCursorPosition((e) => {
      const socket = getSocket();
      socket.emit('cursor-move', {
        line: e.position.lineNumber,
        column: e.position.column,
      });
    });
  };

  // Handle code changes
  const handleCodeChange = (value: string | undefined) => {
    if (isRemoteChange.current || !value) return;
    
    setCode(value);
    const socket = getSocket();
    socket.emit('code-change', value);
  };

  // Handle language changes
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    const socket = getSocket();
    socket.emit('language-change', newLanguage);
  };

  // Copy room link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white">CodeSync</h1>
          
          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-400">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Participants */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">In room:</span>
            <div className="flex -space-x-2">
              {users.map(user => (
                <div
                  key={user.id}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-gray-800"
                  style={{ backgroundColor: user.color }}
                  title={user.name}
                >
                  {user.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={copyLink}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>

      {/* Remote cursor styles */}
      <style jsx global>{`
        .remote-cursor {
          background-color: rgba(255, 107, 107, 0.3);
          border-left: 2px solid #FF6B6B;
        }
        .remote-cursor-line {
          border-left: 2px solid #FF6B6B;
          margin-left: -2px;
        }
      `}</style>
    </div>
  );
}