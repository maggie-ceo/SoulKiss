// src/app/(main)/collection/page.tsx
export default function CollectionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Collections</h1>
      <p className="text-gray-400 mb-6">Browse curated character collections</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {['Anime Girls', 'Fantasy Queens', 'College Romance', 'Mature & Spice', 'Best Friends', 'Office Crush'].map((c) => (
          <div key={c} className="rounded-xl bg-gray-900 p-4 cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-pink-900/30 to-purple-900/30 mb-3 flex items-center justify-center text-4xl">
              {c.includes('Anime') ? '🎭' : c.includes('Fantasy') ? '🧙‍♀️' : c.includes('College') ? '🎓' : c.includes('Mature') ? '🔥' : c.includes('Friend') ? '👯‍♀️' : '💼'}
            </div>
            <h3 className="font-semibold text-white">{c}</h3>
            <p className="text-sm text-gray-500">12 characters</p>
          </div>
        ))}
      </div>
    </div>
  )
}
