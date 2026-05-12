import { useState, useRef } from 'react';
import {
  motion, useInView, useMotionValue, useSpring,
  useTransform, useMotionTemplate, AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Data ───────────────────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    id: 1,
    title: 'Scaling Textile Exports',
    client: 'Aisha Rahman',
    role: 'Textile Exporter',
    country: 'Bangladesh',
    flag: '🇧🇩',
    category: 'Export Factoring',
    challenge: 'A fast-growing textile manufacturer faced chronic cash-flow gaps waiting 90+ days for payment from European buyers, limiting production capacity and forcing rejection of new orders.',
    solution: 'TradeFlink deployed Export Factoring to advance 85% of invoice value within 48 hours, eliminating the payment wait and freeing capital to fulfil larger orders.',
    results: [
      { metric: '3×',   label: 'Revenue Growth' },
      { metric: '68%',  label: 'Faster Payments' },
      { metric: '$4.2M', label: 'Total Financed' },
    ],
    quote: 'TradeFlink transformed how we think about cash flow. We went from turning down orders to actively seeking new buyers across Europe.',
    avatar: 'AR',
  },
  {
    id: 2,
    title: 'Supply Chain Resilience',
    client: 'Omar Khalid',
    role: 'FMCG Importer',
    country: 'UAE',
    flag: '🇦🇪',
    category: 'Supply Chain Finance',
    challenge: 'A regional FMCG distributor struggled to meet supplier payment terms, causing frequent supply disruptions and damaged relationships during peak seasons.',
    solution: "TradeFlink introduced Supply Chain Finance, enabling early supplier payments while extending the importer's own payment terms to 120 days.",
    results: [
      { metric: '40%',     label: 'Fewer Disruptions' },
      { metric: '120 days', label: 'Extended Terms' },
      { metric: '$6.8M',   label: 'Supply Unlocked' },
    ],
    quote: 'Our supplier relationships have never been stronger. On-time payments have become our single biggest competitive advantage.',
    avatar: 'OK',
  },
  {
    id: 3,
    title: 'First Export Journey',
    client: 'Priya Mehta',
    role: 'Garment Manufacturer',
    country: 'India',
    flag: '🇮🇳',
    category: 'Open Account Trade',
    challenge: 'A new-to-export garment manufacturer lacked the credit history and collateral required by traditional banks, locking them out of international trade finance entirely.',
    solution: "TradeFlink provided Open Account Trade facilities backed by buyer creditworthiness rather than the exporter's own balance sheet, opening doors to five new markets.",
    results: [
      { metric: '5',       label: 'New Markets' },
      { metric: '8 months', label: 'Time to Scale' },
      { metric: '$1.5M',   label: 'First Year Trade' },
    ],
    quote: 'As a first-time exporter, banks turned us away. TradeFlink saw our potential and gave us the tools to compete globally.',
    avatar: 'PM',
  },
  {
    id: 4,
    title: 'Working Capital Unlocked',
    client: 'Carlos Silva',
    role: 'Agri Exporter',
    country: 'Brazil',
    flag: '🇧🇷',
    category: 'Invoice Financing',
    challenge: 'An agricultural exporter had over $2M in outstanding receivables tied up with US buyers, preventing reinvestment into the next harvest cycle and stalling growth.',
    solution: "TradeFlink's Invoice Financing converted outstanding receivables into immediate working capital within three business days, removing the harvest-cycle bottleneck.",
    results: [
      { metric: '$2.1M', label: 'Receivables Freed' },
      { metric: '3 days', label: 'Funding Speed' },
      { metric: '2.4×',  label: 'Output Growth' },
    ],
    quote: 'We used to wait 90 days for money that was already ours. TradeFlink gave us our cash on day three.',
    avatar: 'CS',
  },
  {
    id: 5,
    title: 'Cross-Border Trade Growth',
    client: 'Kwame Asante',
    role: 'Cocoa Trader',
    country: 'Ghana',
    flag: '🇬🇭',
    category: 'Export Factoring',
    challenge: 'A cocoa trading firm needed to fulfil large confirmed orders from European and Asian chocolatiers but lacked liquidity to source raw cocoa at the required scale.',
    solution: 'TradeFlink structured Export Factoring tied to confirmed purchase orders, funding procurement before shipment and eliminating the capital gap between supplier and buyer.',
    results: [
      { metric: '60%',         label: 'Faster Payments' },
      { metric: '3 continents', label: 'Reach Expanded' },
      { metric: '$3.3M',       label: 'Trade Enabled' },
    ],
    quote: 'We competed with trading houses ten times our size. TradeFlink levelled the playing field for African SMEs.',
    avatar: 'KA',
  },
  {
    id: 6,
    title: 'Import Trade Expansion',
    client: 'Li Wei',
    role: 'Electronics Distributor',
    country: 'Singapore',
    flag: '🇸🇬',
    category: 'Supply Chain Finance',
    challenge: 'An electronics distributor importing from South Korean manufacturers faced tight 30-day payment terms that drained working capital during peak inventory build-up periods.',
    solution: "TradeFlink's Supply Chain Finance settled manufacturer invoices immediately while granting the importer a 90-day deferred payment window to align cash flow with sales cycles.",
    results: [
      { metric: '25%',    label: 'Cost Reduction' },
      { metric: '$8M',    label: 'Trade Volume' },
      { metric: '90 days', label: 'Payment Deferral' },
    ],
    quote: 'The deferred payment window let us build inventory for peak season without burning through our cash reserves.',
    avatar: 'LW',
  },
];

