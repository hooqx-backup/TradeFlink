import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'Before TradeFlink, we waited months for payment. It was crippling our growth. Now we receive funds within days of shipping — we expanded into three new markets.',
    name: 'Aisha Rahman',
    role: 'Textile Exporter',
    location: 'Bangladesh',
    initials: 'AR',
  },
  {
    quote: "TradeFlink's supply chain finance gave us confidence to offer better terms to our suppliers. Relationships improved dramatically",
    name: 'Omar Khalid',
    role: 'FMCG Importer',
    location: 'UAE',
    initials: 'OK',
  },
  {
    quote: 'The transparency is what sets TradeFlink apart. Every fee is clear upfront, every transaction is visible',
    name: 'Priya Menon',
    role: 'Export Manager',
    location: 'India',
    initials: 'PM',
  },
];

const INTERVAL = 5500;

export default function Testimonials() {
  const [active, setActive]   = useState(0);
  const [dir,    setDir]      = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  function go(i) {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }

  useEffect(() => {
    setProgress(0);
    const t0  = Date.now();
    const pid = setInterval(() => setProgress(Math.min(((Date.now() - t0) / INTERVAL) * 100, 100)), 40);
    timerRef.current = setTimeout(() => go((active + 1) % TESTIMONIALS.length), INTERVAL);
    return () => { clearInterval(pid); clearTimeout(timerRef.current); };
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center"
      style={{ background: '#060d1f', height: '86vh', padding: '5rem 0' }}
    >
      {/* Enormous ghost quote mark */}
      <div
        className="absolute left-6 lg:left-16 top-0 font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(200px, 28vw, 380px)', color: 'rgba(28,150,191,0.05)', lineHeight: 0.7 }}
      >
        "
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10 lg:mb-14">
          <span className="h-px w-8 bg-teal-500" />
          <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.22em]">Client Stories</span>
        </div>

        {/* Full-width quote */}
        <div className="mb-12 lg:mb-16" style={{ height: 'clamp(11rem, 16vw, 16rem)' }}>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              className="font-black text-white leading-tight max-w-5xl"
              style={{ fontSize: 'clamp(24px, 3.8vw, 52px)' }}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              "{t.quote}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Author + controls row */}
        <div className="flex min-h-22 flex-col justify-between gap-8 sm:flex-row sm:items-center">

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div key={active + '-author'} className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                {t.initials}
              </div>
              <div className="h-6 w-px bg-white/15" />
              <div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-white/35 text-xs">{t.role} · {t.location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-5">
            {/* Counter */}
            <span className="text-white/20 text-xs font-mono tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>

            {/* Progress */}
            <div className="w-24 h-px bg-white/10 overflow-hidden">
              <div className="h-full bg-teal-400 transition-none" style={{ width: `${progress}%` }} />
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              {[{ d: -1, path: 'M15 19l-7-7 7-7' }, { d: 1, path: 'M9 5l7 7-7 7' }].map(({ d, path }) => (
                <button key={d}
                  onClick={() => go((active + d + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/30 hover:text-white hover:border-white/40 transition">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="mt-14 lg:mt-20 pt-8 border-t border-white/08 grid grid-cols-3 gap-8">
          {[['1000+', 'Businesses trusted us'], ['70+', 'Countries'], ['98%', 'Client satisfaction']].map(([val, label]) => (
            <div key={label}>
              <p className="text-2xl font-black text-teal-400 mb-1">{val}</p>
              <p className="text-xs text-white/25 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
