import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import p1 from '../../assets/logos/partner1.webp';
import p2 from '../../assets/logos/partner7.png';
import p3 from '../../assets/logos/partner3.webp';
import p4 from '../../assets/logos/partner8.png';
import p5 from '../../assets/logos/partner5.webp';
import p6 from '../../assets/logos/partner6.webp';

const partners = [p1, p2, p3, p4, p5, p6];

export default function Partners({ title = 'Our Partners' }) {
  const reduce = useReducedMotion();

  const slides = [...partners, ...partners];

  const loopDuration = 10; // seconds

  // Auto-play using CSS transform via Framer Motion when not paused
  const slideAnim = reduce ? undefined : { x: ['0%', '-50%'] };
  const slideTransition = reduce
    ? undefined
    : { x: { repeat: Infinity, repeatType: 'loop', duration: loopDuration, ease: 'linear' } };

  // No hover interactions — slider auto-plays continuously.

  return (
    <section className="w-full overflow-hidden py-20">
      <div className="container-xl mx-auto">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-200">Trusted By</h3>
          <h2 className="text-5xl font-extrabold text-white">{title}</h2>
        </div>

        <div className="relative mx-auto w-full">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 -z-10 h-full w-1/3 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 10% 80%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)',
              filter: 'blur(64px)',
              mixBlendMode: 'screen',
            }}
            animate={reduce ? undefined : { x: [0, -12, 0], y: [0, 6, 0] }}
            transition={reduce ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute right-0 bottom-0 -z-10 h-full w-1/3 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 90% 20%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 30%, transparent 55%)',
              filter: 'blur(64px)',
              mixBlendMode: 'screen',
            }}
            animate={reduce ? undefined : { x: [0, 12, 0], y: [0, -6, 0] }}
            transition={reduce ? undefined : { duration: 36, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div
            className="pointer-events-auto -mx-4 overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
            }}
          >
            <motion.div
              className="flex w-max gap-8 px-6 py-6 items-center"
              animate={slideAnim}
              transition={slideTransition}
              style={{ willChange: 'transform' }}
            >
              {slides.map((src, i) => {
                const realIdx = i % partners.length;

                return (
                  <div key={i} className="relative flex shrink-0 items-center justify-center rounded-2xl bg-white/4 px-8 py-8">
                    <div
                      role="img"
                      aria-label={`partner-${realIdx + 1}`}
                      className="w-40 h-20 sm:w-50 sm:h-24 lg:w-55 lg:h-28"
                      style={{
                        background: 'linear-gradient(90deg, #0ea5e9 0%, #1C96BF 100%)',
                        WebkitMaskImage: 'url(' + src + ')',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        maskImage: 'url(' + src + ')',
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        maskPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                    />
                    <img src={src} alt={`partner-${realIdx + 1}`} className="sr-only" />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
