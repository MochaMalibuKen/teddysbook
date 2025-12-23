"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type LanguageContextValue = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
});

type LanguageProviderProps = {
  children: ReactNode;
  defaultLocale?: string;
};

export function LanguageProvider({
  children,
  defaultLocale = "en",
}: LanguageProviderProps) {
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
