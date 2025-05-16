// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
        {/* 🔽 로고를 클릭하면 /about으로 이동하게 수정 */}
        <Link href="/about">
          <div className="text-xl font-bold cursor-pointer hover:text-blue-700">
            PhD Safe
          </div>
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="text-blue-700 hover:underline">About Us</Link>
          <Link href="/labs" className="text-blue-700 hover:underline">Labs</Link>
          <Link href="/community" className="text-blue-700 hover:underline">Community</Link>
          <Link href="/evaluate" className="text-blue-700 hover:underline">Evaluation</Link>
          <Link href="/contact" className="text-blue-700 hover:underline">Contact Us</Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
