// The custom banner message as a scrolling news strip, placed under the hero or the gallery header band.
// The track holds two identical halves and slides left by exactly one half, so the loop has no visible seam.
const COPIES_PER_HALF = 4;

export const NewsTicker = ({ text }: { text: string | null }) => {
  if (!text) return null;

  // Longer messages scroll for longer, so the reading speed stays about the same.
  const duration = 18 + text.length * 0.6;
  const half = (key: string) => (
    <div className="theme-ticker-half" aria-hidden={key === 'b'}>
      {Array.from({ length: COPIES_PER_HALF }, (_, i) => (
        <span key={`${key}${i}`} className="theme-ticker-item">
          {text}
          <span className="theme-ticker-glint" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="theme-ticker" role="marquee" aria-label={text}>
      <div className="theme-ticker-track" style={{ animationDuration: `${duration}s` }}>
        {half('a')}
        {half('b')}
      </div>
    </div>
  );
};
