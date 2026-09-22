// src/app/(main)/private/page.tsx
export default function PrivatePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Private Content</h1>
      <p className="text-gray-400 mb-6">Exclusive content for Premium members</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="relative aspect-[3/4] rounded-xl bg-gray-900 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl">
              <span className="text-6xl">🔒</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 rounded-b-xl">
              <p className="text-sm font-medium text-white">Premium Character #{i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
