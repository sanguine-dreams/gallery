import { useLanguage } from '../i18n/language';
import { STRINGS } from '../i18n/strings';
import type { Lang } from '../i18n/strings';
import { IraqFlag, UkFlag } from './Flags';

const OPTIONS: { lang: Lang; Flag: typeof UkFlag }[] = [
  { lang: 'en', Flag: UkFlag },
  { lang: 'ar', Flag: IraqFlag },
];

// Two small flags in the navbar's corner; the active language is full colour, the other is faded.
export const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.chooseLanguage} className="flex items-center gap-1 ps-4 ms-2 border-s border-nude-300">
      {OPTIONS.map(({ lang: option, Flag }) => {
        const active = option === lang;
        const name = STRINGS[option].languageName;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={active}
            aria-label={name}
            title={name}
            lang={option}
            className={`rounded-[3px] p-0.5 transition ${
              active ? 'opacity-100' : 'opacity-40 grayscale hover:opacity-80 hover:grayscale-0'
            }`}
          >
            <Flag className="block h-3 w-[18px] rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          </button>
        );
      })}
    </div>
  );
};
