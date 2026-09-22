// src/app/admin/characters/page.tsx
import { Search, Lock, Sparkles, Eye } from 'lucide-react'

const CHARACTERS = [
  { id: '1', name: 'Raven', category: 'mature', chats: 15200, likes: 4500, isNsfw: true, isPublic: true },
  { id: '2', name: 'Sophia', category: 'girl', chats: 12500, likes: 3400, isNsfw: false, isPublic: true },
  { id: '3', name: 'Luna', category: 'anime', chats: 8900, likes: 2100, isNsfw: false, isPublic: true },
  { id: '4', name: 'Kai', category: 'guy', chats: 4300, likes: 1200, isNsfw: false, isPublic: true },
  { id: '5', name: 'Aria', category: 'fantasy', chats: 5600, likes: 1500, isNsfw: false, isPublic: true },
  { id: '6', name: 'Mia', category: 'mature', chats: 3200, likes: 890, isNsfw: true, isPublic: false },
  { id: '7', name: 'Zane', category: 'guy', chats: 2800, likes: 750, isNsfw: false, isPublic: true },
  { id: '8', name: 'Lila', category: 'girl', chats: 4100, likes: 1100, isNsfw: false, isPublic: true },
]

export default function CharactersPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Characters</h1>
          <p className="text-gray-400">{CHARACTERS.length} characters total</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search characters..."
          className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Characters Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CHARACTERS.map((char) => (
          <div key={char.id} className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all">
            <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-5xl">
                {char.category === 'girl' ? '👩' : char.category === 'anime' ? '🎭' : char.category === 'mature' ? '🔥' : '👨'}
              </span>
              {char.isNsfw && (
                <span className="absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                  18+
                </span>
              )}
              {!char.isPublic && (
                <div className="absolute right-2 top-2">
                  <Lock className="h-4 w-4 text-yellow-500" />
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-white">{char.name}</h3>
                <span className="text-xs text-gray-500 capitalize">{char.category}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {char.chats.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  ❤️ {char.likes.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
