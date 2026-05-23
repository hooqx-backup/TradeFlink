import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import aboutImg from '../../../assets/images/2151884873.webp';

const PILLARS = [
  'Invoice discounting in under 48 hours',
  'AI-powered risk assessment',
  'Multi-currency settlement',
  'Dedicated relationship manager',
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const inView     = useInView(sectionRef, { once: false, margin: '-60px' });

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
    >
      {/* Top rule */}
      <div className="h-px w-full bg-gray-100" />

      <div className="grid grid-cols-1 lg:grid-cols-[45vw_1fr] min-h-[80vh]">

        {/* ── Left: full-bleed image, no container ── */}
        <div ref={imageRef} className="relative overflow-hidden" style={{ minHeight: '420px' }}>
          <motion.img
            src={aboutImg}
            alt="Global Trade Finance"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: imageY }}
          />
          {/* Gradient overlay — darkens bottom and right edges for reading legibility */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, transparent 60%, #fff 100%), linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />

          {/* Founded year — floats over image bottom-left */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-1">Founded</p>
            <p className="text-white font-black text-5xl leading-none">2019</p>
          </motion.div>

          {/* Live badge */}
          <motion.div
            className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.7 }}
          >
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="text-white text-xs font-bold">Live transactions 24/7</span>
          </motion.div>
        </div>

        {/* ── Right: magazine column layout ── */}
        <div className="relative px-10 lg:px-14 xl:px-20 py-16 lg:py-20 flex flex-col justify-center">

          {/* Ghost year behind content */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none opacity-[0.035] text-gray-900"
            style={{ fontSize: 'clamp(120px, 14vw, 200px)' }}
          >
            2019
          </div>

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.08 }}
          >
            <span className="h-px w-8 bg-teal-500" />
            <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.22em]">Who We Are</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              className="text-3xl lg:text-4xl font-black text-gray-900 leading-none"
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Rethinking<br />
              <span className="text-teal-600">Global Trade Finance</span>
            </motion.h2>
          </div>

          {/* Pull quote — breaks out of normal flow */}
          <motion.blockquote
            className="border-l-4 border-teal-500 pl-5 my-7 text-xl font-black text-gray-800 leading-snug"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.26, delay: 0.3 }}
          >
            "No good business should struggle because of delayed payments."
          </motion.blockquote>

          {/* Body copy */}
          <motion.p
            className="text-gray-500 leading-relaxed text-base mb-7"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.08, delay: 0.35 }}
          >
            Tradeflink was founded on a simple belief. For too long, SMEs have been left behind in global trade because traditional finance institutions see them as "too small" or "too risky." We're changing that through smart financial technology — connecting exporters, importers, and investors across <strong className="text-gray-800">70+ countries</strong> seamlessly.
          </motion.p>

          {/* Checklist — staggered */}
          <ul className="space-y-3 mb-10">
            {PILLARS.map((p, i) => (
              <motion.li
                key={p}
                className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.07 }}
              >
                <motion.span
                  className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.3, backgroundColor: '#1C96BF' }}
                >
                  <svg className="w-2.5 h-2.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.span>
                {p}
              </motion.li>
            ))}
          </ul>

          {/* Stats row */}
          <motion.div
            className="flex gap-8 pt-8 border-t border-gray-100"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.08, delay: 0.6 }}
          >
            {[['$250M+', 'Trade Financed'], ['500+', 'Businesses'], ['5+', 'Years']].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-black text-teal-600 leading-none">{val}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.08, delay: 0.7 }}
          >
            <motion.a
              href="#services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 group"
              whileHover={{ gap: '12px' }}
              transition={{ duration: 0.2 }}
            >
              Explore Our Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Bottom rule */}
      <div className="h-px w-full bg-gray-100" />

    </section>
  );
}
