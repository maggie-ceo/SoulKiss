# SoulKiss AI Companion Platform

AI companion platform - create, chat, and connect with AI characters.

## Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Groq AI
GROQ_API_KEY=gsk_your-groq-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="SoulKiss"
```

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui patterns
- **Auth**: Supabase Auth (Google, Email, Magic Link)
- **Database**: Supabase PostgreSQL + RLS
- **AI**: Groq API (Llama 3 70B) for chat
- **Storage**: Supabase Storage for images
- **Deployment**: Vercel

## Features

- 🔐 Auth (Google, Magic Link)
- 💬 Real-time AI chat with custom characters
- 🎭 Character creator with personality builder
- 🖼️ Image generation (HuggingFace)
- 🔊 Voice messages (Edge TTS - free!)
- 💎 Freemium model (gems + subscription)
- 📱 Mobile responsive
- 🌙 Dark mode
- 🌐 Multi-language (English, Bengali)

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | Next.js 15 + Tailwind | Free |
| Auth | Supabase | Free |
| Database | Supabase (500MB) | Free |
| AI Chat | Groq (Llama 3) | Free |
| Image Gen | HuggingFace | Free |
| Voice | Edge TTS | Free |
| Storage | Supabase (2GB) + R2 (10GB) | Free |
| Deployment | Vercel | Free |
| Domain | .vercel.app | Free |
| **Total** | | **$0** |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, register)
│   ├── (main)/          # Main app pages
│   │   ├── page.tsx     # Home / discover
│   │   ├── chat/
│   │   ├── create/
│   │   └── profile/
│   └── api/
│       ├── chat/        # Chat API
│       └── characters/  # Character CRUD
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── chat/            # Chat components
│   └── character/       # Character components
├── lib/
│   ├── ai/              # AI integrations
│   │   └── groq.ts
│   ├── voice/
│   │   └── edge-tts.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── utils.ts
│   └── store.ts         # Zustand store
├── types/
│   └── database.ts
└── supabase/
    └── migrations/
```

## Database Schema

Run the SQL in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/chat/send | Send message, get AI reply |
| GET | /api/chat/:id | Get chat history |
| POST | /api/characters | Create character |
| GET | /api/characters | List characters |
| GET | /api/characters/:id | Get character |
| PATCH | /api/characters/:id | Update character |
| DELETE | /api/characters/:id | Delete character |

## Version History

- v0.1.0 - MVP: Auth + Chat + Character CRUD + Image Gen + Voice
- v0.2.0 - Monetization: Payments, subscriptions, referral
- v0.3.0 - Growth: SEO, content marketing, community
- v0.4.0 - Scale: Video, mobile app, advanced features
