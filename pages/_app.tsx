// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
        {/* ✅ 이미지 로고로 변경 */}
        <Link href="/about" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="PhD Safe Logo" width={120} height={40} />
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
