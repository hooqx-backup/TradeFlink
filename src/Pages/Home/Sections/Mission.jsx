import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import missionImg from '../../../assets/images/mission.webp';

const GLITCH_CHARS = '0123456789ABCDEF#@!?><';

function useGlitch(value, active) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!active) { setDisplay(value); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame > 10) { setDisplay(value); clearInterval(id); return; }
      setDisplay(
        Array.from({ length: value.length }, () =>
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join('')
      );
    }, 45);
    return () => clearInterval(id);
  }, [active, value]);
  return display;
}

const BRACKETS = [
  'top-2 left-2 border-l-2 border-t-2',
  'top-2 right-2 border-r-2 border-t-2',
  'bottom-2 left-2 border-l-2 border-b-2',
  'bottom-2 right-2 border-r-2 border-b-2',
];

function PillarRow({ p, i, inView }) {
  const [hovered, setHovered] = useState(false);
  const glitchNum = useGlitch(p.num, hovered);

  return (
    <motion.div
      className="relative flex gap-5 lg:gap-8 py-8 lg:py-10 border-b border-gray-100 last:border-0 cursor-default overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dark tech background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: 'linear-gradient(105deg, #030912 0%, #061022 55%, #030912 100%)' }}
      />

      {/* Circuit grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 0.055 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(28,150,191,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,150,191,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Scan line — fires on hover */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(28,150,191,0.9) 35%, rgba(200,255,245,0.7) 50%, rgba(28,150,191,0.9) 65%, transparent 100%)',
        }}
        animate={hovered ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.75, ease: 'linear' }}
      />

      {/* Corner targeting brackets */}
      {BRACKETS.map((cls, ci) => (
        <motion.div
          key={ci}
          className={`absolute w-4 h-4 border-teal-400 pointer-events-none ${cls}`}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.18, delay: ci * 0.04 }}
        />
      ))}

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-500 pointer-events-none"
        animate={{ scaleY: hovered ? 1 : 0 }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Right edge glow */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'linear-gradient(to left, rgba(28,150,191,0.08) 0%, transparent 100%)' }}
      />

      {/* Number */}
      <motion.span
        className="relative z-10 shrink-0 font-black tabular-nums leading-none font-mono"
        animate={{ color: hovered ? '#14b8a6' : '#e5e7eb' }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 0.85 }}
      >
        {glitchNum}
      </motion.span>

      <div className="relative z-10 flex-1 pt-1 lg:pt-2">
        {/* Sys readout */}
        <motion.p
          className="font-mono text-[9px] lg:text-[10px] uppercase tracking-widest mb-1.5"
          style={{ color: 'rgba(45,212,191,0.55)' }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
          transition={{ duration: 0.2, delay: 0.08 }}
        >
          SYS.MODULE_{p.num} · STATUS: ACTIVE · VER 2.4.1
        </motion.p>

        {/* Title */}
        <motion.h3
          className="text-xl lg:text-2xl xl:text-3xl font-black mb-2 lg:mb-3"
          animate={{ color: hovered ? '#2dd4bf' : '#111827' }}
          transition={{ duration: 0.2 }}
        >
          {p.title}
        </motion.h3>

        {/* Body */}
        <motion.p
          className="text-sm leading-relaxed mb-3 lg:mb-4 max-w-md"
          animate={{ color: hovered ? 'rgba(255,255,255,0.42)' : '#9ca3af' }}
          transition={{ duration: 0.2 }}
        >
          {p.body}
        </motion.p>

        {/* Accent pill */}
        <motion.span
          className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
          animate={{
            backgroundColor: hovered ? 'rgba(28,150,191,0.15)' : 'rgb(240,253,250)',
            color: hovered ? '#2dd4bf' : '#1C96BF',
          }}
          style={{ border: '1px solid', borderColor: hovered ? 'rgba(28,150,191,0.35)' : 'transparent' }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
          {p.accent}
        </motion.span>
      </div>
    </motion.div>
  );
}

const PILLARS = [
  {
    num: '01',
    title: 'Access',
    body: 'Tear down the walls blocking SMEs from global capital — starting with instant digital onboarding and zero paperwork.',
    accent: 'Invoice discounting in under 48 hours',
  },
  {
    num: '02',
    title: 'Speed',
    body: 'Compress weeks of approval cycles into 48 hours or less through intelligent, data-driven decisioning.',
    accent: 'AI-powered risk assessment',
  },
  {
    num: '03',
    title: 'Trust',
    body: 'Build transparent relationships between exporters, importers, and investors — every fee visible, every step trackable.',
    accent: 'Complete fee transparency',
  },
  {
    num: '04',
    title: 'Scale',
    body: 'Grow with every business we touch — from first invoice to multi-market expansion across 70+ countries.',
    accent: 'Dedicated relationship manager',
  },
];

export default function Mission() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} id="mission" className="relative w-full bg-white overflow-hidden">

      {/* ══ Desktop: sticky-left image + scrolling-right content ══ */}
      <div className="hidden lg:flex">

        {/* Left: sticky image panel */}
        <div className="w-[42%] shrink-0 relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={missionImg} alt="Our Mission" className="w-full h-full object-cover" />
            {/* Gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 50%, white 100%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 35%)' }} />
            {/* Label on image */}
            <div className="absolute bottom-14 left-12">
              <p className="text-white/40 text-xs uppercase tracking-[0.28em] font-bold mb-2">02 Mission</p>
              <p className="text-white font-black leading-tight" style={{ fontSize: 'clamp(18px, 2.2vw, 32px)' }}>
                Empowering<br />SMEs<br />Globally
              </p>
            </div>
            {/* Top-left teal accent */}
            <div className="absolute top-12 left-12 flex items-center gap-3">
              <span className="h-px w-8 bg-teal-400/80" />
              <span className="text-teal-300 text-xs font-bold uppercase tracking-[0.22em]">Our Mission</span>
            </div>
          </div>
        </div>

        {/* Right: scrolling content */}
        <div className="flex-1 px-14 xl:px-20 pt-24 pb-28">

          {/* Mission statement */}
          <motion.div
            className="mb-16 pb-12 border-b border-gray-100"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600 mb-4">Our Purpose</p>
            <h2 className="font-black text-gray-900 leading-none" style={{ fontSize: 'clamp(32px, 3.8vw, 60px)' }}>
              Empower every SME<br />
              <span className="text-teal-600">to thrive in global trade.</span>
            </h2>
            <p className="text-gray-400 mt-5 text-base leading-relaxed max-w-lg">
              We don&apos;t just finance invoices. We remove every barrier standing between an ambitious business and the global economy.
            </p>
          </motion.div>

          {/* Pillar items */}
          {PILLARS.map((p, i) => (
            <PillarRow key={p.num} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>

      {/* ══ Mobile: stacked layout ══ */}
      <div className="lg:hidden">
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img src={missionImg} alt="Our Mission" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,10,24,0.4), rgba(4,10,24,0.7))' }} />
          <div className="absolute bottom-8 left-6">
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">02 Mission</p>
            <p className="text-white font-black text-3xl leading-tight">Empowering SMEs<br />Globally</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-10 pb-16">
          <h2 className="font-black text-gray-900 text-3xl leading-tight mb-4">
            Empower every SME<br />
            <span className="text-teal-600">to thrive in global trade.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            We don&apos;t just finance invoices. We remove every barrier standing between an ambitious business and the global economy.
          </p>

          {PILLARS.map((p, i) => (
            <PillarRow key={p.num} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>

    </section>
  );
}
