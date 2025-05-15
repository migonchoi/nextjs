import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to PhD Safe</h1>
      <p className="text-lg text-center mb-8 max-w-xl">
        Helping grad students find supportive, transparent, and enriching research environments.
      </p>
      <Link href="/duke">
        <button className="px-6 py-3 bg-black text-white rounded-2xl shadow">Browse Duke Labs</button>
      </Link>
    </main>
  );
}
