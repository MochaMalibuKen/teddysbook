import en from "./en.json";
import es from "./es.json";

export type Locale = "en" | "es";

export const dictionaries = {
  en,
  es
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}