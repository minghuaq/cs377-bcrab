import React from 'react';
import { BookOpen, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';
import CrabMascot from './CrabMascot';

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <CrabMascot className="w-32 h-32" />
              <Sparkles className="w-8 h-8 text-accent/80 absolute -right-2 -top-2 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-accent">
            Welcome to BCRAB
          </h1>
          
          <p className="text-xl md:text-2xl text-primary dark:text-accent/90">
            How can I help you today?
          </p>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary hover:bg-accent/90 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            <Brain className="w-5 h-5" />
            Click here to chat!
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-12">
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-accent" />}
            title="Personalized Learning"
            description="Get tailored assistance based on your learning style and pace"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-accent" />}
            title="24/7 Support"
            description="Access help whenever you need it, day or night"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-accent" />}
            title="Smart Insights"
            description="Receive intelligent suggestions and explanations"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20 dark:border-accent/20 hover:border-accent/50 transition-colors">
      <div className="p-3 bg-white/10 dark:bg-black/50 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">{title}</h3>
      <p className="text-primary/80 dark:text-accent/80">{description}</p>
    </div>
  );
}