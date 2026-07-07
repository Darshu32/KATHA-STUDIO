"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  defaultLanguage,
  findLanguage,
  type Language,
} from "@/lib/languages";
import {
  enDictionary,
  mergeDictionary,
  type Dictionary,
} from "@/lib/i18n/dictionary";

type LanguageContextValue = {
  language: Language;
  setLanguage: (code: string) => void;
  /** The active translation dictionary. English is the source of truth; any
   *  missing key in another language falls back to English (see mergeDictionary). */
  t: Dictionary;
  /** True while a non-English dictionary is being fetched. */
  loading: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/* In-memory cache so re-selecting a language never re-fetches. English is
 * bundled; every other language is a static JSON in /public/i18n fetched once. */
const dictCache = new Map<string, Dictionary>([["en", enDictionary]]);

async function loadDictionary(code: string): Promise<Dictionary> {
  const cached = dictCache.get(code);
  if (cached) return cached;
  try {
    const res = await fetch(`/i18n/${code}.json`, { cache: "force-cache" });
    if (!res.ok) throw new Error(`i18n ${code}: ${res.status}`);
    const data = await res.json();
    const merged = mergeDictionary(enDictionary, data);
    dictCache.set(code, merged);
    return merged;
  } catch {
    /* No translation file yet (or fetch failed) — fall back to English.
       Don't cache the fallback so a later attempt can still pick up the file. */
    return enDictionary;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [dict, setDict] = useState<Dictionary>(enDictionary);
  const [loading, setLoading] = useState(false);
  /* Guards against an out-of-order fetch: if the visitor switches languages
     quickly, only the most recent request is allowed to set the dictionary. */
  const reqId = useRef(0);

  const applyLanguage = useCallback(async (code: string) => {
    const next = findLanguage(code);
    setLanguageState(next);
    document.documentElement.lang = next.code;

    if (next.code === "en") {
      setDict(enDictionary);
      setLoading(false);
      return;
    }
    const id = ++reqId.current;
    setLoading(true);
    const loaded = await loadDictionary(next.code);
    if (id === reqId.current) {
      setDict(loaded);
      setLoading(false);
    }
  }, []);

  /* No persistence by design: every fresh load starts in English (the default),
     and the intro door lets the visitor choose again. The choice lives only in
     memory for the current session, so a refresh always resets to English. */
  const setLanguage = useCallback(
    (code: string) => {
      void applyLanguage(code);
    },
    [applyLanguage]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: dict, loading }),
    [language, setLanguage, dict, loading]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
