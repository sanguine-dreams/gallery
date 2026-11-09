import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from './language';
import { STRINGS } from './strings';
import type { Lang } from './strings';

const STORAGE_KEY = 'gallery-language';

// A saved choice wins; otherwise a browser set to Arabic starts in Arabic; otherwise English.
// Storage can be unavailable (private windows, blocked site data), so every access is guarded.
const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ar') return saved;
  } catch {
    // fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // lang drives fonts and screen readers; dir flips the whole layout to right-to-left.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = STRINGS[lang].brand;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // the choice still applies for this visit
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: STRINGS[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
