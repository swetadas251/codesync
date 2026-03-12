# CodeSync

Real-time collaborative code editor. Write code together, like Google Docs but for programming.

**Live Demo:** [codesync-eight-pink.vercel.app](https://codesync-eight-pink.vercel.app)

---

## Features

- **Real-time Collaboration** — See changes instantly as others type
- **Multiple Cursors** — See where each person is editing
- **12+ Languages** — JavaScript, Python, Go, Rust, and more
- **Syntax Highlighting** — Powered by Monaco (VS Code's editor)
- **Room System** — Create or join rooms with shareable links
- **No Sign-up Required** — Just create a room and share the link

---

## How It Works
```
User A types code
│
▼
┌─────────────────┐
│ Monaco Editor │ ──► onChange event
└─────────────────┘
│
│ WebSocket
▼
┌─────────────────┐
│ Backend Server │ ──► Broadcasts to room
└─────────────────┘
│
│ WebSocket
▼
┌─────────────────┐
│ User B's Editor │ ──► Updates instantly
└─────────────────┘
```

1. User makes a change in the editor
2. Change is sent via WebSocket to the server
3. Server broadcasts to all other users in the room
4. Their editors update in real-time

---

## Tech Stack

**Frontend:**
- Next.js 16 (React)
- TypeScript
- Tailwind CSS
- Monaco Editor
- Socket.io Client

**Backend:**
- Node.js
- Express
- Socket.io
- TypeScript

**Deployment:**
- Frontend: Vercel
- Backend: Render

---

## Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## Project Structure
```
codesync/
├── frontend/ # Next.js app
│ ├── src/
│ │ ├── app/ # Pages
│ │ ├── components/ # React components
│ │ └── lib/ # Utilities
│ └── package.json
│
└── backend/ # Node.js server
├── src/
│ └── index.ts # Socket.io server
└── package.json
```

---

## License

MIT

---

**Built by [Sweta Das](https://github.com/swetadas251)**


