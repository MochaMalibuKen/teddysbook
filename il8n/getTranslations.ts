import en from "./en.json";
import es from "./es.json";

type Dict = Record<string, any>;

function getValue(obj: Dict, path: string): string {
  const segments = path.split(".");

  let current: any = obj;
  for (const key of segments) {
    if (typeof current === "object" && current !== null && key in current) {
      current = current[key];
    } else {
      return "";
    }
  }

  return typeof current === "string" ? current : "";
}

export function t(locale: string, path: string): string {
  const dict: Dict = locale === "es" ? (es as Dict) : (en as Dict);
  return getValue(dict, path);
}
