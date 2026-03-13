‘use client’;

import { useState } from ‘react’;
import { useRouter } from ‘next/navigation’;
import { nanoid } from ‘nanoid’;

export default function Home() {
const router = useRouter();
const [roomId, setRoomId] = useState(’’);

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
<main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
{/* Animated Background */}
<div className="absolute inset-0 overflow-hidden">
{/* Gradient Orbs */}
<div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
<div className=“absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse” style={{ animationDelay: ‘1s’ }} />
<div className=“absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse” style={{ animationDelay: ‘2s’ }} />

```
{/* Grid Pattern */}
<div
className="absolute inset-0 opacity-[0.03]"
style={{
backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
backgroundSize: '60px 60px'
}}
/>
</div>

{/* Navigation */}
<nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
</svg>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
CodeSync
</span>
</div>
<a
href="https://github.com/swetadas251/codesync"
target="_blank"
className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
>
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>
<span className="text-sm font-medium">View Source</span>
</a>
</nav>

{/* Hero Section */}
<div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-24">
<div className="grid lg:grid-cols-2 gap-16 items-center">

{/* Left Side - Content */}
<div className="space-y-8">
{/* Badge */}
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>
<span className="text-sm text-gray-300">Real-time collaboration</span>
</div>

{/* Headline */}
<h1 className="text-5xl lg:text-7xl font-bold leading-tight">
Code together,
<span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
in real-time
</span>
</h1>

{/* Subheadline */}
<p className="text-xl text-gray-400 max-w-lg leading-relaxed">
A collaborative code editor that lets multiple developers write code simultaneously.
Like Google Docs, but for programming.
</p>

{/* CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-4">
<button
onClick={createRoom}
className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
>
<div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
<span className="relative flex items-center justify-center gap-2">
Start Coding
<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
</svg>
</span>
</button>

<form onSubmit={joinRoom} className="flex">
<input
type="text"
value={roomId}
onChange={(e) => setRoomId(e.target.value)}
placeholder="Enter room code"
className="px-6 py-4 bg-white/5 border border-white/10 rounded-l-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 w-48 transition-colors"
/>
<button
type="submit"
className="px-6 py-4 bg-white/10 border border-l-0 border-white/10 rounded-r-xl font-medium hover:bg-white/15 transition-colors"
>
Join
</button>
</form>
</div>

{/* Tech Stack */}
<div className="pt-8 border-t border-white/10">
<p className="text-sm text-gray-500 mb-4">Built with</p>
<div className="flex flex-wrap gap-3">
{['Next.js', 'TypeScript', 'Socket.io', 'Monaco Editor', 'Tailwind'].map((tech) => (
<span
key={tech}
className="px-3 py-1.5 text-sm bg-white/5 rounded-lg text-gray-400 border border-white/5"
>
{tech}
</span>
))}
</div>
</div>
</div>

{/* Right Side - Editor Preview */}
<div className="relative">
{/* Glow Effect */}
<div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl" />

{/* Editor Window */}
<div className="relative bg-[#1e1e2e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
{/* Title Bar */}
<div className="flex items-center justify-between px-4 py-3 bg-[#181825] border-b border-white/5">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
<div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
<div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
</div>
<div className="flex items-center gap-2 text-xs text-gray-500">
<span className="px-2 py-1 bg-white/5 rounded">main.ts</span>
</div>
<div className="flex items-center gap-1">
<div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">S</div>
<div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold -ml-2 border-2 border-[#181825]">A</div>
</div>
</div>

{/* Code Content */}
<div className="p-6 font-mono text-sm leading-relaxed">
<div className="flex">
<span className="text-gray-600 w-8">1</span>
<span><span className="text-purple-400">async function</span> <span className="text-blue-400">collaborate</span>() {'{'}</span>
</div>
<div className="flex">
<span className="text-gray-600 w-8">2</span>
<span> <span className="text-purple-400">const</span> <span className="text-yellow-300">team</span> = <span className="text-purple-400">await</span> <span className="text-blue-400">connect</span>();</span>
<span className="ml-1 w-0.5 h-5 bg-indigo-400 animate-pulse" />
</div>
<div className="flex">
<span className="text-gray-600 w-8">3</span>
<span> <span className="text-purple-400">const</span> <span className="text-yellow-300">code</span> = <span className="text-green-400">"building magic"</span>;</span>
</div>
<div className="flex items-center">
<span className="text-gray-600 w-8">4</span>
<span> </span>
<span className="w-0.5 h-5 bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
</div>
<div className="flex">
<span className="text-gray-600 w-8">5</span>
<span> <span className="text-purple-400">return</span> team.<span className="text-blue-400">sync</span>(code);</span>
</div>
<div className="flex">
<span className="text-gray-600 w-8">6</span>
<span>{'}'}</span>
</div>
<div className="flex mt-4">
<span className="text-gray-600 w-8">7</span>
<span className="text-gray-500">// Real-time • Multi-cursor • 12+ languages</span>
</div>
</div>

{/* Status Bar */}
<div className="flex items-center justify-between px-4 py-2 bg-indigo-600 text-xs">
<div className="flex items-center gap-4">
<span>TypeScript</span>
<span>UTF-8</span>
</div>
<div className="flex items-center gap-2">
<span className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
2 users connected
</span>
</div>
</div>
</div>

{/* Floating Elements */}
<div className="absolute -top-4 -right-4 px-4 py-2 bg-[#1e1e2e] rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
<span className="text-sm">👥 Live collaboration</span>
</div>
<div className="absolute -bottom-4 -left-4 px-4 py-2 bg-[#1e1e2e] rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
<span className="text-sm">⚡ Instant sync</span>
</div>
</div>
</div>
</div>

{/* Features Section */}
<div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
<div className="grid md:grid-cols-3 gap-8">
{[
{
icon: (
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>
),
title: 'Real-time Sync',
description: 'See changes instantly as your team types. No delays, no conflicts.',
gradient: 'from-yellow-500 to-orange-500'
},
{
icon: (
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
),
title: 'Live Cursors',
description: 'See where everyone is editing with colored cursors and presence indicators.',
gradient: 'from-indigo-500 to-purple-500'
},
{
icon: (
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
</svg>
),
title: '12+ Languages',
description: 'Full syntax highlighting for JavaScript, Python, Go, Rust, and more.',
gradient: 'from-pink-500 to-rose-500'
}
].map((feature, index) => (
<div
key={index}
className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
>
<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
{feature.icon}
</div>
<h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
<p className="text-gray-400 leading-relaxed">{feature.description}</p>
</div>
))}
</div>
</div>

{/* Footer */}
<footer className="relative z-10 border-t border-white/5 py-8">
<div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
<p className="text-gray-500 text-sm">
Built by <a href="https://github.com/swetadas251" className="text-indigo-400 hover:underline">Sweta Das</a>
</p>
<div className="flex items-center gap-6 text-sm text-gray-500">
<a href="https://github.com/swetadas251/codesync" className="hover:text-white transition-colors">GitHub</a>
<a href="https://linkedin.com/in/sweta-das-aaa201314" className="hover:text-white transition-colors">LinkedIn</a>
</div>
</div>
</footer>
</main>
```

);
