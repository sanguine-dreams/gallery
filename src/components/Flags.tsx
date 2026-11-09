import { useId } from 'react';

// Flags are drawn as SVG because Windows does not render flag emoji (it shows letters like "IQ").

export const UkFlag = ({ className }: { className?: string }) => {
  // Unique per instance, so two flags on one page never share a clip path.
  const id = useId();
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id={`${id}s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
};

// Red, white and black bands with the green takbir across the white band.
export const IraqFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 900 600" className={className} aria-hidden="true">
    <rect width="900" height="200" fill="#CE1126" />
    <rect y="200" width="900" height="200" fill="#FFFFFF" />
    <rect y="400" width="900" height="200" fill="#000000" />
    <text
      x="450"
      y="345"
      fill="#007A3D"
      fontFamily="Amiri, 'Traditional Arabic', serif"
      fontSize="150"
      fontWeight="700"
      textAnchor="middle"
      direction="rtl"
    >
      الله أكبر
    </text>
  </svg>
);
