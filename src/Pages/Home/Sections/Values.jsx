import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import valuesImg from '../../../assets/images/values.jpg';

const VALUES = [
  {
    num: '01',
    name: 'Transparency',
    tagline: 'No hidden fees. No fine print.',
    body: "Every fee, rate, and condition is surfaced upfront — before you commit to anything. We built our platform on one rule: if you can't see it, we don't charge it.",
    indent: '0px',
  },
  {
    num: '02',
    name: 'Speed',
    tagline: '48-hour decisions. Days, not months.',
    body: "Time is capital. We've rebuilt every step of the finance process to eliminate delays — from application to funds hitting your account.",
    indent: '6vw',
  },
  {
    num: '03',
    name: 'Inclusion',
    tagline: 'If your business is real, you deserve a chance.',
    body: "We don't discriminate by size or geography. Our AI-powered model looks at the full picture of your business health, not just credit scores.",
    indent: '2vw',
  },
  {
    num: '04',
    name: 'Resilience',
    tagline: 'Built for volatility. Here when it matters most.',
    body: "Global trade doesn't stop for crises. Neither do we. Our platform is engineered to keep capital flowing through market turbulence.",
    indent: '9vw',
  },
];

export default function Values() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(null);

  return (
    <section
      ref={sectionRef}
      id="values"
      className="relative w-full overflow-hidden"
      style={{ background: '#070d1f' }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Background image — faint, right half */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden">
        <img src={valuesImg} alt="" className="w-full h-full object-cover opacity-[0.04]" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-32 pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-500 mb-3">03 Core Values</p>
            <h2 className="font-black text-white leading-none" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
              What we<br /><span className="text-teal-400">stand for.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-white/25 text-sm max-w-xs leading-relaxed lg:text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Four principles shaping every product decision, every client interaction, every line of code.
          </motion.p>
        </div>
      </div>

      {/* ── Value rows ── */}
      <div className="relative z-10 border-t border-white/6">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.num}
            className="relative border-b border-white/6 cursor-default overflow-hidden"
            style={{ paddingLeft: v.indent }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hover background wash */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ background: 'linear-gradient(105deg, rgba(13,148,136,0.10) 0%, rgba(13,148,136,0.04) 40%, transparent 70%)' }}
            />

            {/* Image reveal — slides in from right on hover */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden"
              animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={valuesImg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, #070d1f 0%, rgba(7,13,31,0.7) 40%, transparent 100%)' }} />
            </motion.div>

            {/* Left accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-500"
              animate={{ scaleY: hovered === i ? 1 : 0 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.3 }}
            />

            {/* Row content */}
            <div className="relative flex items-center gap-6 lg:gap-10 px-6 lg:px-10 py-10 lg:py-12">

              {/* Number */}
              <motion.span
                className="shrink-0 font-black tabular-nums leading-none select-none"
                animate={{ color: hovered === i ? 'rgba(13,148,136,0.6)' : 'rgba(255,255,255,0.07)' }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 'clamp(40px, 4.5vw, 64px)' }}
              >
                {v.num}
              </motion.span>

              {/* Value name */}
              <motion.span
                className="font-black leading-none flex-1"
                animate={{ color: hovered === i ? '#ffffff' : 'rgba(255,255,255,0.68)' }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 'clamp(36px, 5vw, 76px)', letterSpacing: '-0.02em' }}
              >
                {v.name}
              </motion.span>

              {/* Right: tagline + body — desktop only */}
              <motion.div
                className="hidden lg:flex flex-col items-end text-right max-w-xs shrink-0 mr-4"
                animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : 16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-teal-300/90 text-sm font-bold mb-1.5">{v.tagline}</p>
                <p className="text-white/35 text-xs leading-relaxed">{v.body}</p>
              </motion.div>
            </div>

            {/* Mobile: description below name, expands on hover */}
            <motion.div
              className="lg:hidden overflow-hidden"
              animate={{ height: hovered === i ? 'auto' : 0, opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 pb-6">
                <p className="text-teal-300/80 text-sm font-bold mb-1">{v.tagline}</p>
                <p className="text-white/35 text-xs leading-relaxed">{v.body}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Footer strip ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="text-white/15 text-xs uppercase tracking-widest font-medium">TradeFlink · Est. 2014</p>
        <motion.a
          href="#services"
          className="inline-flex items-center gap-2 text-xs font-bold text-teal-500 uppercase tracking-widest"
          whileHover={{ gap: '14px' }}
          transition={{ duration: 0.2 }}
        >
          See How We Work
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>

    </section>
  );
}
