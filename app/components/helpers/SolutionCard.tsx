import type { FC } from 'react';

interface CardProps {
  content: string;
  author?: string;
  mode: 'question' | 'solution';
}

const ProblemSolutionCard: FC<CardProps> = ({
  content,
  author = '',
  mode,
}) => {
  // Darly-inspired gradients – semi-transparent for blur to show through
  const gradient =
    mode === 'question'
      ? 'from-[#0a0e1fcc] via-[#0f162ecc] to-[#131a38cc]/30' // deep navy with opacity
      : 'from-[#1e40afcc] to-[#3b82f6cc]';                 // vibrant blue with opacity

  // Softer, more refined light overlay
  const lightOverlay = mode === 'question' ? 'white/[0.02]' : 'white/[0.05]';

  return (
    <div
      className={`
        group relative rounded-3xl overflow-hidden
        border border-white/[0.08]
        opacity-80
        bg-gradient-to-br ${gradient}
        backdrop-blur-xl backdrop-saturate-150
        shadow-xl shadow-black/30
        transition-all duration-500 ease-out
        hover:scale-[1.015] hover:shadow-2xl hover:shadow-indigo-900/30
        hover:border-white/[0.15]
      `}
    >
      {/* Subtle animated light sweep – inspired by Darly's signature glow */}
      <div
        className={`
        
          absolute inset-0 pointer-events-none
          bg-gradient-to-t from-transparent via-${lightOverlay} to-transparent
          group-hover:opacity-100
          transition-opacity duration-1000
        `}
      />

      <div className="relative z-10 px-3 py-3 md:px-8 md:py-9 h-full flex backdrop-blur-2xl  flex-col">
        <p
          className={`
       
            mb-auto text-white/95 font-light
            text-sm leading-relaxed tracking-wide
            md:text-xl md:leading-relaxed
          `}
        >
          {content}
        </p>

        {author && (
          <p
            className={`
              mt-6 text-xs md:text-base font-medium tracking-wide
              ${mode === 'solution' ? 'text-blue-200/90' : 'text-slate-400/80'}
            `}
          >
            {author}
          </p>
        )}
      </div>

      {/* Optional: subtle noise texture for extra depth (comment if not desired) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')]" />
    </div>
  );
};

export default ProblemSolutionCard;