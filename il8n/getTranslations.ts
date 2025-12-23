type Translations = Record<string, Record<string, string>>;

const translations: Translations = {
  en: {
    hello: "Hello",
  },
};

export function getTranslations(
  locale: string
): Record<string, string> {
  return translations[locale] ?? {};
}
