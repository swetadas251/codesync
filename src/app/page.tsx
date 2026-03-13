'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createRoom = () => {
    const newRoomId = nanoid(8);
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      router.push(`/room/${roomId.trim()}`);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#06060b',
        color: '#ffffff',
        fontFamily: "'Geist', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Background layers ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-8%',
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-18%',
            right: '-6%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 6s ease-in-out infinite 2s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '55%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 6s ease-in-out infinite 4s',
          }}
        />

        {/* Fine dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 40px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.6))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CodeSync
          </span>
        </div>
      </nav>

      {/* ── Hero section ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 40px 100px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left content */}
        <div>
          {/* Live badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              marginBottom: '32px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span style={{ position: 'relative', width: '8px', height: '8px' }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              Real-time collaboration
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(42px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 28px 0',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            Code together,
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 40%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              in real-time
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '460px',
              margin: '0 0 40px 0',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            A collaborative code editor that lets multiple developers write code simultaneously.
            Like Google Docs, but for programming.
          </p>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '48px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s',
            }}
          >
            <button
              onClick={createRoom}
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 24px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
              }}
            >
              Start Coding
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <form onSubmit={joinRoom} style={{ display: 'flex' }}>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room code"
                style={{
                  padding: '14px 20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRight: 'none',
                  borderRadius: '12px 0 0 12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  width: '180px',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0 12px 12px 0',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
              >
                Join
              </button>
            </form>
          </div>

          {/* Tech stack */}
          <div
            style={{
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.6s ease 0.5s',
            }}
          >
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Built with</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Next.js', 'TypeScript', 'Socket.io', 'Monaco Editor', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '5px 12px',
                    fontSize: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px',
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Editor preview */}
        <div
          style={{
            position: 'relative',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%)',
              borderRadius: '32px',
              filter: 'blur(30px)',
              zIndex: 0,
            }}
          />

          {/* Editor window */}
          <div
            style={{
              position: 'relative',
              background: '#13131d',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#0e0e16',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  main.ts
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  S
                </div>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#a855f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    marginLeft: '-6px',
                    border: '2px solid #0e0e16',
                  }}
                >
                  A
                </div>
              </div>
            </div>

            {/* Code block */}
            <div
              style={{
                padding: '24px',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
                fontSize: '13px',
                lineHeight: '1.8',
              }}
            >
              {[
                { num: '1', parts: [{ text: 'async function', color: '#c084fc' }, { text: ' collaborate', color: '#60a5fa' }, { text: '() {', color: '#e2e8f0' }] },
                { num: '2', parts: [{ text: '  const', color: '#c084fc' }, { text: ' team', color: '#fbbf24' }, { text: ' = ', color: '#e2e8f0' }, { text: 'await', color: '#c084fc' }, { text: ' connect', color: '#60a5fa' }, { text: '();', color: '#e2e8f0' }], cursor: { color: '#6366f1' } },
                { num: '3', parts: [{ text: '  const', color: '#c084fc' }, { text: ' code', color: '#fbbf24' }, { text: ' = ', color: '#e2e8f0' }, { text: '"building magic"', color: '#4ade80' }, { text: ';', color: '#e2e8f0' }] },
                { num: '4', parts: [{ text: '  ', color: '#e2e8f0' }], cursor: { color: '#a855f7' } },
                { num: '5', parts: [{ text: '  return', color: '#c084fc' }, { text: ' team.', color: '#e2e8f0' }, { text: 'sync', color: '#60a5fa' }, { text: '(code);', color: '#e2e8f0' }] },
                { num: '6', parts: [{ text: '}', color: '#e2e8f0' }] },
                { num: '', parts: [] },
                { num: '8', parts: [{ text: '// Real-time • Multi-cursor • 12+ languages', color: 'rgba(255,255,255,0.25)' }] },
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      width: '32px',
                      color: 'rgba(255,255,255,0.15)',
                      userSelect: 'none',
                      flexShrink: 0,
                      textAlign: 'right',
                      paddingRight: '16px',
                    }}
                  >
                    {line.num}
                  </span>
                  <span>
                    {line.parts.map((part, j) => (
                      <span key={j} style={{ color: part.color }}>{part.text}</span>
                    ))}
                  </span>
                  {line.cursor && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '16px',
                        background: line.cursor.color,
                        marginLeft: '2px',
                        animation: 'blink 1.2s ease-in-out infinite',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 16px',
                background: '#6366f1',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>TypeScript</span>
                <span>UTF-8</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                <span>2 connected</span>
              </div>
            </div>
          </div>

          {/* Floating tags */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              padding: '8px 14px',
              background: '#1a1a28',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              fontSize: '13px',
              zIndex: 2,
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            👥 Live collaboration
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-12px',
              padding: '8px 14px',
              background: '#1a1a28',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              fontSize: '13px',
              zIndex: 2,
              animation: 'float 4s ease-in-out infinite 2s',
            }}
          >
            ⚡ Instant sync
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px 100px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {[
            {
              icon: '⚡',
              title: 'Real-time Sync',
              description: 'See changes instantly as your team types. No delays, no conflicts.',
              accent: '#f59e0b',
            },
            {
              icon: '👥',
              title: 'Live Cursors',
              description: 'See where everyone is editing with colored cursors and presence indicators.',
              accent: '#818cf8',
            },
            {
              icon: '🧩',
              title: '12+ Languages',
              description: 'Full syntax highlighting for JavaScript, Python, Go, Rust, and more.',
              accent: '#f472b6',
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '32px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `${feature.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '20px',
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '24px 40px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Built by{' '}
            <a
              href="https://github.com/swetadas251"
              style={{ color: '#818cf8', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Sweta Das
            </a>
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/swetadas251/codesync' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/sweta-das-aaa201314' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── CSS keyframes ── */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        @media (max-width: 1024px) {
          main > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          main > div:nth-child(4) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
