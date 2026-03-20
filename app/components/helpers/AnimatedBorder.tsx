import React, { useMemo } from 'react';

interface AnimatedBorderWithGlowProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  borderWidth?: number;
  color?: string;
  glowColor?: string;
  topBottomGlowBlur?: number;
  leftRightGlowBlur?: number;
  topBottomGlowSpread?: number;
  leftRightGlowSpread?: number;
  duration?: number;
  segmentLength?: number;
  borderRadius?: number;
  className?: string;
  edgeFade?: number; // интенсивность затухания краёв (0-10)
}

const AnimatedBorderWithGlow: React.FC<AnimatedBorderWithGlowProps> = ({
  children,
  width = 350,
  height = 580,
  borderWidth = 1,
  color = '#3b82f6',
  glowColor = 'rgba(59, 130, 246, 0.1)',
  topBottomGlowBlur = 8,
  leftRightGlowBlur = 10,
  topBottomGlowSpread = 1,
  leftRightGlowSpread = 1,
  duration = 7,
  segmentLength = 550,
  borderRadius = 8,
  className = '',
  edgeFade = 3, // интенсивность размытия краёв (0 - нет размытия, 5 - сильное)
}) => {
  const rx = Math.min(borderRadius, width / 2, height / 2);
  const perimeter = 2 * ((width - borderWidth) + (height - borderWidth));
  const safeSegment = Math.min(segmentLength, perimeter - 1);
  const gap = perimeter - safeSegment;
  const dashArray = `${safeSegment} ${gap}`;

  // Уникальные идентификаторы
  const filterId = `edgeFade-${color.replace(/[^a-zA-Z0-9]/g, '')}`;
  const glowFilterId = `glow-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  const glowStyle = useMemo(
    () => ({
      boxShadow: `
        0 -${topBottomGlowBlur}px ${topBottomGlowBlur}px ${topBottomGlowSpread}px ${glowColor},
        0 ${topBottomGlowBlur}px ${topBottomGlowBlur}px ${topBottomGlowSpread}px ${glowColor},
        -${leftRightGlowBlur}px 0 ${leftRightGlowBlur}px ${leftRightGlowSpread}px ${glowColor},
        ${leftRightGlowBlur}px 0 ${leftRightGlowBlur}px ${leftRightGlowSpread}px ${glowColor}
      `,
      borderRadius: rx,
    }),
    [topBottomGlowBlur, leftRightGlowBlur, topBottomGlowSpread, leftRightGlowSpread, glowColor, rx],
  );

  return (
    <div className={`relative inline-block ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 pointer-events-none" style={glowStyle} />
      <div className="absolute inset-0 text-white rounded-lg p-4">{children}</div>

      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Фильтр для размытия краёв сегмента */}
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={edgeFade} result="blur" />
            <feComponentTransfer in="blur" result="alpha">
              <feFuncA type="linear" slope="1" intercept="0" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="alpha" operator="in" />
          </filter>

          {/* Фильтр для дополнительного свечения */}
          <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={3} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

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
          strokeDashoffset={0}
          filter={edgeFade > 0 ? `url(#${filterId})` : undefined}
          style={
            {
              animation: `dashMove ${duration}s linear infinite`,
              '--perimeter': `-${perimeter}px`,
            } as React.CSSProperties
          }
        />

        {/* Дополнительный слой для свечения (опционально) */}
        {edgeFade > 0 && (
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            rx={rx}
            ry={rx}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth * 1.5}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            strokeDashoffset={0}
            filter={`url(#${glowFilterId})`}
            opacity={0.3}
            style={{
              animation: `dashMove ${duration}s linear infinite`,
              '--perimeter': `-${perimeter}px`,
            } as React.CSSProperties}
          />
        )}
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