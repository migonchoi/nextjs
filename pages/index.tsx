// pages/index.tsx (Main landing page)
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to PhD Safe</h1>
      <p className="text-lg text-center mb-8 max-w-xl">
        Explore transparent evaluations of PhD advisors and submit your own.
      </p>
      <div className="flex space-x-6">
        <Link href="/evaluate">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow">Evaluate a Professor</button>
        </Link>
        <Link href="/results">
          <button className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow">View Results</button>
        </Link>
      </div>
    </main>
  );
}
