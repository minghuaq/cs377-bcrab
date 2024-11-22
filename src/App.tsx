import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ChatInterface from './components/ChatInterface';
import LoginModal from './components/LoginModal';
import WelcomeScreen from './components/WelcomeScreen';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
        <Navigation onLoginClick={() => setIsLoginOpen(true)} />
        {showChat ? (
          <ChatInterface />
        ) : (
          <WelcomeScreen onStartChat={() => setShowChat(true)} />
        )}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;