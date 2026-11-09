import { createContext, useContext } from 'react';
import { STRINGS } from './strings';
import type { Lang, Strings } from './strings';

export interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
}

export const LanguageContext = createContext<LanguageValue>({
  lang: 'en',
  setLang: () => {},
  t: STRINGS.en,
});

export const useLanguage = () => useContext(LanguageContext);

// Picks the Arabic text when Arabic is active and it exists, otherwise the English text.
export const pickText = (lang: Lang, en: string | null | undefined, ar: string | null | undefined) =>
  (lang === 'ar' ? ar || en : en) ?? null;
