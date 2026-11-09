import type { CSSProperties, ReactNode } from 'react';
import { useLanguage } from '../i18n/language';

// Deterministic pseudo-random in [0, 1): the same layout on every render, without Math.random during render.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type Fall = 'snow' | 'heart' | 'confetti' | 'petal';

interface Decor {
  fall: Fall;
  count: number;
  // Top-left, top-right, bottom-left, bottom-right.
  ornaments: [string, string, string, string];
}

// Same order as GALLERY_THEMES. Default has no decorations.
const DECOR: (Decor | null)[] = [
  null,
  { fall: 'snow', count: 34, ornaments: ['🎄', '⭐', '🔔', '🎁'] },
  { fall: 'heart', count: 18, ornaments: ['💝', '💗', '🌹', '💌'] },
  { fall: 'confetti', count: 30, ornaments: ['🎓', '📜', '🏆', '🌟'] },
  { fall: 'petal', count: 26, ornaments: ['💐', '🕊️', '💍', '🥂'] },
];

const HEART_COLORS = ['#f783ac', '#e64980', '#fcc2d7', '#d6336c', '#faa2c1'];
const CONFETTI_COLORS = ['#c9a227', '#e9cf6b', '#ffffff', '#a5c8ff', '#f1d77e'];
const PETAL_COLORS = ['#f4c2c2', '#fadadd', '#fff5f5', '#efd3c5'];
const GLINT_COUNT = 8;

const ORNAMENT_SPOTS: CSSProperties[] = [
  { top: '12%', left: '6%', fontSize: '4.5rem' },
  { top: '10%', right: '7%', fontSize: '3.75rem' },
  { bottom: '12%', left: '9%', fontSize: '3.5rem' },
  { bottom: '10%', right: '6%', fontSize: '4.75rem' },
];

const particle = (fall: Fall, i: number): ReactNode => {
  const duration = { snow: 12, heart: 11, confetti: 9, petal: 13 }[fall] + rand(i, 2) * 8;
  const style = {
    left: `${rand(i, 1) * 100}%`,
    animationDuration: `${duration}s`,
    // Negative delays start every particle part-way through its path, so the stage is populated on load.
    animationDelay: `${-rand(i, 3) * duration}s`,
    '--drift': `${(rand(i, 4) - 0.5) * 16}cqw`,
    '--spin': `${(rand(i, 5) - 0.5) * 540}deg`,
  } as CSSProperties;
  const size = 8 + rand(i, 6) * 12;

  switch (fall) {
    case 'snow':
      return (
        <span key={i} className="theme-particle theme-particle--fall theme-snow" style={{ ...style, fontSize: size }}>
          ❄
        </span>
      );
    case 'heart':
      return (
        <span
          key={i}
          className="theme-particle theme-particle--rise theme-heart"
          style={{ ...style, fontSize: size + 8, color: HEART_COLORS[i % HEART_COLORS.length] }}
        >
          ❤
        </span>
      );
    case 'confetti':
      return (
        <span
          key={i}
          className="theme-particle theme-particle--tumble theme-confetti"
          style={{ ...style, backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
        />
      );
    case 'petal':
      // Every third particle is a pearl instead of a petal.
      if (i % 3 === 0) {
        const pearl = 6 + rand(i, 6) * 7;
        return (
          <span
            key={i}
            className="theme-particle theme-particle--fall theme-pearl"
            style={{ ...style, width: pearl, height: pearl, animationDuration: `${duration * 1.2}s` }}
          />
        );
      }
      return (
        <span
          key={i}
          className="theme-particle theme-particle--tumble theme-petal"
          style={{ ...style, width: size + 4, height: (size + 4) * 0.75, backgroundColor: PETAL_COLORS[i % PETAL_COLORS.length] }}
        />
      );
  }
};

const glint = (i: number) => (
  <span
    key={`g${i}`}
    className="theme-glint"
    style={{
      left: `${8 + rand(i, 7) * 84}%`,
      top: `${10 + rand(i, 8) * 80}%`,
      fontSize: 8 + rand(i, 9) * 8,
      animationDuration: `${2.5 + rand(i, 10) * 2.5}s`,
      animationDelay: `${-rand(i, 11) * 5}s`,
    }}
  >
    ✦
  </span>
);

// Thin announcement strip above the navbar with the theme's own announcement. The custom message is the NewsTicker.
export const ThemeBanner = ({ theme }: { theme: number }) => {
  const { t } = useLanguage();
  const announcement = t.announcements[theme];
  if (!announcement) return null;

  return (
    <div className="theme-banner">
      <span className="theme-banner-glint" aria-hidden="true">✦</span>
      {announcement}
      <span className="theme-banner-glint" aria-hidden="true">✦</span>
    </div>
  );
};

// Particles and glints, clipped to the nearest positioned parent (the hero or the gallery header band).
export const ThemeParticles = ({ theme }: { theme: number }) => {
  const decor = DECOR[theme];
  if (!decor) return null;

  return (
    <div className="theme-particles" aria-hidden="true">
      {Array.from({ length: decor.count }, (_, i) => particle(decor.fall, i))}
      {Array.from({ length: GLINT_COUNT }, (_, i) => glint(i))}
    </div>
  );
};

// Four themed objects floating in the corners of the hero.
export const ThemeOrnaments = ({ theme }: { theme: number }) => {
  const decor = DECOR[theme];
  if (!decor) return null;

  return (
    <div className="theme-ornaments" aria-hidden="true">
      {decor.ornaments.map((glyph, i) => (
        <span
          key={i}
          className="theme-ornament"
          style={{
            ...ORNAMENT_SPOTS[i],
            '--tilt': `${(rand(i, 12) - 0.5) * 30}deg`,
            animationDelay: `${-i * 1.7}s`,
          } as CSSProperties}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
};
