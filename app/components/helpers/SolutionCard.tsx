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
  // Премиум гладкие градиенты 2026 стиля
  const gradient =
    mode === 'question'
      ? 'from-[#0a0e1f] via-[#0f162e] to-[#131a38]'           // очень тёмный, глубокий navy-indigo, матовый
      : 'from-[#1e40af]  to-[#3b82f6]';          // чистый, плавный, уверенный blue-indigo, светлее и живее

  // Тонкий световой налёт (glass-like, но минималистичный)
  const lightOverlay = mode === 'question' ? '0.03' : '0.07';

  return (
    <div
    
      className={`
        group relative rounded-3xl overflow-hidden
        border border-white/[0.06]
        bg-gradient-to-br ${gradient}
        shadow-xl shadow-black/50
        transition-all duration-500 ease-out
        hover:scale-[1.012] hover:shadow-2xl hover:shadow-indigo-950/20
        hover:border-white/[0.10]
      `}
    >
      {/* Очень тонкий, дорогой световой оверлей (без шума, чисто) */}
      <div
        className={`
          absolute inset-0 pointer-events-none
          bg-gradient-to-t from-transparent via-white/[${lightOverlay}] to-transparent
          opacity-60 group-hover:opacity-80
          transition-opacity duration-700
        `}
      />

      <div className="relative  z-10 px-3 py-3 md:px-8 md:py-9 h-full flex flex-col">
        <p
          className={`
            mb-auto text-white/95 font-normal
            text-[.8rem] leading-relaxed tracking-wider
            md:text-xl md:leading-relaxed
          `}
        >
          {content}
        </p>

        {author && (
          <p
            className={`
              mt-6 text-[.6rem] md:text-base font-medium tracking-wide
              ${mode === 'solution' ? 'text-blue-200/80' : 'text-slate-400/70'}
            `}
          >
            {author}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProblemSolutionCard;