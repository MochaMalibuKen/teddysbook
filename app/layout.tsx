import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/il8n";
import { LanguageProvider } from "@/app/providers";
import LanguageToggle from "@/app/components/LanguageToggle";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teddy’s Book",
  description: "Hire trusted local pros with Teddy’s Book.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params?.locale || "en";
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-teddy-neutral via-white to-teddy-blue/10 relative`}
      >
        <LanguageProvider defaultLocale={locale}>
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
            <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(44,143,191,0.16), rgba(38,166,154,0.18))",
                    backgroundSize: "220% 220%",
                  }}
                />
                <div
                  className="absolute inset-0 animate-jigsaw-parallax opacity-60"
                  style={{
                    backgroundImage: "url('/puzzle-bg.svg')",
                    backgroundSize: "180px",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "0 0",
                  }}
                />
              </div>

              <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href={`/${locale}`} className="flex items-center gap-2">
                  <Image
                    src="/teddysbook-logo3.png"
                    alt="Teddy’s Book Logo"
                    width={150}
                    height={48}
                  />
                </Link>

                <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-700">
                  <Link href={`/${locale}/directory`} className="hover:text-teddy-blue">
                    {dict["header.directory"]}
                  </Link>

                  <Link href={`/${locale}/request`} className="hover:text-teddy-blue">
                    {dict["header.request"]}
                  </Link>

                  <Link
                    href={`/${locale}/pro/join`}
                    className="rounded-full bg-teddy-blue px-4 py-2 text-white hover:bg-teddy-teal transition"
                  >
                    {dict["header.pro"]}
                  </Link>

                  <LanguageToggle />
                </nav>
              </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
