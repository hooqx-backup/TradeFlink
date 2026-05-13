import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Data ─────────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    num: '01',
    tab: 'Exporters',
    headline: 'Get Paid\nOn Your Terms',
    description:
      'Stop waiting 60–90 days for payment. TradeFlink converts export invoices into immediate cash — so you reinvest, grow, and ship more.',
    points: [
      'Immediate payment on approved invoices',
      'Protection against buyer default risk',
      'Works across 70+ countries',
      'No collateral or paperwork',
    ],
    metric: '$2B+',
    metricLabel: 'Trade financed',
    cta: 'Start Exporting Smarter',
  },
  {
    num: '02',
    tab: 'Importers',
    headline: 'Scale Imports\nWithout Strain',
    description:
      'Access extended payment terms and supply chain tools that let you import more, pay later, and keep supplier relationships strong.',
    points: [
      'Payment terms up to 180 days',
      'Strengthen supplier relationships',
      'Protect against supply disruptions',
      'Grow import volumes confidently',
    ],
    metric: '180d',
    metricLabel: 'Max payment terms',
    cta: 'Optimize Your Imports',
  },
  {
    num: '03',
    tab: 'Investors',
    headline: 'Earn Stable Returns\nFrom Real Trade',
    description:
      'Short-duration, asset-backed trade finance investments. Fund real invoices from vetted businesses and earn consistent, risk-adjusted returns.',
    points: [
      'Asset-backed investments',
      'Vetted trade transactions',
      'Transparent dashboards',
      'Consistent risk-adjusted returns',
    ],
    metric: '8.5%',
    metricLabel: 'Avg. annual return',
    cta: 'Explore Investments',
  },
];

const TICKER = [
  { val: '$2B+', label: 'Trade Financed' },
  { val: '70+',  label: 'Countries Covered' },
  { val: '48h',  label: 'Avg. Funding Speed' },
  { val: '5K+',  label: 'Transactions Vetted' },
  { val: '98%',  label: 'Supplier Satisfaction' },
  { val: '8.5%', label: 'Avg. Annual Return' },
  { val: '180d', label: 'Max Payment Terms' },
  { val: '85%',  label: 'Invoice Advance Rate' },
];

