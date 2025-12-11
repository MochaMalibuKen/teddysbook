"use client";

import { useLanguage } from "@/app/providers";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageToggle() {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  function switchLang(lang: "en" | "es") {
    const newPath = pathname.replace(/^\/(en|es)/, `/${lang}`);
    router.push(newPath);
  }

  return (
    <div className="flex gap-2 text-xs" role="group" aria-label="Language toggle">
      <button
        onClick={() => switchLang("en")}
        className={`px-2 py-1 rounded ${locale === "en" ? "bg-teddy-blue text-white" : "bg-gray-200"}`}
        aria-pressed={locale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLang("es")}
        className={`px-2 py-1 rounded ${locale === "es" ? "bg-teddy-blue text-white" : "bg-gray-200"}`}
        aria-pressed={locale === "es"}
        aria-label="Switch to Spanish"
      >
        ES
      </button>
    </div>
  );
}
