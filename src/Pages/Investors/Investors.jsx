import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';

import investor1 from '../../assets/images/investor1.jpg';
import investor2 from '../../assets/images/investor2.jpg';
import investor3 from '../../assets/images/investor3.jpg';
import investor4 from '../../assets/images/investor4.jpg';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  TrendingUp,
  Eye,
  ChevronDown,
  Globe,
  Lock,
  BarChart3,
  Layers,
  Zap,
  CheckCircle2,
  Star,
  Users,
  DollarSign,
  Activity,
  FileText,
  Building,
} from 'lucide-react';

// ── Animation variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Animated Counter ───────────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── Shared Sub-components ──────────────────────────────────────────────────
function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="w-8 h-px bg-teal-500" />
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
        {children}
      </span>
      <span className="w-8 h-px bg-teal-500" />
    </div>
  );
}

function StatCard({ value, suffix = '', prefix = '', label, sublabel, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count  = useCounter(value, 2000, inView);
  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={scaleIn}
      className="text-center"
    >
      <div className="text-5xl lg:text-6xl font-black text-white tabular-nums leading-none mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-teal-200 text-sm font-semibold mt-2">{label}</div>
      {sublabel && <div className="text-teal-200/50 text-[10px] uppercase tracking-widest mt-0.5">{sublabel}</div>}
    </motion.div>
  );
}

// ── Floating Orb (decorative) ──────────────────────────────────────────────
function FloatingOrb({ className, color, size, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      }}
      animate={{ y: [0, -24, 0], opacity: [0.12, 0.2, 0.12] }}
      transition={{ repeat: Infinity, duration: 7 + delay, delay, ease: 'easeInOut' }}
    />
  );
}

// ── Particle Grid ──────────────────────────────────────────────────────────
function ParticleGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
      }}
    />
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: 12, suffix: '%',  prefix: '',  label: 'Target Annual Returns', sublabel: 'Net of fees' },
  { value: 90, suffix: 'd',  prefix: '<', label: 'Average Tenor',         sublabel: 'Short-duration assets' },
  { value: 70, suffix: '+',  prefix: '',  label: 'Countries Diversified',  sublabel: 'Across geographies' },
  { value: 2,  suffix: 'B+', prefix: '$', label: 'Trade Financed',         sublabel: 'Since inception' },
];

const PILLARS = [
  {
    Icon: Clock,
    title: 'Short Duration',
    desc: 'Most assets mature in 30–90 days. Your capital is never locked away for long periods — giving you liquidity and flexibility that traditional fixed-income cannot match.',
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    badge: '30–90 Day Tenors',
  },
  {
    Icon: TrendingUp,
    title: 'Attractive Risk-Adjusted Yield',
    desc: 'Earn 8–12% annualised net returns backed by real trade receivables. Every asset is collateralised and underpinned by actual commercial transactions.',
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.08)',
    badge: '8–12% Net Returns',
  },
  {
    Icon: Eye,
    title: 'Full Transparency',
    desc: 'Real-time dashboards let you track every receivable, repayment, and return. No black boxes — you see exactly where your capital is deployed at any moment.',
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.08)',
    badge: 'Live Dashboard',
  },
  {
    Icon: ShieldCheck,
    title: 'Credit Insurance',
    desc: 'All receivables are insured against buyer default through leading global credit insurance providers, adding a vital layer of protection for your investment.',
    accent: '#f59e0b',
    light: 'rgba(245,158,11,0.08)',
    badge: 'Insured Assets',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    Icon: FileText,
    title: 'Register & KYC',
    desc: 'Complete our streamlined onboarding — submit KYC/AML documentation and get verified within 48 hours by our compliance team.',
    color: '#1C96BF',
  },
  {
    step: '02',
    Icon: DollarSign,
    title: 'Fund Your Account',
    desc: 'Transfer capital to your Tradeflink investor account in USD, EUR, or GBP. Minimum investment starts from $50,000.',
    color: '#0ea5e9',
  },
  {
    step: '03',
    Icon: BarChart3,
    title: 'Select Receivables',
    desc: 'Browse a curated marketplace of verified trade receivables. Filter by geography, tenor, industry, and yield target.',
    color: '#a78bfa',
  },
  {
    step: '04',
    Icon: Activity,
    title: 'Earn & Withdraw',
    desc: 'Receive repayments as invoices are settled. Reinvest or withdraw freely with no lock-in periods or exit penalties.',
    color: '#f59e0b',
  },
];

const PRODUCTS = [
  {
    Icon: Zap,
    title: 'Export Factoring',
    desc: 'Finance verified export invoices from SMEs across 70+ countries. Short tenors, credit-insured, with buyer risk mitigated.',
    yield: '9–11%',
    tenor: '30–60 days',
    tag: 'Most Popular',
    dark: true,
    img: null, // investor3 injected in JSX
  },
  {
    Icon: Layers,
    title: 'Supply Chain Finance',
    desc: 'Extend payment terms to anchor buyers while suppliers receive early settlement. Backed by corporate-grade counterparties.',
    yield: '7–9%',
    tenor: '30–90 days',
    tag: null,
    dark: false,
    img: null,
  },
  {
    Icon: Building,
    title: 'Invoice Financing',
    desc: 'Invest in domestic and cross-border invoice pools. Diversified exposure across industries reduces concentration risk.',
    yield: '8–10%',
    tenor: '45–75 days',
    tag: null,
    dark: false,
    img: null,
  },
  {
    Icon: Globe,
    title: 'Open Account Trade',
    desc: 'Participate in open account financing structures for established buyer-seller relationships with strong payment histories.',
    yield: '10–13%',
    tenor: '60–90 days',
    tag: 'Higher Yield',
    dark: true,
    img: null, // investor2 injected in JSX
  },
];

const TRUST = [
  { Icon: ShieldCheck, label: 'Credit Insured',       sub: 'Leading global insurance providers' },
  { Icon: Lock,        label: 'Regulated & Compliant', sub: 'AML / KYC verified onboarding' },
  { Icon: Globe,       label: '70+ Countries',          sub: 'Geographic diversification' },
  { Icon: Users,       label: '500+ SME Partners',      sub: 'Vetted exporter network' },
  { Icon: BarChart3,   label: 'Real-Time Analytics',   sub: 'Live portfolio dashboard' },
  { Icon: CheckCircle2,label: 'No Lock-in',             sub: 'Flexible withdrawal terms' },
];

const FAQS = [
  {
    q: 'Who can invest with Tradeflink?',
    a: 'Tradeflink is open to accredited investors, family offices, asset managers, and institutional investors. We require investors to meet standard accreditation thresholds in their jurisdiction. Our onboarding team guides you through eligibility verification during the KYC process.',
  },
  {
    q: 'What documentation is required?',
    a: 'You will need to provide government-issued ID, proof of address (dated within 3 months), source of funds declaration, and for entities — corporate registration documents, beneficial ownership details, and board resolution authorising investment. Our compliance team reviews submissions within 48 business hours.',
  },
  {
    q: 'How does trading in receivables work?',
    a: 'An exporter raises an invoice against a verified buyer. Tradeflink purchases that receivable at a discount, paying the exporter immediately. As an investor, you fund these purchases and earn the spread when the buyer settles the invoice on the agreed due date. All receivables are credit-insured against buyer default.',
  },
  {
    q: 'What returns can I expect?',
    a: 'Our receivables portfolios have historically delivered 8–13% annualised net returns depending on the product type and risk tier selected. Returns are not guaranteed and are subject to market conditions, however the short tenor and insurance layer significantly mitigate downside risk.',
  },
  {
    q: 'Is my investment protected?',
    a: 'Yes — all receivables are covered by trade credit insurance from A-rated global insurers protecting against buyer insolvency and protracted default. Additionally, Tradeflink conducts rigorous KYB checks on all SME partners and maintains a diversified portfolio across geographies and industries.',
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'The minimum investment is $50,000 USD (or equivalent in EUR/GBP). There is no maximum cap. Institutional investors with larger mandates can access bespoke portfolio structures through our dedicated investor relations team.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The 90-day tenor and credit insurance structure gave us the confidence to allocate meaningfully. Our portfolio has consistently returned above 10% net.',
    name: 'James Thornton',
    role: 'CIO, Family Office',
    location: 'London, UK',
    flag: '🇬🇧',
    initials: 'JT',
    gradient: 'from-teal-500 to-teal-600',
    stars: 5,
  },
  {
    quote: 'Transparency is what sets Tradeflink apart. We can see every receivable in real time. It feels like a proper institutional-grade product finally built for trade finance.',
    name: 'Fatima Al-Rashid',
    role: 'Asset Manager',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    initials: 'FA',
    gradient: 'from-sky-500 to-sky-600',
    stars: 5,
  },
  {
    quote: 'We started with $500K and scaled to $5M within 18 months. The onboarding was seamless and the returns have been consistent quarter after quarter.',
    name: 'Sven Larsson',
    role: 'PE Fund Partner',
    location: 'Stockholm, Sweden',
    flag: '🇸🇪',
    initials: 'SL',
    gradient: 'from-violet-500 to-violet-600',
    stars: 5,
  },
];

// ── FAQ Accordion Item ─────────────────────────────────────────────────────
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left group"
      >
        <span className="text-white font-bold text-base group-hover:text-teal-300 transition-colors duration-200">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
        >
          <ChevronDown size={16} className="text-teal-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-6 text-white/60 leading-relaxed text-sm">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Investors() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO  — split layout with investor1 image
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden bg-[#050d18]">

        {/* Background layers */}
        <ParticleGrid />
        <FloatingOrb className="-top-40 left-1/4" color="#1C96BF" size="600px" delay={0} />
        <FloatingOrb className="bottom-0 left-0"  color="#0ea5e9" size="350px" delay={3} />

        {/* ── Left copy ── */}
        <div className="relative z-10 flex items-center w-full lg:w-[52%] px-6 sm:px-12 lg:px-20 py-40 lg:py-32">
          <div className="max-w-xl">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 mb-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              <span className="text-teal-300 text-[10px] font-black uppercase tracking-[0.25em]">
                Now Accepting Investors
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-white leading-[1.05] mb-7"
              style={{ fontSize: 'clamp(26px, 3.8vw, 52px)', fontWeight: 900 }}
            >
              Invest in{' '}
              <span className="text-gradient">Global Trade.</span>
       
              
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-slate-400 text-lg leading-relaxed mb-10"
            >
              Participate in credit-insured, short-term trade receivables
              diversified across industries and geographies — with full
              transparency and no lock-in.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-brand text-xs px-8 py-3.5">
                Start Investing
                <ArrowRight size={15} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 text-xs font-bold uppercase tracking-wider hover:border-white/35 hover:text-white transition-all duration-200"
              >
                How It Works
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-8 mt-12 pt-10 border-t border-white/8"
            >
              {[['8–12%', 'Target Returns'], ['<90d', 'Avg Tenor'], ['$2B+', 'Financed']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{v}</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.22em] mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Right image panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%]"
        >
          <img
            src={investor1}
            alt="Investor with digital financial charts"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlays to blend into dark bg */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #050d18 0%, transparent 22%, transparent 80%, #050d18 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #050d18 0%, transparent 12%, transparent 88%, #050d18 100%)' }} />

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-20 left-12 glass rounded-2xl p-5 max-w-[210px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <TrendingUp size={14} className="text-teal-400" />
              </div>
              <span className="text-teal-300 text-[10px] font-black uppercase tracking-widest">Live Return</span>
            </div>
            <p className="text-white text-2xl font-black">10.4%</p>
            <p className="text-white/40 text-[10px] mt-0.5">Annualised net — last 90 days</p>
          </motion.div>

          {/* Second floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute top-28 right-10 glass rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <ShieldCheck size={18} className="text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-white text-xs font-bold">Credit Insured</p>
              <p className="text-white/40 text-[10px]">A-rated providers</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-teal-400" />
          </motion.div>
          <span className="text-white/20 text-[9px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0a7c74 0%,#1C96BF 40%,#0ea5e9 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 divide-x divide-white/15">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                prefix={s.prefix}
                label={s.label}
                sublabel={s.sublabel}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY INVEST — 4 PILLARS
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Why Tradeflink</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Built for the modern{' '}
              <span className="text-gradient">alternative investor</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Trade receivables offer a compelling risk-return profile — now accessible without the complexity.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative p-7 rounded-3xl bg-white border border-gray-100 overflow-hidden cursor-default transition-all duration-300 hover:shadow-2xl hover:border-transparent"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${p.light} 0%, rgba(255,255,255,0) 100%)` }}
                />

                {/* Badge */}
                <div className="relative z-10 mb-5">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4"
                    style={{ background: p.light, color: p.accent }}
                  >
                    {p.badge}
                  </span>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: p.light }}
                  >
                    <p.Icon size={26} style={{ color: p.accent }} />
                  </div>
                </div>

                <div
                  className="w-8 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                  style={{ background: p.accent }}
                />
                <h3 className="text-lg font-black text-[#0f172a] mb-3">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RETURNS FEATURE — investor2 image strip
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeLeft}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
                <img
                  src={investor2}
                  alt="Investment growth chart with rising returns"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(6,15,30,0.85) 0%, rgba(6,15,30,0.2) 60%, transparent 100%)' }} />
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -right-5 -bottom-5 glass rounded-2xl shadow-2xl p-5 max-w-[170px] border border-white/10"
              >
                <p className="text-3xl font-black text-white">8–12%</p>
                <p className="text-[10px] text-teal-400/80 uppercase tracking-[0.2em] mt-1 font-bold">Net Annual Yield</p>
              </motion.div>
            </motion.div>

            {/* Right copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-px bg-teal-500" />
                <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">Consistent Performance</span>
              </motion.div>
              <motion.h2 variants={fadeUp}
                className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
                Returns that outperform<br />
                <span className="text-gradient">traditional fixed income</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-4">
                Trade receivables have historically delivered superior risk-adjusted returns
                compared to investment-grade bonds — with significantly shorter duration.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-8">
                Because each receivable is backed by a real commercial transaction and
                covered by trade credit insurance, you get stable cash flow without the
                volatility of equity markets.
              </motion.p>
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Avg Hold Period', value: '47 days' },
                  { label: 'Default Rate', value: '< 0.3%' },
                  { label: 'Receivables Insured', value: '100%' },
                  { label: 'Investor NPS', value: '72' },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-4 border border-white/8">
                    <p className="text-xl font-black text-white">{s.value}</p>
                    <p className="text-[10px] text-teal-400/70 uppercase tracking-[0.18em] mt-0.5 font-bold">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <FloatingOrb className="top-0 right-1/4"  color="#1C96BF" size="400px" delay={0} />
        <FloatingOrb className="bottom-0 left-1/4" color="#0ea5e9" size="300px" delay={3} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <Eyebrow dark>The Process</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Start earning in{' '}
              <span className="text-gradient">4 simple steps</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              From onboarding to first return — we've made the process as frictionless as possible.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px origin-left"
              style={{
                background: 'linear-gradient(to right, #1C96BF, #0ea5e9, #a78bfa, #f59e0b)',
              }}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="relative flex flex-col items-center text-center group cursor-default"
                >
                  {/* Step icon circle */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)`,
                        boxShadow: `0 0 0 0 ${step.color}`,
                      }}
                    >
                      <step.Icon size={26} style={{ color: step.color }} />
                    </motion.div>
                    {/* Glow ring on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                      style={{ background: step.color, filter: 'blur(16px)', transform: 'scale(0.8)' }}
                    />
                  </div>

                  {/* Step number */}
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                    style={{ color: step.color }}
                  >
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-black text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INVESTMENT PRODUCTS — BENTO
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Products</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Choose your{' '}
              <span className="text-gradient">investment structure</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Four distinct product types across risk profile, tenor, and yield — select what fits your mandate.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-5"
          >
            {PRODUCTS.map((prod, i) => {
              // Wire up investor images to dark cards
              const bgImg = i === 0 ? investor3 : i === 3 ? investor2 : null;

              if (prod.dark && bgImg) {
                return (
                  <motion.div
                    key={prod.title}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className="relative rounded-3xl overflow-hidden cursor-default group min-h-[340px] flex flex-col justify-end"
                  >
                    {/* Background image */}
                    <img
                      src={bgImg}
                      alt={prod.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.97) 0%, rgba(5,13,24,0.6) 55%, rgba(5,13,24,0.25) 100%)' }} />

                    {/* Tag */}
                    {prod.tag && (
                      <div className="absolute top-6 right-6 z-10">
                        <span className="px-3 py-1.5 rounded-full bg-teal-500/25 border border-teal-500/40 text-teal-300 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                          {prod.tag}
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 p-8">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-5 backdrop-blur-sm"
                      >
                        <prod.Icon size={22} className="text-teal-400" />
                      </motion.div>
                      <h3 className="text-2xl font-black text-white mb-3">{prod.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{prod.desc}</p>
                      <div className="flex gap-6 pt-5 border-t border-white/10">
                        <div>
                          <p className="text-2xl font-black text-white">{prod.yield}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5 text-teal-400/70">Net Yield</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white">{prod.tenor}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5 text-teal-400/70">Avg Tenor</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={prod.title}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl p-8 overflow-hidden cursor-default group transition-all duration-300 bg-slate-50 border border-gray-100 hover:border-teal-200 hover:shadow-xl"
                >
                  {/* Tag */}
                  {prod.tag && (
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-[10px] font-black uppercase tracking-widest">
                        {prod.tag}
                      </span>
                    </div>
                  )}

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-teal-50 border border-teal-100"
                    >
                      <prod.Icon size={24} className="text-teal-600" />
                    </motion.div>
                    <h3 className="text-2xl font-black mb-3 text-[#0f172a]">{prod.title}</h3>
                    <p className="text-sm leading-relaxed mb-8 text-slate-500">{prod.desc}</p>
                    <div className="flex gap-6 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-2xl font-black text-[#0f172a]">{prod.yield}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5 text-teal-600/70">Net Yield</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-[#0f172a]">{prod.tenor}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5 text-teal-600/70">Avg Tenor</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TRUST & SECURITY BADGES
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#050d18 0%,#0a1628 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <Eyebrow dark>Why Trust Us</Eyebrow>
            <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
              Institutional-grade{' '}
              <span className="text-gradient">protection</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                custom={i}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.04 }}
                className="glass rounded-2xl p-5 text-center group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <t.Icon size={18} className="text-teal-400" />
                </div>
                <p className="text-white text-xs font-black leading-snug mb-1">{t.label}</p>
                <p className="text-white/35 text-[9px] leading-tight">{t.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Investor Stories</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Trusted by{' '}
              <span className="text-gradient">global investors</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative p-7 rounded-3xl bg-white border border-gray-100 overflow-hidden cursor-default transition-all duration-300 hover:shadow-2xl hover:border-teal-100"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{ background: 'linear-gradient(135deg, rgba(28,150,191,0.04) 0%, rgba(14,165,233,0.04) 100%)' }} />

                {/* Big quote mark */}
                <div
                  className="absolute -top-4 -right-2 text-[120px] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(28,150,191,0.06)' }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5 relative z-10">
                  {[...Array(t.stars)].map((_, k) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: k * 0.07 + i * 0.05 }}
                    >
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-7 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#0f172a] font-bold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-semibold">
                    <span>{t.flag}</span>
                    <span>{t.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
        <FloatingOrb className="-top-20 left-1/3" color="#1C96BF" size="500px" delay={1} />
        <FloatingOrb className="bottom-0 right-0"  color="#a78bfa" size="350px" delay={3} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow dark>Investor FAQ</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Questions{' '}
              <span className="text-gradient">answered</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Everything you need to know before you start investing with Tradeflink.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA  — investor4 boardroom background
      ══════════════════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-[#050d18]">
        {/* Boardroom image as atmosphere */}
        <img
          src={investor4}
          alt="Investor boardroom meeting"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
        />
        {/* Deep overlay to keep text readable */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #050d18 0%, rgba(5,13,24,0.55) 50%, #050d18 100%)' }} />
        <ParticleGrid />

        {/* Rotating outer rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          <div className="w-[900px] h-[900px] rounded-full border border-teal-500/6" />
        </motion.div>

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
              </span>
              Ready to Invest
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}
            >
              Unlock access to{' '}
              <span className="text-gradient">global trade</span>
              <br />
              receivables today
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-xl max-w-lg mx-auto mb-12 leading-relaxed"
            >
              Join a growing community of institutional and accredited investors earning
              short-duration, credit-insured returns across 70+ countries.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" className="btn-brand text-sm px-12 py-4">
                Apply to Invest
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:investors@tradeflink.com"
                className="inline-flex items-center gap-2 px-12 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
              >
                Talk to Our Team
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/8"
            >
              {[
                { Icon: ShieldCheck, label: 'Credit Insured' },
                { Icon: Lock,        label: 'KYC / AML Compliant' },
                { Icon: CheckCircle2,label: 'No Lock-in' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-semibold">
                  <Icon size={14} className="text-teal-500" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