/* ── Animated card top bar ────────────────────────────────────── */
function CardBar() {
  return (
    <motion.div className="h-0.75 w-full"
      style={{ background: 'linear-gradient(90deg,#1C96BF,#2dd4bf,#1C96BF)', backgroundSize: '200% 100%' }}
      animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ── Floating badge helper ────────────────────────────────────── */
function FloatBadge({ children, className, floatY = -6, delay = 0, enterX = 16 }) {
  return (
    <motion.div className={`absolute ${className}`}
      initial={{ opacity: 0, x: enterX }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}>
      <motion.div className="bg-white rounded-xl px-4 py-2.5"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.09)' }}
        animate={{ y: [0, floatY, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Toast notification ───────────────────────────────────────── */
function LiveToast({ text, color = '#1C96BF', repeatDelay = 4 }) {
  return (
    <motion.div
      className="absolute -bottom-3 -right-3 bg-white rounded-xl px-3.5 py-2 flex items-center gap-2"
      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)' }}
      animate={{ y: [20, 0, 0, 20], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay, times: [0, 0.12, 0.88, 1], ease: 'easeInOut' }}
    >
      <motion.span className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: color }}
        animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <span className="text-xs font-bold text-gray-700 whitespace-nowrap">{text}</span>
    </motion.div>
  );
}

/* ── Visuals ──────────────────────────────────────────────────── */
function ExporterVisual() {
  const steps = ['Verified', 'Processing', 'Funded'];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(28,150,191,0.07) 0%, transparent 70%)' }} />

      <motion.div className="relative w-72 bg-white rounded-2xl overflow-visible"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.09)' }}
        initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <div className="overflow-hidden rounded-t-2xl"><CardBar /></div>
        <div className="p-5">

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">Invoice</p>
              <p className="text-gray-800 font-bold text-sm">#TF-2024-0892</p>
            </div>
            <motion.div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-teal-700 bg-teal-50"
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <motion.span className="w-1.5 h-1.5 rounded-full bg-teal-500"
                animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              FUNDED
            </motion.div>
          </div>

          {/* Rows */}
          {[['Buyer','Acme Corp, US'],['Amount','$48,500.00'],['Advance','85%']].map(([k,v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
              <span className="text-gray-400">{k}</span>
              <span className="text-gray-700 font-semibold">{v}</span>
            </div>
          ))}

          {/* Animated steps */}
          <div className="flex items-center gap-1.5 mt-4 mb-3">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <motion.div className="flex items-center gap-1"
                  animate={{ opacity: step >= i ? 1 : 0.25 }}
                  transition={{ duration: 0.3 }}>
                  <motion.span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black"
                    animate={{
                      background: step >= i ? '#1C96BF' : '#f3f4f6',
                      color: step >= i ? '#fff' : '#9ca3af',
                    }}
                    transition={{ duration: 0.3 }}>
                    {step > i ? '✓' : i + 1}
                  </motion.span>
                  <span className="text-[9px] text-gray-400 font-medium">{s}</span>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div className="flex-1 h-px"
                    animate={{ background: step > i ? '#1C96BF' : '#e5e7eb' }}
                    transition={{ duration: 0.4 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg,#1C96BF,#2dd4bf)' }}
              initial={{ width: 0 }} animate={{ width: '85%' }}
              transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }} />
          </div>
        </div>

        {/* Live toast */}
        <LiveToast text="+$12,400 just funded" repeatDelay={5} />
      </motion.div>

      <FloatBadge className="top-4 right-0" floatY={-6} delay={0.5}>
        <p className="text-gray-700 text-xs font-bold">Funded in 24h</p>
      </FloatBadge>
      <FloatBadge className="bottom-8 left-0" floatY={6} delay={0.7} enterX={-16}>
        <p className="text-[10px] text-gray-400 mb-0.5">Countries covered</p>
        <p className="text-teal-600 font-black text-xl leading-none">70+</p>
      </FloatBadge>
    </div>
  );
}

function ImporterVisual() {
  const bars = [38, 52, 44, 68, 58, 86, 65];
  const [savings, setSavings] = useState(320);
  useEffect(() => {
    const id = setInterval(() => setSavings(s => s + Math.floor(Math.random() * 3 + 1)), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(28,150,191,0.07) 0%, transparent 70%)' }} />

      <motion.div className="relative w-72 bg-white rounded-2xl overflow-visible"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.09)' }}
        initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <div className="overflow-hidden rounded-t-2xl"><CardBar /></div>
        <div className="p-5">
          <p className="text-[10px] text-teal-600 uppercase tracking-widest font-bold mb-0.5">Payment Schedule</p>
          <p className="text-gray-800 font-bold text-sm mb-4">Extended Terms Active</p>

          <div className="flex items-end gap-1.5 h-16 mb-4">
            {bars.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t relative overflow-hidden"
                style={{ height: `${h}%`, background: i === 5 ? 'linear-gradient(to top,#1C96BF,#2dd4bf)' : '#f0fdf9', transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}>
                {i === 5 && (
                  <motion.div className="absolute inset-0 w-full"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }} />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-50">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Terms</p>
              <p className="text-teal-600 font-black text-xl leading-none">180d</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 mb-0.5">Cash preserved</p>
              <motion.p className="text-gray-700 font-bold text-lg leading-none"
                key={savings} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}>
                ${savings}K
              </motion.p>
            </div>
          </div>
        </div>

        <LiveToast text="Supplier payment extended" repeatDelay={6} />
      </motion.div>

      <FloatBadge className="top-4 right-0" floatY={-6} delay={0.5}>
        <p className="text-gray-700 text-xs font-bold">Supply chain secure</p>
      </FloatBadge>
      <FloatBadge className="bottom-8 left-0" floatY={6} delay={0.7} enterX={-16}>
        <p className="text-[10px] text-gray-400 mb-0.5">Supplier satisfaction</p>
        <p className="text-teal-600 font-black text-xl leading-none">98%</p>
      </FloatBadge>
    </div>
  );
}

function InvestorVisual() {
  const base   = [6.2, 7.1, 6.8, 8.0, 8.3, 8.5];
  const mos    = ['J','F','M','A','M','J'];
  const [pct, setPct] = useState(8.5);
  useEffect(() => {
    const id = setInterval(() => setPct(p => +(p + (Math.random() * 0.06 - 0.02)).toFixed(2)), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(28,150,191,0.07) 0%, transparent 70%)' }} />

      <motion.div className="relative w-72 bg-white rounded-2xl overflow-visible"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.09)' }}
        initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <div className="overflow-hidden rounded-t-2xl"><CardBar /></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-teal-600 uppercase tracking-widest font-bold mb-1">Live Returns</p>
              <motion.p className="text-gray-900 font-black text-3xl leading-none"
                key={pct} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}>
                {pct}%
              </motion.p>
              <p className="text-gray-400 text-xs mt-1">avg. annual</p>
            </div>
            <motion.div className="px-2.5 py-1 rounded-lg text-xs font-bold text-teal-700 bg-teal-50"
              animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
              ↑ +0.3%
            </motion.div>
          </div>

          <div className="flex items-end gap-1.5 h-14 mb-1">
            {base.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div className="w-full rounded-t relative overflow-hidden"
                  style={{ background: i === base.length - 1 ? 'linear-gradient(to top,#1C96BF,#2dd4bf)' : '#f0fdf9', transformOrigin: 'bottom' }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1, height: `${(v / 10) * 100}%` }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}>
                  {i === base.length - 1 && (
                    <motion.div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)' }}
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }} />
                  )}
                </motion.div>
                <span className="text-[9px] text-gray-300">{mos[i]}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"
              animate={{ opacity: [1,0.3,1] }} transition={{ duration: 2, repeat: Infinity }} />
            <p className="text-gray-400 text-xs">Asset-backed · Vetted · Short-duration</p>
          </div>
        </div>

        <LiveToast text="New investment matched" repeatDelay={5} />
      </motion.div>

      <FloatBadge className="top-4 right-0" floatY={-6} delay={0.5}>
        <p className="text-gray-700 text-xs font-bold">Asset-backed security</p>
      </FloatBadge>
      <FloatBadge className="bottom-8 left-0" floatY={6} delay={0.7} enterX={-16}>
        <p className="text-[10px] text-gray-400 mb-0.5">Transactions vetted</p>
        <p className="text-teal-600 font-black text-xl leading-none">5,000+</p>
      </FloatBadge>
    </div>
  );
}

