'use client';

import { useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define a custom dark theme inspired by Catppuccin/One Dark
    monaco.editor.defineTheme('codesync-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'string', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'function', foreground: '61afef' },
        { token: 'variable', foreground: 'e06c75' },
        { token: 'constant', foreground: 'd19a66' },
        { token: 'operator', foreground: '56b6c2' },
        { token: 'delimiter', foreground: 'abb2bf' },
        { token: 'tag', foreground: 'e06c75' },
        { token: 'attribute.name', foreground: 'd19a66' },
        { token: 'attribute.value', foreground: '98c379' },
        { token: 'metatag', foreground: 'e06c75' },
      ],
      colors: {
        'editor.background': '#0a0a12',
        'editor.foreground': '#abb2bf',
        'editor.lineHighlightBackground': '#ffffff06',
        'editor.selectionBackground': '#6366f133',
        'editor.inactiveSelectionBackground': '#6366f11a',
        'editorLineNumber.foreground': '#ffffff18',
        'editorLineNumber.activeForeground': '#ffffff40',
        'editorCursor.foreground': '#6366f1',
        'editorWhitespace.foreground': '#ffffff0d',
        'editorIndentGuide.background': '#ffffff08',
        'editorIndentGuide.activeBackground': '#ffffff15',
        'editor.selectionHighlightBackground': '#6366f11a',
        'editorBracketMatch.background': '#6366f120',
        'editorBracketMatch.border': '#6366f140',
        'editorGutter.background': '#0a0a12',
        'editorWidget.background': '#16162a',
        'editorWidget.border': '#ffffff10',
        'editorSuggestWidget.background': '#16162a',
        'editorSuggestWidget.border': '#ffffff10',
        'editorSuggestWidget.selectedBackground': '#6366f120',
        'editorHoverWidget.background': '#16162a',
        'editorHoverWidget.border': '#ffffff10',
        'scrollbar.shadow': '#00000000',
        'scrollbarSlider.background': '#ffffff10',
        'scrollbarSlider.hoverBackground': '#ffffff18',
        'scrollbarSlider.activeBackground': '#ffffff20',
        'minimap.background': '#0a0a12',
      },
    });

    monaco.editor.setTheme('codesync-dark');

    // Focus the editor
    editor.focus();
  };

  // Sync code from outside (e.g. remote changes)
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.getValue() !== code) {
      const position = editor.getPosition();
      editor.setValue(code);
      if (position) {
        editor.setPosition(position);
      }
    }
  }, [code]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleMount}
        loading={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              background: '#0a0a12',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '14px',
              fontFamily: "'Geist', sans-serif",
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(99,102,241,0.3)',
                borderTopColor: '#6366f1',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}
            />
            Loading editor...
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Menlo, monospace",
          fontLigatures: true,
          lineHeight: 24,
          letterSpacing: 0.3,
          padding: { top: 16, bottom: 16 },
          minimap: {
            enabled: true,
            side: 'right',
            size: 'proportional',
            maxColumn: 80,
            renderCharacters: false,
            scale: 1,
          },
          scrollBeyondLastLine: true,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          cursorStyle: 'line',
          cursorWidth: 2,
          renderLineHighlight: 'line',
          renderLineHighlightOnlyWhenFocus: false,
          roundedSelection: true,
          selectOnLineNumbers: true,
          wordWrap: 'off',
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: false,
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showFunctions: true,
            showVariables: true,
            showClasses: true,
          },
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
            highlightActiveIndentation: true,
          },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            verticalSliderSize: 8,
            horizontalSliderSize: 8,
            useShadows: false,
          },
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          folding: true,
          foldingHighlight: false,
          showFoldingControls: 'mouseover',
          matchBrackets: 'always',
          occurrencesHighlight: 'singleFile',
          renderWhitespace: 'none',
          contextmenu: true,
        }}
      />
    </div>
  );
}
