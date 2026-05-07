import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Data ───────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    num: '01',
    tab: 'For Exporters',
    headline: 'Get Paid on\nYour Terms',
    tagline: 'Ship more, wait less',
    description:
      'Stop waiting 60–90 days for payment. TradeFlink converts your export invoices into immediate cash so you can reinvest, grow, and ship more — without the wait.',
    points: [
      'Immediate payment on approved invoices',
      'Protection against buyer default risk',
      'Works across 70+ countries',
      'No collateral or complex paperwork',
    ],
    metric: '$2B+',
    metricLabel: 'Trade financed',
    cta: 'Start Exporting Smarter',
    accent: '#0d9488',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
  {
    num: '02',
    tab: 'For Importers',
    headline: 'Scale Imports\nWithout Strain',
    tagline: 'Import more, pay later',
    description:
      'Access extended payment terms and supply chain finance tools that let you import more, pay later, and keep your supplier relationships strong.',
    points: [
      'Extended payment terms up to 180 days',
      'Strengthen supplier relationships',
      'Protect against supply chain disruptions',
      'Grow import volumes with confidence',
    ],
    metric: '180',
    metricLabel: 'Days payment terms',
    metricSuffix: 'd',
    cta: 'Optimize Your Imports',
    accent: '#0f766e',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    tab: 'For Investors',
    headline: 'Earn Stable Returns\nFrom Global Trade',
    tagline: 'Smart, asset-backed returns',
    description:
      'Diversify your portfolio with short-duration, asset-backed trade finance investments. Fund real invoices from vetted businesses and earn consistent returns.',
    points: [
      'Short-duration, asset-backed investments',
      'Vetted and verified trade transactions',
      'Transparent reporting and dashboards',
      'Consistent, risk-adjusted returns',
    ],
    metric: '8.5%',
    metricLabel: 'Avg. annual return',
    cta: 'Explore Investment Opportunities',
    accent: '#14b8a6',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ── Right-side visual mockups ──────────────────────────────── */
function ExporterVisual({ accent }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main invoice card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-72"
        style={{ border: '1px solid rgba(13,148,136,0.15)' }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 font-medium">Invoice</p>
            <p className="text-sm font-bold text-gray-800">#TF-2024-0892</p>
          </div>
          <motion.span
            className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FUNDED ✓
          </motion.span>
        </div>
        <div className="space-y-2.5 mb-4">
          {[['Buyer', 'Acme Corp, US'], ['Amount', '$48,500.00'], ['Due in', '72 hours']].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-gray-400">{k}</span>
              <span className="text-gray-800 font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accent }}
            initial={{ width: '0%' }} animate={{ width: '85%' }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">85% advance rate</p>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute top-4 right-2 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <motion.span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-xs font-bold text-gray-700">Funded in 24h</span>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute bottom-6 left-2 bg-white rounded-xl shadow-lg px-3 py-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <p className="text-xs text-gray-400 font-medium">Countries covered</p>
        <p className="text-lg font-black" style={{ color: accent }}>70+</p>
      </motion.div>
    </div>
  );
}

function ImporterVisual({ accent }) {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-72"
        style={{ border: '1px solid rgba(13,148,136,0.15)' }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>Payment Schedule</p>
        <p className="text-sm font-bold text-gray-800 mb-4">Extended Terms Active</p>

        {/* Mini bar chart */}
        <div className="flex items-end gap-1.5 h-16 mb-4">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ backgroundColor: i === 5 ? accent : `${accent}30` }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ height: `${h}%`, backgroundColor: i === 5 ? accent : `${accent}30`, transformOrigin: 'bottom' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Payment terms</p>
            <p className="text-xl font-black" style={{ color: accent }}>180 days</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Cash preserved</p>
            <p className="text-sm font-bold text-gray-800">$320K</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-2 right-0 bg-white rounded-xl shadow-lg px-3 py-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs font-bold text-gray-700">🛡️ Supply chain protected</p>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-0 bg-white rounded-xl shadow-lg px-3 py-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs text-gray-400">Supplier satisfaction</p>
        <p className="text-lg font-black" style={{ color: accent }}>98%</p>
      </motion.div>
    </div>
  );
}

function InvestorVisual({ accent }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const returns = [6.2, 7.1, 6.8, 8.0, 8.3, 8.5];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-72"
        style={{ border: '1px solid rgba(13,148,136,0.15)' }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>Portfolio Returns</p>
            <p className="text-3xl font-black text-gray-900">8.5%</p>
            <p className="text-xs text-gray-400">avg. annual return</p>
          </div>
          <motion.span
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{ backgroundColor: `${accent}15`, color: accent }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ↑ +0.3%
          </motion.span>
        </div>

        {/* Sparkline */}
        <div className="flex items-end gap-2 h-12 mb-3">
          {returns.map((r, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t"
                style={{ backgroundColor: i === returns.length - 1 ? accent : `${accent}35`, transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, height: `${(r / 10) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              />
              <span className="text-[9px] text-gray-400">{months[i]}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          <p className="text-xs text-gray-500">Asset-backed · Short duration · Vetted</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-2 right-0 bg-white rounded-xl shadow-lg px-3 py-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs font-bold text-gray-700">🔒 Asset-backed</p>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-0 bg-white rounded-xl shadow-lg px-3 py-2"
        style={{ border: `1px solid ${accent}30` }}
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-xs text-gray-400">Transactions vetted</p>
        <p className="text-lg font-black" style={{ color: accent }}>5000+</p>
      </motion.div>
    </div>
  );
}

const VISUALS = [ExporterVisual, ImporterVisual, InvestorVisual];

/* ── Section ────────────────────────────────────────────────── */
export default function Solutions() {
  const [active, setActive]   = useState(0);
  const [prev, setPrev]       = useState(0);
  const sectionRef            = useRef(null);
  const inView                = useInView(sectionRef, { once: true, margin: '-80px' });

  const sol     = SOLUTIONS[active];
  const accent  = sol.accent;
  const dir     = active >= prev ? 1 : -1;

  function switchTab(i) {
    setPrev(active);
    setActive(i);
  }

  const Visual = VISUALS[active];

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative w-full py-28 bg-white"
      style={{ overflow: 'clip' }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, top: -200, right: -150, background: 'radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, bottom: -150, left: -100, background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span className="block h-px bg-teal-500"
              initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }} />
            <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.22em]">Tailored For You</span>
            <motion.span className="block h-px bg-teal-500"
              initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }} />
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              className="text-5xl lg:text-6xl font-black text-gray-900"
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Solutions Built for{' '}
              <span style={{ color: accent }}>Every Role</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-gray-500 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Whether you export, import, or invest — TradeFlink has a solution built for you.
          </motion.p>
        </div>

        {/* ── Tab selector cards ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {SOLUTIONS.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.tab}
                onClick={() => switchTab(i)}
                className="relative text-left rounded-2xl p-5 transition-all overflow-hidden"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${s.accent}18, ${s.accent}08)` : '#f9fafb',
                  border: `1.5px solid ${isActive ? s.accent : 'transparent'}`,
                  boxShadow: isActive ? `0 8px 32px ${s.accent}20` : 'none',
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ backgroundColor: s.accent }}
                    layoutId="activeTabLine"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                <div className="flex items-start gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isActive ? s.accent : `${s.accent}15`, color: isActive ? '#fff' : s.accent }}
                    animate={{ backgroundColor: isActive ? s.accent : `${s.accent}15`, color: isActive ? '#fff' : s.accent }}
                    transition={{ duration: 0.3 }}
                  >
                    {s.icon}
                  </motion.div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: s.accent }}>{s.num}</p>
                    <p className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{s.tab}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.tagline}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Content panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-text'}
              className="space-y-7"
              initial={{ opacity: 0, x: dir * -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Headline */}
              <div>
                <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight whitespace-pre-line">
                  {sol.headline}
                </h3>
              </div>

              <p className="text-gray-500 leading-relaxed text-lg">{sol.description}</p>

              {/* Checklist */}
              <ul className="space-y-3.5">
                {sol.points.map((point, i) => (
                  <motion.li
                    key={point}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.09, ease: 'easeOut' }}
                  >
                    <motion.span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${accent}15` }}
                      whileHover={{ scale: 1.2, backgroundColor: accent }}
                    >
                      <svg className="w-3 h-3" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.span>
                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Metric pill */}
              <motion.div
                className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl"
                style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}25` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-3xl font-black" style={{ color: accent }}>{sol.metric}</p>
                <div className="h-8 w-px" style={{ backgroundColor: `${accent}30` }} />
                <p className="text-sm text-gray-500 font-medium">{sol.metricLabel}</p>
              </motion.div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-white font-bold shadow-lg"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 8px 24px ${accent}35` }}
                whileHover={{ scale: 1.04, boxShadow: `0 14px 32px ${accent}50` }}
                whileTap={{ scale: 0.97 }}
              >
                {sol.cta}
                <motion.svg
                  className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </AnimatePresence>

          {/* Right — visual mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-visual'}
              className="relative h-80 lg:h-96"
              initial={{ opacity: 0, x: dir * 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -50, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${accent}10 0%, transparent 70%)` }}
              />
              <Visual accent={accent} />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