const VISUALS = [ExporterVisual, ImporterVisual, InvestorVisual];

/* ── Stats ticker ─────────────────────────────────────────────── */
function StatsTicker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-gray-100 py-4 mb-16">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }} />

      <motion.div className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-black text-gray-900 text-sm">{item.val}</span>
            <span className="text-gray-400 text-xs">{item.label}</span>
            <span className="w-1 h-1 rounded-full bg-teal-300 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Solutions() {
  const [active, setActive]   = useState(0);
  const [prev, setPrev]       = useState(0);
  const [paused, setPaused]   = useState(false);
  const sectionRef            = useRef(null);
  const inView                = useInView(sectionRef, { once: true, margin: '-80px' });

  const sol    = SOLUTIONS[active];
  const dir    = active >= prev ? 1 : -1;
  const Visual = VISUALS[active];

  function switchTab(i) {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  }

  /* Auto-cycle tabs every 5s unless user has interacted */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setPrev(a => a);
      setActive(a => {
        const next = (a + 1) % SOLUTIONS.length;
        setPrev(a);
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="solutions" ref={sectionRef} className="relative w-full bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>

      {/* Ambient orbs */}
      <motion.div className="absolute -top-40 -right-40 w-150 h-150 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(28,150,191,0.06) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -bottom-32 -left-32 w-120 h-120 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(28,150,191,0.04) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />

      {/* Sliding light beam */}
      <motion.div className="absolute top-0 bottom-0 w-32 pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.04),transparent)', filter: 'blur(20px)' }}
        animate={{ x: [-128, 1600] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 8 }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 lg:pt-32 pb-28 lg:pb-36">

        {/* ── Header ── */}
        <div className="mb-12">
          <motion.div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-teal-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Solutions</span>
          </motion.div>

          <motion.h2 className="font-black text-gray-900 leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            One platform.<br />
            <span className="text-teal-600">Every player.</span>
          </motion.h2>
        </div>

        {/* ── Stats ticker ── */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <StatsTicker />
        </motion.div>

        {/* ── Tab pills ── */}
        <motion.div className="flex gap-2 mb-14 flex-wrap"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}>
          {SOLUTIONS.map((s, i) => {
            const on = active === i;
            return (
              <motion.button key={s.num}
                onClick={() => { switchTab(i); setPaused(true); }}
                className="relative px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer select-none overflow-hidden"
                animate={{
                  background: on ? '#1C96BF' : '#f3f4f6',
                  color: on ? '#ffffff' : '#9ca3af',
                  boxShadow: on ? '0 4px 20px rgba(28,150,191,0.28)' : 'none',
                }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.22 }}>
                {/* Active shimmer sweep */}
                {on && (
                  <motion.span className="absolute inset-y-0 w-8 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)' }}
                    animate={{ x: [-32, 160] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
                )}
                <span className="mr-2 font-mono text-[10px] opacity-60">{s.num}</span>
                {s.tab}
                {/* Auto-cycle progress ring */}
                {on && !paused && (
                  <motion.span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/40 overflow-hidden">
                    <motion.span className="block h-full bg-white rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — 3 cols */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div key={active + '-left'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

                {/* Ghost number + headline */}
                <div className="relative mb-6">
                  <span className="absolute -top-8 -left-3 font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(100px, 16vw, 200px)', letterSpacing: '-0.04em', color: '#f3f4f6' }}>
                    {sol.num}
                  </span>
                  <h3 className="relative font-black text-gray-900 leading-tight whitespace-pre-line"
                    style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', letterSpacing: '-0.025em' }}>
                    {sol.headline}
                  </h3>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">{sol.description}</p>

                {/* Feature chips — 2×2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                  {sol.points.map((point, pi) => (
                    <motion.div key={point}
                      className="group flex items-start gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-teal-50 cursor-default transition-colors duration-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: pi * 0.07 }}>
                      <motion.span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center"
                        whileHover={{ scale: 1.2, background: '#1C96BF' }}>
                        <svg className="w-2.5 h-2.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                      <span className="text-gray-600 text-sm font-medium leading-snug">{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Metric + CTA */}
                <motion.div className="flex flex-wrap items-center gap-6"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                  <div>
                    <motion.p className="font-black text-gray-900 leading-none"
                      style={{ fontSize: 'clamp(34px, 4vw, 52px)', letterSpacing: '-0.025em' }}
                      key={sol.metric}
                      initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}>
                      {sol.metric}
                    </motion.p>
                    <p className="text-gray-400 text-sm mt-1">{sol.metricLabel}</p>
                  </div>

                  <div className="w-px h-10 bg-gray-100 hidden sm:block" />

                  <div className="flex items-center gap-3 flex-wrap">
                    <motion.a href="#contact"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                      style={{ background: 'linear-gradient(135deg,#1C96BF,#14b8a6)', boxShadow: '0 4px 20px rgba(28,150,191,0.26)' }}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(28,150,191,0.42)' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}>
                      {sol.cta}
                      <motion.svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        animate={{ x: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.a>
                    <motion.a href="#contact"
                      className="text-sm font-semibold text-gray-400 hover:text-teal-600 transition-colors duration-200"
                      whileHover={{ x: 2 }} transition={{ duration: 0.18 }}>
                      Learn more →
                    </motion.a>
                  </div>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — 2 cols */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={active + '-right'} className="relative h-80 lg:h-96"
                initial={{ opacity: 0, x: dir * 32, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -32, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
