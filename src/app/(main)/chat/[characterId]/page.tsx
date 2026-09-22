import ChatPageClient from './chat-page-client'

// Generate static params for all characters
export async function generateStaticParams() {
  const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  return ids.map((id) => ({ characterId: id }))
}

export default function ChatPage() {
  return <ChatPageClient />
}
