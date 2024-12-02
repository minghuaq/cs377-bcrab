export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Next.js with Dark Mode
        </h1>
        <p className="text-lg text-center text-muted-foreground">
          Click the sun/moon icon in the top right corner to switch themes
        </p>
      </div>
    </div>
  );
}