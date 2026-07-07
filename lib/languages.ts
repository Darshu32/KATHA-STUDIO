export type Language = {
  code: string;
  /** Endonym — the language's name written in its own script. */
  native: string;
  /** English name, shown as the quiet secondary label. */
  english: string;
};

/* A "universe" spread of world languages offered at the door. English is the
 * default and the only fully translated content for launch — the rest are
 * wired and ready to receive real translations later without any rebuild. */
export const languages: Language[] = [
  { code: "en", native: "English",          english: "English" },
  { code: "es", native: "Español",          english: "Spanish" },
  { code: "fr", native: "Français",         english: "French" },
  { code: "de", native: "Deutsch",          english: "German" },
  { code: "it", native: "Italiano",         english: "Italian" },
  { code: "pt", native: "Português",        english: "Portuguese" },
  { code: "nl", native: "Nederlands",       english: "Dutch" },
  { code: "ru", native: "Русский",          english: "Russian" },
  { code: "ar", native: "العربية",          english: "Arabic" },
  { code: "fa", native: "فارسی",            english: "Persian" },
  { code: "zh", native: "中文",              english: "Chinese" },
  { code: "ja", native: "日本語",            english: "Japanese" },
  { code: "ko", native: "한국어",            english: "Korean" },
  { code: "tr", native: "Türkçe",           english: "Turkish" },
  { code: "pl", native: "Polski",           english: "Polish" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "th", native: "ไทย",              english: "Thai" },
  { code: "vi", native: "Tiếng Việt",       english: "Vietnamese" },
  { code: "el", native: "Ελληνικά",         english: "Greek" },
  { code: "he", native: "עברית",            english: "Hebrew" },
  { code: "sv", native: "Svenska",          english: "Swedish" },
  { code: "uk", native: "Українська",       english: "Ukrainian" },
];

export const defaultLanguage = languages[0];

export function findLanguage(code: string | null | undefined): Language {
  return languages.find((l) => l.code === code) ?? defaultLanguage;
}
