import en from "./en.json";
import es from "./es.json";

type Locale = "en" | "es";
type TranslationTree = typeof en;

const translations: Record<Locale, TranslationTree> = {
  en,
  es,
};

export function getTranslations(locale: string): TranslationTree {
  return translations[(locale as Locale) ?? "en"] ?? translations.en;
}

export function t(locale: string, key: string): string {
  const messages = getTranslations(locale);
  const resolved = resolveKey(messages, key);
  return resolved ?? key;
}

function resolveKey(tree: TranslationTree, key: string): string | undefined {
  const segments = key.split(".");
  let current: unknown = tree;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : undefined;
}
