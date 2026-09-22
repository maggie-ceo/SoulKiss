// src/app/(main)/shorts/page.tsx
'use client'

import { Play } from 'lucide-react'

const SHORTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Short Video #${i + 1}`,
  views: `${Math.floor(Math.random() * 100)}K`,
}))

export default function ShortsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Candy Shorts</h1>
      <p className="text-gray-400 mb-6">Watch AI-generated short videos from our community</p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {SHORTS.map((short) => (
          <div key={short.id} className="group relative aspect-video rounded-lg bg-gray-900 overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900/30 to-purple-900/30">
              <Play className="h-12 w-12 text-white/50 group-hover:text-white transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
              <p className="text-sm font-medium text-white">{short.title}</p>
              <p className="text-xs text-gray-400">{short.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
