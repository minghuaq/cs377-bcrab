import Navigation from '@/components/Navigation'
import ChatInterface from '@/components/ChatInterface'

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <Navigation />
      <ChatInterface />
    </main>
  )
}