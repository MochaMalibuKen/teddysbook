import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "../public/fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../public/fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teddy’s Book",
  description: "Hire trusted local pros with Teddy’s Book.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-teddy-neutral via-white to-teddy-blue/10 relative`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.2] animate-jigsaw-parallax"
          style={{
            backgroundImage: "url('/puzzle-bg.svg')",
            backgroundSize: "220px",
            backgroundRepeat: "repeat",
            backgroundPosition: "0 0",
            willChange: "background-position",
          }}
        />

        <div className="relative z-10 min-h-screen">
          <header className="w-full border-b border-gray-200 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/teddysbook-logo3.png"
                  alt="Teddy’s Book Logo"
                  width={150}
                  height={48}
                />
              </Link>
              <nav className="hidden sm:flex items-center gap-4 text-sm font-semibold text-gray-700">
                <Link href="/directory" className="hover:text-teddy-blue">
                  Directory
                </Link>
                <Link href="/request" className="hover:text-teddy-blue">
                  Request help
                </Link>
                <Link
                  href="/pro/join"
                  className="rounded-full bg-teddy-blue px-4 py-2 text-white hover:bg-teddy-teal transition"
                >
                  Are you a pro?
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
