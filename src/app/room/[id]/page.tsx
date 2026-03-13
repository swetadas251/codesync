'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import CodeEditor from '@/components/CodeEditor';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://codesync-backend-nqm5.onrender.com';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'c',
  'go', 'rust', 'html', 'css', 'json', 'markdown',
];

// Consistent user colors
const USER_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#a855f7', '#14b8a6', '#f472b6',
];

export default function RoomPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const [code, setCode] = useState('// Start coding here!\n');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isRemoteChange = useRef(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-room', roomId);
    });

    socket.on('disconnect', () => setConnected(false));
    socket.on('room-users', (userList: string[]) => setUsers(userList));
    socket.on('user-joined', (userId: string) => {
      setUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
    });
    socket.on('user-left', (userId: string) => {
      setUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.on('code-update', (newCode: string) => {
      isRemoteChange.current = true;
      setCode(newCode);
    });

    socket.on('language-update', (newLang: string) => {
      setLanguage(newLang);
    });

    socket.on('init-code', (initCode: string) => {
      setCode(initCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (newCode: string) => {
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;
    }
    setCode(newCode);
    socketRef.current?.emit('code-change', { roomId, code: newCode });
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setLangOpen(false);
    socketRef.current?.emit('language-change', { roomId, language: newLang });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (id: string) => {
    return id.slice(0, 2).toUpperCase();
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a12',
        color: '#e2e8f0',
        fontFamily: "'Geist', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* ── Top bar ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: '52px',
          minHeight: '52px',
          background: '#0e0e18',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 20,
        }}
      >
        {/* Left: Logo + Language + Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(99,102,241,0.25)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff' }}>
              CodeSync
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />

          {/* Language selector */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: langOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                color: '#e2e8f0',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: 'inherit',
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: languageColor(language),
              }} />
              {language}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ opacity: 0.5, transform: langOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown */}
            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  background: '#16162a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '4px',
                  minWidth: '160px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  zIndex: 50,
                  animation: 'fadeIn 0.12s ease-out',
                }}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: language === lang ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: language === lang ? '#818cf8' : 'rgba(255,255,255,0.6)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.1s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      if (language !== lang) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (language !== lang) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '2px',
                      background: languageColor(lang),
                    }} />
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connection status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: connected ? '#22c55e' : '#ef4444',
                boxShadow: connected ? '0 0 8px rgba(34,197,94,0.4)' : '0 0 8px rgba(239,68,68,0.4)',
              }}
            />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              {connected ? 'Connected' : 'Connecting...'}
            </span>
          </div>
        </div>

        {/* Right: Users + Room ID + Copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* User avatars */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {users.slice(0, 5).map((user, index) => (
              <div
                key={user}
                title={user}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: USER_COLORS[index % USER_COLORS.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#fff',
                  marginLeft: index > 0 ? '-6px' : '0',
                  border: '2px solid #0e0e18',
                  zIndex: users.length - index,
                  position: 'relative',
                }}
              >
                {getInitials(user)}
              </div>
            ))}
            {users.length > 5 && (
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  marginLeft: '-6px',
                  border: '2px solid #0e0e18',
                }}
              >
                +{users.length - 5}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />

          {/* Room label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Room</span>
            <code
              style={{
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '11px',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.02em',
              }}
            >
              {roomId}
            </code>
          </div>

          {/* Copy button */}
          <button
            onClick={copyLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
              color: copied ? '#4ade80' : 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
            {copied ? 'Copied!' : 'Invite'}
          </button>
        </div>
      </header>

      {/* ── Editor ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        <CodeEditor
          code={code}
          language={language}
          onChange={handleCodeChange}
        />
      </div>

      {/* ── Bottom status bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: '26px',
          minHeight: '26px',
          background: '#6366f1',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {language}
          </span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: connected ? '#4ade80' : '#fbbf24',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            {users.length} {users.length === 1 ? 'user' : 'users'} online
          </span>
          <span>CodeSync</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        /* Hide default Monaco scrollbar decorations */
        .monaco-editor .scroll-decoration { display: none !important; }
      `}</style>
    </div>
  );
}

// Language color dots
function languageColor(lang: string): string {
  const map: Record<string, string> = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    python: '#3572A5',
    java: '#b07219',
    cpp: '#f34b7d',
    c: '#555555',
    go: '#00ADD8',
    rust: '#dea584',
    html: '#e34c26',
    css: '#563d7c',
    json: '#292929',
    markdown: '#083fa1',
  };
  return map[lang] || '#6366f1';
}
