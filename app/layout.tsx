import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zero-Touch Growth OS',
  description: 'Autonomous digital growth platform for Indian MSMEs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-blue-600">🚀 Zero-Touch Growth OS</h1>
            <p className="text-sm text-gray-600">Autonomous Digital Growth Platform</p>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 border-t border-gray-200 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
            <p>Made for NMIMS INNOVATHON 2026 | Challenge 1: Zero-Touch Growth Operating System</p>
            <p className="mt-2">API Keys stored in .env.local | Using Google Gemini + Firebase</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
