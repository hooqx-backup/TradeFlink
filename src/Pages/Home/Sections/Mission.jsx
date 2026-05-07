import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import missionImg from '../../../assets/images/mission.jpg';

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
              <p className="text-white font-black leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
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
            <motion.div
              key={p.num}
              className="flex gap-8 py-10 border-b border-gray-100 last:border-0 group"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <span
                className="shrink-0 font-black leading-none tabular-nums transition-colors duration-300 group-hover:text-teal-500"
                style={{ fontSize: 'clamp(56px, 5.5vw, 80px)', color: '#e5e7eb', lineHeight: 0.85 }}
              >
                {p.num}
              </span>

              <div className="flex-1 pt-2">
                {/* Title */}
                <h3 className="text-2xl xl:text-3xl font-black text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                  {p.title}
                </h3>
                {/* Body */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.body}</p>
                {/* Accent pill */}
                <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-teal-500" />
                  {p.accent}
                </span>
              </div>
            </motion.div>
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
            <motion.div key={p.num} className="flex gap-5 py-7 border-b border-gray-100 last:border-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}>
              <span className="shrink-0 font-black text-gray-200 leading-none" style={{ fontSize: '3.5rem', lineHeight: 0.85 }}>{p.num}</span>
              <div className="pt-1">
                <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.body}</p>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-teal-500" />
                  {p.accent}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
