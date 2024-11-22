import Navigation from '@/components/Navigation'
import WelcomeScreen from '@/components/WelcomeScreen'
import ChatInterface from '@/components/ChatInterface'
import LoginModal from '@/components/LoginModal'
import { useState } from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <Navigation />
      <WelcomeScreen />
    </main>
  )
}