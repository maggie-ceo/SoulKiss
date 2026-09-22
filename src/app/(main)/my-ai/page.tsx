// src/app/(main)/my-ai/page.tsx
export default function MyAIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">My AI</h1>
      <p className="text-gray-400 mb-6">Your personal AI companions</p>
      <div className="rounded-xl bg-gray-900 p-8 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-4xl mb-4">
          🤖
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">No AI companions yet</h2>
        <p className="text-gray-400 text-sm mb-4">Start chatting with a character to add them here!</p>
      </div>
    </div>
  )
}
