// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoulKiss - AI Companion Platform',
  description: 'Create, chat, and connect with AI characters. Build your dream AI companion.',
  keywords: ['AI companion', 'AI chatbot', 'AI girlfriend', 'AI boyfriend', 'character AI'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-950 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}