const CATEGORIES = ['All', 'Export Factoring', 'Supply Chain Finance', 'Invoice Financing', 'Open Account Trade'];

const CATEGORY_STYLES = {
  'Export Factoring':     'border-teal-400/40 bg-teal-400/10 text-teal-300',
  'Supply Chain Finance': 'border-blue-400/40 bg-blue-400/10 text-blue-300',
  'Invoice Financing':    'border-violet-400/40 bg-violet-400/10 text-violet-300',
  'Open Account Trade':   'border-amber-400/40 bg-amber-400/10 text-amber-300',
};

const CATEGORY_GLOW = {
  'Export Factoring':     'rgba(20,184,166,0.14)',
  'Supply Chain Finance': 'rgba(59,130,246,0.14)',
  'Invoice Financing':    'rgba(139,92,246,0.14)',
  'Open Account Trade':   'rgba(245,158,11,0.14)',
};

const CATEGORY_TOP_BORDER = {
  'Export Factoring':     'linear-gradient(90deg, transparent, rgba(20,184,166,0.8), transparent)',
  'Supply Chain Finance': 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)',
  'Invoice Financing':    'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)',
  'Open Account Trade':   'linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)',
};

const STAT_COLORS = [
  { from: 'rgba(28,150,191,0.2)', ring: 'rgba(28,150,191,0.4)' },
  { from: 'rgba(20,184,166,0.2)', ring: 'rgba(20,184,166,0.4)' },
  { from: 'rgba(99,102,241,0.2)', ring: 'rgba(99,102,241,0.4)' },
  { from: 'rgba(245,158,11,0.2)', ring: 'rgba(245,158,11,0.4)'  },
];

/* ── Motion helpers ─────────────────────────────────────────────── */
const spring = { type: 'spring', stiffness: 260, damping: 28 };

const revealUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = (staggerTime = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: staggerTime } },
});

