import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  {
    num: 'A',
    title: 'Supply Chain Finance',
    tagline: 'Strengthen every link',
    description:
      'Pay your suppliers early while keeping your own cash. Everyone wins, suppliers get cash fast, you get loyalty and flexibility.',
    metric: 'Fast',
    metricLabel: 'Average funding speed',
    path: '/supply-chain-finance',
    flip: false,
  },
  {
    num: 'B',
    title: 'Export Factoring',
    tagline: 'Get paid, not promises',
    description:
      'Stop waiting weeks for your buyer to pay. Submit your invoice, get cash within days, and let us chase the payment.',
    metric: 'High',
    metricLabel: 'Invoice advance rate',
    path: '/export-factoring',
    flip: true,
  },
  {
    num: 'C',
    title: 'Invoice Financing',
    tagline: 'Cash from day one',
    description:
      "Your invoices represent money you've already earned. We fund them now, no loans, no equity, no collateral needed.",
    metric: 'Active',
    metricLabel: 'Trade financed to date',
    path: '/invoice-financing',
    flip: false,
  },
  {
    num: 'D',
    title: 'Open Account Trade',
    tagline: 'Expand into every market',
    description:
      'Offer buyers flexible payment terms and sell into many countries, without worrying about what happens if they pay late or not at all.',
    metric: 'Wide',
    metricLabel: 'Countries covered',
    path: '/open-account-trade',
    flip: true,
  },
];

function ServiceRow({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const rowRef  = useRef(null);
  const inView  = useInView(rowRef, { once: true, margin: '-60px' });

  const VisualPanel = () => (
    <motion.div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ background: '#040c1e', minHeight: '300px' }}
      animate={{ background: hovered ? '#071628' : '#040c1e' }}
      transition={{ duration: 0.4 }}
    >
      {/* Fine grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.035,
        }}
      />

      {/* Teal radial glow, brightens on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(28,150,191,0.18) 0%, transparent 70%)' }}
      />

      {/* Auto-sliding teal light beam */}
      <motion.div
        className="absolute inset-y-0 w-24 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(28,150,191,0.28) 50%, transparent 100%)',
          filter: 'blur(14px)',
          skewX: -12,
        }}
        animate={{ x: [-96, 800] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 2.2,
          delay: index * 0.8,
        }}
      />

      {/* Auto-sliding white shimmer (offset) */}
      <motion.div
        className="absolute inset-y-0 w-12 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
          filter: 'blur(8px)',
          skewX: -12,
        }}
        animate={{ x: [-48, 800] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 2.2,
          delay: index * 0.8 + 1.3,
        }}
      />

      {/* Ghost service number */}
      <div
        className="absolute right-6 bottom-2 font-black leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(72px, 9vw, 120px)', color: 'rgba(28,150,191,0.07)' }}
      >
        {service.num}
      </div>

      {/* Metric */}
      <div className="relative z-10 flex flex-col items-center justify-center px-10 py-12">
        <motion.p
          className="font-black text-teal-400 leading-none mb-3"
          style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.metric}
        </motion.p>
        <p className="text-white/30 text-xs uppercase tracking-[0.22em] font-bold text-center">
          {service.metricLabel}
        </p>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.6), transparent)' }}
        animate={{ opacity: hovered ? 1 : 0.2, scaleX: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );

  const ContentPanel = () => (
    <div className="flex flex-col justify-center bg-white px-10 lg:px-14 xl:px-20 py-12 lg:py-14">
      {/* Number + tagline row */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-teal-500 text-xs font-black uppercase tracking-[0.25em]">{service.num}</span>
        <div className="h-px w-8 bg-gray-200" />
        <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.18em]">{service.tagline}</span>
      </div>

      {/* Title */}
      <div className="overflow-hidden mb-4">
        <motion.h3
          className="font-black text-gray-900 leading-tight"
          style={{ fontSize: 'clamp(18px, 2vw, 30px)' }}
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.title}
        </motion.h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-8 max-w-md">
        {service.description}
      </p>

      {/* CTA link */}
      <Link to={service.path} className="inline-flex items-center gap-2 no-underline">
        <motion.div
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
          animate={{ color: hovered ? '#1C96BF' : '#d1d5db' }}
          transition={{ duration: 0.3 }}
        >
          <span>Explore Service</span>
          <motion.svg
            className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </Link>
    </div>
  );

  return (
    <motion.div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-100 last:border-0 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {service.flip ? (
        <>
          <ContentPanel />
          <VisualPanel />
        </>
      ) : (
        <>
          <VisualPanel />
          <ContentPanel />
        </>
      )}
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-white overflow-hidden">

      <div className="h-px w-full bg-gray-100" />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-32 pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600 mb-3">What We Offer</p>
            <h2 className="font-black text-gray-900 leading-none" style={{ fontSize: 'clamp(26px, 3.8vw, 52px)' }}>
              Core <span className="text-teal-600">Services</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-400 text-base max-w-sm leading-relaxed lg:text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Simple, honest trade finance, designed for businesses that don't have time for slow banks.
          </motion.p>
        </div>
      </div>

      {/* ── Service rows ── */}
      <div className="border-t border-gray-100">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.num} service={service} index={i} />
        ))}
      </div>

    </section>
  );
}
