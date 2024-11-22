"use client";

import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your AI study assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        content: "I'm processing your request. As this is a demo, I'll respond with this placeholder message.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] pt-16">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  message.sender === 'user'
                    ? 'bg-accent'
                    : 'bg-primary dark:bg-accent/20'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-primary" />
                ) : (
                  <Bot className="w-5 h-5 text-accent dark:text-accent" />
                )}
              </div>
              <div
                className={`flex-1 px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-accent text-primary'
                    : 'bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary/20 dark:border-accent/20 bg-white/95 dark:bg-black/95 p-4 transition-colors">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-primary px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}