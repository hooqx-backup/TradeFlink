import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/1896.webp';
import img2 from '../../../assets/images/6533.webp';
import img3 from '../../../assets/images/117180.webp';

const SLIDES   = [img1, img2, img3];
const DURATION = 1000;
const INTERVAL = 6000;

const HEADLINES = [
  ['GLOBAL', 'TRADE', 'MADE HUMAN.'],
  ['BORDERS', "DON'T", 'STOP US.'],
  ['FUND', 'YOUR', 'GROWTH.'],
];

const STATS = [
  { val: '$4.5T+', label: 'Finance gap' },
  { val: '70+',    label: 'Countries' },
  { val: '$2B+',   label: 'Trade funded' },
  { val: '48h',    label: 'Funding speed' },
];

export default function Hero() {
  const [cur,      setCur]      = useState(0);
  const [nxt,      setNxt]      = useState(null);
  const [dir,      setDir]      = useState(1);
  const [ready,    setReady]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [kbKey,    setKbKey]    = useState(0);
  const busy = useRef(false);

  const goTo = useCallback((idx, direction = 1) => {
    if (busy.current || idx === cur) return;
    busy.current = true;
    setDir(direction); setNxt(idx); setReady(false);
  }, [cur]);

  useEffect(() => {
    if (nxt === null) return;
    let r1, r2;
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setReady(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [nxt]);

  useEffect(() => {
    if (!ready || nxt === null) return;
    const t = setTimeout(() => {
      setCur(nxt); setNxt(null); setReady(false);
      setKbKey(k => k + 1); busy.current = false;
    }, DURATION);
    return () => clearTimeout(t);
  }, [ready, nxt]);

  useEffect(() => {
    setProgress(0);
    const t0  = Date.now();
    const pid = setInterval(() => setProgress(Math.min(((Date.now() - t0) / INTERVAL) * 100, 100)), 40);
    const tid = setTimeout(() => goTo((cur + 1) % SLIDES.length, 1), INTERVAL);
    return () => { clearInterval(pid); clearTimeout(tid); };
  }, [cur, goTo]);

  function slideStyle(i) {
    const off  = dir > 0 ? '100%' : '-100%';
    const exit = dir > 0 ? '-5%'  : '5%';
    const ease = `transform ${DURATION}ms cubic-bezier(0.86,0,0.07,1)`;
    if (nxt === null) return { transform: i === cur ? 'translateX(0)' : `translateX(${dir > 0 ? '100%' : '-100%'})`, zIndex: i === cur ? 2 : 0, transition: 'none', opacity: i === cur ? 1 : 0 };
    if (!ready) {
      if (i === cur) return { transform: 'translateX(0)', zIndex: 2, transition: 'none', opacity: 1 };
      if (i === nxt) return { transform: `translateX(${off})`, zIndex: 3, transition: 'none', opacity: 1 };
      return { zIndex: 0, opacity: 0, transition: 'none' };
    }
    if (i === cur) return { transform: `translateX(${exit})`, zIndex: 2, transition: ease, opacity: 1 };
    if (i === nxt) return { transform: 'translateX(0)', zIndex: 3, transition: ease, opacity: 1 };
    return { zIndex: 0, opacity: 0, transition: 'none' };
  }

  const active = nxt !== null ? nxt : cur;

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100svh', minHeight: '600px' }}>

      {/* ── Slides ── */}
      {SLIDES.map((src, i) => (
        <div key={i} className="absolute inset-0 overflow-hidden" style={slideStyle(i)}>
          <div
            key={i === cur ? kbKey : `idle-${i}`}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${i === cur && nxt === null ? 'hero-kb' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}

      {/* ── Gradients ── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.35) 100%)' }} />
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />

      {/* ── Main content — bottom-left anchored ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 sm:px-10 lg:px-16 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-teal-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="text-teal-300 text-[10px] lg:text-xs uppercase tracking-[0.28em] font-bold">
              Invoice &amp; Supply-Chain Finance · Global Trade
            </span>
          </div>

          {/* ── Enormous stacked headline — changes per slide ── */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={cur}
              className="font-clash font-semibold text-white leading-[1.35] tracking-wide mb-6 lg:mb-8"
              style={{ fontSize: 'clamp(30px, 3.8vw, 52px)' }}
            >
              {HEADLINES[cur].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    className={`block ${i === 1 ? 'text-teal-400' : 'text-white'}`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* ── Description + CTA + Stats row ── */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">

            {/* Description + buttons */}
            <div className="shrink-0">
              <p className="text-gray-300/80 text-md leading-relaxed max-w-xs mb-5">
                Trade without borders, limits, or delays. Empowering SMEs with fast and inclusive global finance.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link to="/contact"
                  className="px-6 py-2.5 bg-teal-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-teal-400 active:scale-95 transition-all">
                  Contact Us
                </Link>
                <a href="#services"
                  className="group px-6 py-2.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:border-white/50 hover:bg-white/5 active:scale-95 transition-all flex items-center gap-2">
                  Explore
                  <motion.svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:gap-10 lg:ml-auto flex-wrap">
              {STATS.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                >
                  <p className="text-white font-black text-xl lg:text-2xl leading-none">{s.val}</p>
                  <p className="text-white/30 text-[9px] mt-1 uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > cur ? 1 : -1)}
                  className={`h-px rounded-full transition-all duration-300 cursor-pointer ${i === active ? 'w-8 bg-teal-400' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  style={{ height: '2px' }} />
              ))}
            </div>
            <span className="text-white/20 text-[10px] font-mono tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
            <div className="flex-1 h-px bg-white/10 overflow-hidden">
              <div className="h-full bg-teal-400 transition-none" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex gap-1.5">
              {[{ d: -1, path: 'M15 19l-7-7 7-7' }, { d: 1, path: 'M9 5l7 7-7 7' }].map(({ d, path }) => (
                <button key={d}
                  onClick={() => goTo(d === -1 ? (cur - 1 + SLIDES.length) % SLIDES.length : (cur + 1) % SLIDES.length, d)}
                  className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/35 hover:text-white hover:border-white/40 transition">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator — right edge ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3 hidden lg:flex">
        <div className="relative h-20 w-px bg-white/15 overflow-hidden">
          <motion.div className="absolute top-0 left-0 right-0 bg-teal-400"
            animate={{ height: ['0%', '100%'], top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </div>
        <span className="text-white/20 text-[8px] uppercase tracking-[0.35em]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          scroll
        </span>
      </div>

    </section>
  );
}
