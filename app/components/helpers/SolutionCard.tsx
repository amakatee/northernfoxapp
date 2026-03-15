import type { FC } from 'react';

interface CardProps {
  /** Main content – either the question or the solution */
  content: string;
  /** Optional author name (displayed at the bottom) */
  author?: string;
  /** Visual variant */
  variant?: 'blue' | 'dark';
  /** Determines whether the card acts as a "problem" (question) or "solution" card */
  mode: 'question' | 'solution';
}

const ProblemSolutionCard: FC<CardProps> = ({
  content,
  author = '',
  variant = 'blue',
  mode,
}) => {
  const bgClass = variant === 'blue'
    ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
    : 'bg-gradient-to-br from-gray-900 to-slate-950';

  // Choose label and styling based on mode (optional – you can adapt)
  const label = mode === 'question' ? 'Problem' : 'Solution';
  const labelColor = mode === 'question' ? 'text-amber-300' : 'text-emerald-300';

  return (
    <div className={`
      relative rounded-2xl overflow-hidden shadow-2xl
      border border-white/10
      ${bgClass}
      transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-900/30
    `}>
      {/* Subtle noise/gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      <div className="relative text-start p-6 md:p-8 h-full flex flex-col">
        {/* Optional small label */}
       

        {/* Main content */}
        <div className="mb-auto">
          <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium tracking-tight">
            {content}
          </p>
        </div>

        {/* Author */}
        {author && (
          <p className="mt-5 text-white/60 text-sm font-medium tracking-wide">
            {author}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProblemSolutionCard;