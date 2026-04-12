'use client'
export default function HireUs() {
  return (
    <section className="w-full bg-white py-28 flex justify-center">
      <div className="relative px-12 py-20 rounded-[36px] text-white max-w-4xl w-full hireus">
        <h2 className="text-5xl font-semibold mb-6">Hire Us</h2>
        <p className="text-xl opacity-80 max-w-2xl leading-relaxed">
          We craft digital experiences with precision, motion and soul.  
          If you want your product to feel alive — we’re the team.
        </p>

        {/* INLINE STYLES + CSS-IN-JSX */}
        <style jsx>{`
          .hireus {
            background: radial-gradient(
              circle at 50% 0%,
              rgba(30, 30, 30, 0.9),
              #0c0c0c 70%
            );
          }

          /* glowing rotating border */
          .hireus::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;

            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 300deg,
              rgba(0, 255, 220, 1) 330deg,
              transparent 360deg
            );

            padding: 2px;

            /* mask to keep only border */
            -webkit-mask: 
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;

            filter: blur(6px);
            animation: rotate 6s linear infinite;
            z-index: 2;
          }

          /* glow under the block */
          .hireus::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(
              circle at 50% 100%,
              rgba(0, 255, 220, 0.35),
              transparent 70%
            );
            filter: blur(55px);
            z-index: -1;
          }

          @keyframes rotate {
            to {
              transform: rotate(360deg);
            }
          }

          /* mobile adjustments */
          @media (max-width: 640px) {
            .hireus {
              padding: 2.5rem 1.75rem;
              border-radius: 28px;
            }
            .hireus::before {
              inset: -1px;
              padding: 1px;
              filter: blur(3px);
            }
            .hireus::after {
              filter: blur(30px);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
