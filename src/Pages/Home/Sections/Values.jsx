import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import transparencyImg from '../../../assets/images/values.webp';
import speedImg from '../../../assets/images/817045.webp';
import inclusionImg from '../../../assets/images/2151884873.webp';
import resilienceImg from '../../../assets/images/2151883556.webp';

const VALUES = [
  {
    num: '01',
    name: 'Transparency',
    tagline: 'No hidden fees. No fine print.',
    body: "Every fee, rate, and condition is surfaced upfront — before you commit to anything. We built our platform on one rule: if you can't see it, we don't charge it.",
    indent: '0px',
    img: transparencyImg,
    color: '#1c96bf',
  },
  {
    num: '02',
    name: 'Speed',
    tagline: '48-hour decisions. Days, not months.',
    body: "Time is capital. We've rebuilt every step of the finance process to eliminate delays — from application to funds hitting your account.",
    indent: '6vw',
    img: speedImg,
    color: '#06b6d4',
  },
  {
    num: '03',
    name: 'Inclusion',
    tagline: 'If your business is real, you deserve a chance.',
    body: "We don't discriminate by size or geography. Our AI-powered model looks at the full picture of your business health, not just credit scores.",
    indent: '2vw',
    img: inclusionImg,
    color: '#14b8a6',
  },
  {
    num: '04',
    name: 'Resilience',
    tagline: 'Built for volatility. Here when it matters most.',
    body: "Global trade doesn't stop for crises. Neither do we. Our platform is engineered to keep capital flowing through market turbulence.",
    indent: '9vw',
    img: resilienceImg,
    color: '#0891b2',
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
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.5, 0.8, 0.5],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(28,150,191,0.06) 0%, transparent 70%)' }}
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.6, 0.3],
          x: [0, -50, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Background image — faint, right half */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none overflow-hidden">
        <motion.img 
          src={transparencyImg} 
          alt="" 
          className="w-full h-full object-cover opacity-[0.04]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-32 pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p 
              className="text-xs font-bold uppercase tracking-[0.25em] text-teal-500 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              03 Core Values
            </motion.p>
            <motion.h2 
              className="font-black text-white leading-none" 
              style={{ fontSize: 'clamp(24px, 3.5vw, 52px)' }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              What we<br />
              <motion.span 
                className="text-teal-400 inline-block"
                animate={inView ? { 
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                stand for.
              </motion.span>
            </motion.h2>
          </motion.div>
          <motion.p
            className="text-white/25 text-sm max-w-xs leading-relaxed lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            className="relative border-b border-white/6 cursor-default overflow-hidden group"
            style={{ paddingLeft: v.indent }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.97 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.1 + i * 0.11, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Glow background */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0"
              animate={{ 
                opacity: hovered === i ? 0.8 : 0,
                background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(${parseInt(v.color.slice(1, 3), 16)},${parseInt(v.color.slice(3, 5), 16)},${parseInt(v.color.slice(5, 7), 16)},0.15), transparent 80%)`
              }}
              transition={{ duration: 0.35 }}
              style={{ 
                background: hovered === i 
                  ? `linear-gradient(105deg, rgba(28,150,191,0.15) 0%, rgba(28,150,191,0.06) 40%, transparent 70%)`
                  : 'transparent'
              }}
            />

            {/* Hover background wash */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ background: 'linear-gradient(105deg, rgba(28,150,191,0.10) 0%, rgba(28,150,191,0.04) 40%, transparent 70%)' }}
            />

            {/* Image reveal — slides in from right on hover */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden"
              animate={{ 
                opacity: hovered === i ? 1 : 0, 
                x: hovered === i ? 0 : 40 
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img 
                src={v.img} 
                alt="" 
                className="w-full h-full object-cover"
                animate={{ scale: hovered === i ? 1 : 0.95 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, #070d1f 0%, rgba(7,13,31,0.7) 40%, transparent 100%)' }} />
            </motion.div>

            {/* Left accent bar with glow */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5"
              animate={{ 
                scaleY: hovered === i ? 1 : 0,
                boxShadow: hovered === i ? `0 0 16px ${v.color}` : 'none'
              }}
              style={{ 
                transformOrigin: 'top',
                background: v.color
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Top accent line on hover */}
            <motion.div
              className="absolute left-0 top-0 h-px pointer-events-none"
              animate={{ 
                width: hovered === i ? '100%' : '0%',
                opacity: hovered === i ? 0.5 : 0
              }}
              transition={{ duration: 0.4 }}
              style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }}
            />

            {/* Row content */}
            <div className="relative flex items-center gap-6 lg:gap-10 px-6 lg:px-10 py-10 lg:py-12">

              {/* Number with pulse effect */}
              <motion.span
                className="shrink-0 font-black tabular-nums leading-none select-none"
                animate={{ 
                  color: hovered === i ? 'rgba(28,150,191,0.8)' : 'rgba(255,255,255,0.07)',
                  textShadow: hovered === i ? `0 0 20px ${v.color}` : 'none'
                }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 'clamp(24px, 2.8vw, 44px)' }}
              >
                {v.num}
              </motion.span>

              {/* Value name with underline animation */}
              <div className="flex-1 relative">
                <motion.span
                  className="font-black leading-none block"
                  animate={{ 
                    color: hovered === i ? '#ffffff' : 'rgba(255,255,255,0.68)'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 'clamp(22px, 3vw, 48px)', letterSpacing: '-0.02em' }}
                >
                  {v.name}
                </motion.span>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1"
                  style={{ background: v.color }}
                  animate={{ 
                    width: hovered === i ? '100%' : '0%',
                    opacity: hovered === i ? 0.6 : 0
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Right: tagline + body — desktop only */}
              <motion.div
                className="hidden lg:flex flex-col items-end text-right max-w-xs shrink-0 mr-4"
                animate={{ 
                  opacity: hovered === i ? 1 : 0, 
                  x: hovered === i ? 0 : 16,
                  y: hovered === i ? -4 : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p 
                  className="text-sm font-bold mb-1.5"
                  animate={{ color: hovered === i ? v.color : 'rgba(20,184,166,0.9)' }}
                  transition={{ duration: 0.3 }}
                >
                  {v.tagline}
                </motion.p>
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
                <motion.p 
                  className="text-sm font-bold mb-1"
                  animate={{ color: hovered === i ? v.color : 'rgba(20,184,166,0.8)' }}
                  transition={{ duration: 0.3 }}
                >
                  {v.tagline}
                </motion.p>
                <p className="text-white/35 text-xs leading-relaxed">{v.body}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Footer strip ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex items-center justify-between group"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <motion.p 
          className="text-white/15 text-xs uppercase tracking-widest font-medium"
          whileHover={{ color: 'rgba(255,255,255,0.35)' }}
          transition={{ duration: 0.3 }}
        >
          TradeFlink · Est. 2019
        </motion.p>
        <motion.div
          className="inline-flex items-center gap-2 text-xs font-bold text-teal-500 uppercase tracking-widest relative overflow-hidden cursor-pointer"
          whileHover={{ gap: '14px', color: '#ffffff' }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/about" className="absolute inset-0 z-20" aria-label="See how we work" />
          {/* Background shimmer on hover */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.2), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            initial={{ x: '-100%' }}
          />
          <span className="relative z-10">See How We Work</span>
          <motion.svg 
            className="w-3.5 h-3.5 relative z-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2.5}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </motion.div>

    </section>
  );
}
