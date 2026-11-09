import { ThemeOrnaments, ThemeParticles } from './ThemeDecor';

interface HeroProps {
  imageSrc: string;
  title: string;
  tagline: string;
  eyebrow?: string;
  // The custom hero message from the dashboard, shown under the tagline in any theme.
  note?: string | null;
  theme: number;
}

export const Hero = ({ imageSrc, title, tagline, eyebrow, note, theme }: HeroProps) => {
  return (
    <div className="theme-stage relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <div
        className="theme-hero-photo absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="theme-hero-overlay absolute inset-0 bg-black/20"></div>
      </div>
      <ThemeParticles theme={theme} />
      <ThemeOrnaments theme={theme} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {eyebrow && <p className="theme-eyebrow">{eyebrow}</p>}
        <h1 className="theme-title text-5xl md:text-6xl font-serif text-white drop-shadow-lg">
          {title}
        </h1>
        <p className="theme-tagline mt-4 text-nude-100 text-lg font-light">
          {tagline}
        </p>
        {note && (
          <p className="theme-hero-note">
            <span className="theme-banner-glint" aria-hidden="true">✦</span>
            {note}
            <span className="theme-banner-glint" aria-hidden="true">✦</span>
          </p>
        )}
      </div>
    </div>
  );
};