/* ── Eyebrow ────────────────────────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-teal-400/70"
        initial={{ width: 0 }} animate={{ width: 32 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      />
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-400">{children}</span>
      <motion.div
        className="h-px bg-gradient-to-l from-transparent to-teal-400/70"
        initial={{ width: 0 }} animate={{ width: 32 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  );
}

/* ── Stat pill ──────────────────────────────────────────────────── */
function StatPill({ metric, label, colors, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={revealUp}
      className="relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-2xl"
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
    >
      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${colors.from}, transparent 70%)` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)' }}
        animate={{ x: ['-100%', '150%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 + delay }}
      />
      <span className="relative text-3xl font-black tracking-tight text-white">{metric}</span>
      <span className="relative text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</span>
    </motion.div>
  );
}

/* ── Case card ──────────────────────────────────────────────────── */
function CaseCard({ study, index }) {
  const wrapRef = useRef(null);
  const inView  = useInView(wrapRef, { once: true, margin: '-50px' });

  /* 3-D tilt */
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]),  { stiffness: 350, damping: 35 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]),  { stiffness: 350, damping: 35 });

  /* Cursor spotlight */
  const spotX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const spotY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${spotX} ${spotY}, ${CATEGORY_GLOW[study.category]}, transparent 80%)`;

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 44, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.article
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-2xl cursor-default"
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ boxShadow: '0 32px 80px rgba(0,0,0,0.45)', transition: { duration: 0.3 } }}
      >
        {/* Cursor spotlight layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: spotlight }}
        />

        {/* Category top border */}
        <motion.div
          className="h-[1.5px] w-full shrink-0"
          style={{ background: CATEGORY_TOP_BORDER[study.category] }}
        />

        {/* Card shimmer on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
        />

        <div className="relative z-30 flex flex-col flex-1 p-7 gap-5">

          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-xl ${CATEGORY_STYLES[study.category]}`}>
              {study.category}
            </span>
            <motion.span
              className="text-2xl select-none"
              animate={{ rotate: [0, 6, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            >
              {study.flag}
            </motion.span>
          </div>

          {/* Title + client */}
          <div>
            <h3 className="text-xl font-black leading-snug tracking-[-0.025em] text-white group-hover:text-teal-50 transition-colors duration-300">
              {study.title}
            </h3>
            <p className="mt-1.5 text-[12px] text-white/40 tracking-wide">
              {study.client} · {study.role} · {study.country}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />

          {/* Challenge */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-teal-400/70">Challenge</p>
            <p className="text-[13px] leading-relaxed text-white/50">{study.challenge}</p>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-teal-400/70">Solution</p>
            <p className="text-[13px] leading-relaxed text-white/50">{study.solution}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {study.results.map((r, i) => (
              <motion.div
                key={r.label}
                className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-xl px-2 py-3.5 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: (index % 3) * 0.12 + i * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${CATEGORY_GLOW[study.category]}, transparent 80%)` }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2.5 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="relative text-[15px] font-black text-white leading-none">{r.metric}</p>
                <p className="relative mt-1 text-[8px] uppercase tracking-[0.18em] text-white/35 leading-tight">{r.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-auto relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-2xl p-4">
            {/* Sweep shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)' }}
              animate={{ x: ['-100%', '150%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
            />
            <svg className="mb-2 h-4 w-4 text-teal-400/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="relative text-[13px] italic leading-relaxed text-white/60">"{study.quote}"</p>
            <div className="relative mt-3.5 flex items-center gap-2.5">
              <motion.div
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                style={{ background: 'linear-gradient(135deg, #1C96BF, #2dd4bf)' }}
                animate={{ boxShadow: ['0 0 0px rgba(28,150,191,0)', '0 0 12px rgba(28,150,191,0.6)', '0 0 0px rgba(28,150,191,0)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              >
                {study.avatar}
              </motion.div>
              <div>
                <p className="text-[11px] font-bold text-white/80">{study.client}</p>
                <p className="text-[10px] text-white/35">{study.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState('All');

  const heroRef  = useRef(null);
  const statsRef = useRef(null);
  const heroInView  = useInView(heroRef,  { once: true, margin: '-40px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  const filtered = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.category === activeCategory);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #040c1e 0%, #050d1a 100%)' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-36 pb-24"
        style={{ background: 'linear-gradient(160deg, #040c1e 0%, #071426 55%, #040c1e 100%)' }}
      >
        {/* Orbs */}
        {[
          { w: 700, h: 700, top: -320, left: -220, color: 'rgba(28,150,191,0.13)', dur: 14, delay: 0 },
          { w: 550, h: 550, bottom: -220, right: -120, color: 'rgba(20,184,166,0.10)', dur: 17, delay: 4 },
          { w: 400, h: 400, top: '30%', left: '55%', color: 'rgba(99,102,241,0.08)', dur: 11, delay: 2 },
        ].map((o, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-full"
            style={{ width: o.w, height: o.h, top: o.top, bottom: o.bottom, left: o.left, right: o.right, background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.22, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
          />
        ))}

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.5), transparent)' }}
          animate={{ top: ['10%', '90%'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Glass hero panel */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-8 py-14 sm:px-14 sm:py-20"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Panel inner glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(28,150,191,0.10) 0%, transparent 60%)' }} />
            {/* Panel shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }}
              animate={{ x: ['-100%', '150%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
            />

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate={heroInView ? 'show' : 'hidden'}
              className="relative"
            >
              <motion.div variants={revealUp}>
                <Eyebrow>Case Studies</Eyebrow>
              </motion.div>

              {/* Word-by-word headline */}
              <motion.h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-[-0.04em] text-white">
                {['Real', 'businesses,'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-4"
                    variants={{
                      hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
                      show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  className="bg-clip-text text-transparent inline-block"
                  style={{ backgroundImage: 'linear-gradient(90deg, #1C96BF, #2dd4bf, #1C96BF)', backgroundSize: '200% 100%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  variants={{
                    hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
                    show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  real results
                </motion.span>
              </motion.h1>

              <motion.p
                variants={revealUp}
                className="mt-7 max-w-2xl mx-auto text-lg leading-relaxed text-white/50"
              >
                See how SMEs across the globe are using TradeFlink to unlock liquidity, expand into new markets, and grow faster with trade finance built for them.
              </motion.p>

              <motion.div variants={revealUp} className="mt-9 flex flex-wrap justify-center gap-3">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/contact"
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25"
                    style={{ background: 'linear-gradient(135deg, #1C96BF, #0ea5e9)' }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
                      animate={{ x: ['-100%', '150%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
                    />
                    <span className="relative">Start Trading Now</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <a
                    href="#case-studies"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-7 py-3.5 text-sm font-bold text-white/80 backdrop-blur-xl transition-colors hover:border-teal-400/40 hover:text-white"
                  >
                    Browse Stories
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <section ref={statsRef} className="relative py-10 border-y border-white/[0.05]">
        {/* Strip inner glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(28,150,191,0.05) 0%, transparent 70%)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate={statsInView ? 'show' : 'hidden'}
          >
            {[
              { metric: '70+',  label: 'Countries Served' },
              { metric: '500+', label: 'SMEs Financed' },
              { metric: '$2B+', label: 'Trade Facilitated' },
              { metric: '98%',  label: 'Client Satisfaction' },
            ].map((s, i) => (
              <StatPill key={s.label} {...s} colors={STAT_COLORS[i]} delay={i * 0.6} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Grid section ─────────────────────────────────────────── */}
      <section id="case-studies" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs — glass pill bar + layoutId */}
          <div className="mb-14 flex justify-center">
            <div className="relative inline-flex flex-wrap justify-center gap-1.5 rounded-2xl border border-white/[0.09] bg-white/[0.04] p-1.5 backdrop-blur-2xl shadow-xl shadow-black/20">
              {/* Glass strip shimmer */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '150%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
              />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 z-10 ${
                    activeCategory === cat ? 'text-teal-200' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl border border-teal-400/50 bg-teal-400/[0.12] shadow-lg shadow-teal-400/10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card grid */}
          <AnimatePresence mode="popLayout">
            <motion.div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" layout>
              {filtered.map((study, i) => (
                <CaseCard key={study.id} study={study} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: 'linear-gradient(160deg, #071426 0%, #040c1e 100%)' }}>
        {/* Animated orb mesh */}
        {[
          { w: 600, color: 'rgba(28,150,191,0.16)', dur: 10, x: '-50%', y: '-50%', top: '50%', left: '50%' },
          { w: 400, color: 'rgba(20,184,166,0.10)', dur: 13, x: '0%', y: '0%', top: '-10%', left: '-5%' },
          { w: 350, color: 'rgba(99,102,241,0.08)', dur: 9,  x: '0%', y: '0%', top: '60%', left: '70%' },
        ].map((o, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-full"
            style={{ width: o.w, height: o.w, top: o.top, left: o.left, transform: `translate(${o.x}, ${o.y})`, background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Glass CTA card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.04] backdrop-blur-2xl px-10 py-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Inner radial */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(28,150,191,0.12) 0%, transparent 65%)' }} />
            {/* Sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }}
              animate={{ x: ['-100%', '150%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
            />
            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.7), transparent)' }} />

            <div className="relative">
              <Eyebrow>Get Started</Eyebrow>
              <h2 className="mt-7 text-4xl sm:text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white">
                Ready to write{' '}
                <motion.span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #1C96BF, #2dd4bf, #1C96BF)', backgroundSize: '200% 100%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  your story?
                </motion.span>
              </h2>
              <p className="mt-5 text-lg text-white/48 leading-relaxed">
                Join 500+ SMEs already trading without borders. Our team will find the right trade finance solution for your business within 24 hours.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-bold text-white shadow-xl shadow-teal-500/25"
                    style={{ background: 'linear-gradient(135deg, #1C96BF, #0ea5e9)' }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
                      animate={{ x: ['-100%', '150%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                    />
                    <span className="relative">Talk to an Expert</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-8 py-4 text-sm font-bold text-white/80 backdrop-blur-xl transition-colors hover:border-teal-400/40 hover:text-white"
                  >
                    Learn About Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
