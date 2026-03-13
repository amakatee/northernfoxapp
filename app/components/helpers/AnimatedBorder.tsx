import React, { useMemo } from 'react';

interface AnimatedBorderWithGlowProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  borderWidth?: number;          // толщина анимированной линии
  color?: string;                // цвет линии
  glowColor?: string;            // цвет свечения (рекомендуется rgba с прозрачностью)
  topBottomGlowBlur?: number;    // радиус размытия сверху/снизу (px)
  leftRightGlowBlur?: number;    // радиус размытия по бокам (px)
  topBottomGlowSpread?: number;  // распространение свечения сверху/снизу (px)
  leftRightGlowSpread?: number;  // распространение по бокам (px)
  duration?: number;
  segmentLength?: number;        // длина видимого сегмента
  borderRadius?: number;
  className?: string;
}

const AnimatedBorderWithGlow: React.FC<AnimatedBorderWithGlowProps> = ({
  children,
  width = 320,
  height = 160,
  borderWidth = 3,
  color = '#3b82f6',
  glowColor = 'rgba(59, 130, 246, 0.4)', // полупрозрачный синий по умолчанию
  topBottomGlowBlur = 20,
  leftRightGlowBlur = 10,
  topBottomGlowSpread = 5,
  leftRightGlowSpread = 2,
  duration = 3,
  segmentLength = 50,
  borderRadius = 8,
  className = '',
}) => {
  const rx = Math.min(borderRadius, width / 2, height / 2);
  const perimeter = 2 * (width + height - 2 * borderWidth);
  const safeSegment = Math.min(segmentLength, perimeter - 1);
  const gap = perimeter - safeSegment;
  const dashArray = `${safeSegment} ${gap}`;

  // Мемоизируем стиль свечения, чтобы избежать лишних пересозданий
  const glowStyle = useMemo(() => ({
    boxShadow: `
      0 -${topBottomGlowBlur}px ${topBottomGlowBlur}px ${topBottomGlowSpread}px ${glowColor},
      0 ${topBottomGlowBlur}px ${topBottomGlowBlur}px ${topBottomGlowSpread}px ${glowColor},
      -${leftRightGlowBlur}px 0 ${leftRightGlowBlur}px ${leftRightGlowSpread}px ${glowColor},
      ${leftRightGlowBlur}px 0 ${leftRightGlowBlur}px ${leftRightGlowSpread}px ${glowColor}
    `,
    borderRadius: rx,
  }), [topBottomGlowBlur, leftRightGlowBlur, topBottomGlowSpread, leftRightGlowSpread, glowColor, rx]);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width, height }}
    >
      {/* 1. Слой свечения (позади контента) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={glowStyle}
      />

      {/* 2. Контент (поверх свечения) */}
      <div className="absolute inset-0  text-white rounded-lg p-4">
        {children}
      </div>

      {/* 3. Анимированная линия (поверх контента) */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={width - borderWidth}
          height={height - borderWidth}
          rx={rx}
          ry={rx}
          fill="none"
          stroke={color}
          strokeWidth={borderWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          style={{
            animation: `dashMove ${duration}s linear infinite`,
            ['--perimeter' as any]: `-${perimeter}px`,
          }}
        />
      </svg>

      <style jsx>{`
        @keyframes dashMove {
          to {
            stroke-dashoffset: var(--perimeter, -${perimeter}px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBorderWithGlow;