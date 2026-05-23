import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  FileText, DollarSign, Globe, Users, Zap, BarChart3,
  ChevronDown, Star, Package, Banknote, RefreshCw, Lock,
  ShieldCheck, Activity, Handshake, CreditCard, Layers,
  PieChart, Wallet, Upload, BadgeCheck, Building2, Factory,
} from 'lucide-react';

import heroBg from '../../assets/images/invoice1.webp';
import img2   from '../../assets/images/invoice2.webp';
import img3   from '../../assets/images/invoice3.webp';
import img4   from '../../assets/images/invoice4.webp';
import img5   from '../../assets/images/invoice5.webp';

/* ── Animation variants ────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeRight = {
  hidden:  { opacity: 0, x: 50 },
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

/* ── Animated Counter ──────────────────────────────────────────── */
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

/* ── Particle Grid ─────────────────────────────────────────────── */
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

/* ── Floating Orb ──────────────────────────────────────────────── */
function FloatingOrb({ className, color, size, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      }}
      animate={{ y: [0, -24, 0], opacity: [0.12, 0.22, 0.12] }}
      transition={{ repeat: Infinity, duration: 7 + delay, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Eyebrow ───────────────────────────────────────────────────── */
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

/* ── Stat Card ─────────────────────────────────────────────────── */
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

/* ── Floating Invoice Card (Hero visual) ───────────────────────── */
function FloatingInvoiceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:block"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="w-72 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Invoice header */}
        <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #1C96BF22, #0ea5e922)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Invoice #TF-2024-0891</span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/15 px-2 py-0.5 rounded-full">APPROVED</span>
          </div>
          <div className="text-2xl font-black text-white">$124,500</div>
          <div className="text-white/40 text-[10px] mt-0.5">Due in 90 days</div>
        </div>
        {/* Progress bar */}
        <div className="px-5 py-3 border-t border-white/10">
          <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
            <span>Advance funded</span>
            <span className="text-teal-400 font-bold">95%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '95%' }}
              transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #1C96BF, #0ea5e9)' }}
            />
          </div>
        </div>
        {/* Line items */}
        <div className="px-5 pb-4 space-y-2">
          {[
            { label: 'Advance received',  val: '$118,275', color: 'text-white' },
            { label: 'Disbursed in',      val: '< 24 hrs', color: 'text-teal-400' },
            { label: 'Remaining at maturity', val: '$6,225',   color: 'text-white/50' },
          ].map((r) => (
            <div key={r.label} className="flex justify-between items-center">
              <span className="text-[10px] text-white/40">{r.label}</span>
              <span className={`text-[11px] font-bold ${r.color}`}>{r.val}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Secondary floating badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
        className="absolute -bottom-8 -left-8 glass rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-xl"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <BadgeCheck size={16} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-white text-xs font-bold">Funds Released</p>
          <p className="text-white/40 text-[10px]">2 minutes ago</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── FAQ Accordion ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is invoice financing?',
    a: 'Invoice financing (also called invoice discounting or receivables financing) lets you unlock the cash tied up in your outstanding invoices before buyers pay. Rather than waiting 30–120 days for a buyer to settle, you sell or pledge the invoice to Tradeflink and receive up to 95% of its face value immediately. We collect payment from your buyer on the due date and remit the remaining balance, minus a small facility fee.',
  },
  {
    q: 'How quickly can I receive funds after submitting an invoice?',
    a: 'For approved clients, Tradeflink typically disburses funds within 24 hours of invoice submission and verification. First-time applicants go through an onboarding review that usually takes 2–3 business days, after which subsequent advances are released same-day or next-day as a rule.',
  },
  {
    q: 'Does invoice financing affect my relationship with buyers?',
    a: 'With our confidential facility, your buyer is never notified that the invoice has been financed — they continue to pay you on their normal terms and you redirect those funds to us. If you prefer a disclosed arrangement (where Tradeflink collects directly), we offer that too. Either way, your buyer relationship is fully protected.',
  },
  {
    q: 'What types of invoices are eligible?',
    a: 'Tradeflink finances B2B invoices raised against creditworthy domestic or international buyers. Invoices must be for goods delivered or services rendered — not proforma or disputed invoices. We cover single invoices as well as whole-ledger facilities, and we support invoices in USD, EUR, GBP, AED, INR, and other major trade currencies.',
  },
  {
    q: 'Is invoice financing the same as a loan?',
    a: 'No. Invoice financing is a sale or pledge of your receivable — not a loan. It does not add debt to your balance sheet, does not require fixed repayment schedules, and does not affect your credit rating in the way a traditional loan would. The advance is repaid automatically when your buyer pays the invoice on the due date.',
  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref} custom={index} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
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
          className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
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
            <p className="px-7 pb-6 text-white/60 leading-relaxed text-sm">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Data ──────────────────────────────────────────────────────── */
const STATS = [
  { value: 95,  suffix: '%', prefix: '', label: 'Invoice Advance Rate',  sublabel: 'Of face value funded' },
  { value: 24,  suffix: 'h', prefix: '',        label: 'Funding Speed',         sublabel: 'From submission to cash' },
  { value: 70,  suffix: '+', prefix: '',        label: 'Countries Covered',     sublabel: 'Global reach' },
  { value: 0,   suffix: '%', prefix: '',        label: 'Balance Sheet Impact',  sublabel: 'Off-balance-sheet finance' },
];

const HOW_IT_WORKS = [
  {
    step: '01', Icon: Upload, color: '#1C96BF',
    title: 'Submit Your Invoice',
    desc: 'Upload your verified B2B invoice directly to Tradeflink\'s platform. Our system instantly validates the invoice details against your buyer\'s credit profile and your facility limits — the whole process takes minutes, not days.',
  },
  {
    step: '02', Icon: BadgeCheck, color: '#0ea5e9',
    title: 'Get Instant Approval',
    desc: 'Once verified, Tradeflink approves the advance — typically up to 95% of the invoice face value. You\'ll receive a clear breakdown of the advance amount, the small facility fee, and the exact disbursement timeline.',
  },
  {
    step: '03', Icon: Wallet, color: '#a78bfa',
    title: 'Receive Funds in 24 Hours',
    desc: 'The approved advance hits your account within 24 hours. When your buyer pays on the invoice due date, Tradeflink remits the remaining balance to you. No chasing, no waiting — just predictable cash flow on every transaction.',
  },
];

const FEATURES = [
  {
    Icon: Zap,
    title: 'Instant Liquidity',
    desc: 'Stop waiting 60–120 days for buyers to pay. Tradeflink converts your outstanding invoices into immediate working capital — letting you reinvest, restock, and grow without interruption.',
    accent: '#1C96BF', light: 'rgba(28,150,191,0.08)',
    badge: '24-Hr Disbursement',
  },
  {
    Icon: PieChart,
    title: 'Flexible, Scalable Limits',
    desc: 'Your facility grows with your business. As your invoice volumes increase, so does your available funding. No fixed loan caps, no renegotiation — just seamless access to capital that scales at your pace.',
    accent: '#0ea5e9', light: 'rgba(14,165,233,0.08)',
    badge: 'Scales With You',
  },
  {
    Icon: Layers,
    title: 'Zero Debt, Zero Collateral',
    desc: 'Invoice financing isn\'t a loan — it\'s a receivable advance. It doesn\'t appear on your balance sheet as debt, doesn\'t require physical assets as collateral, and doesn\'t affect your existing banking relationships.',
    accent: '#a78bfa', light: 'rgba(167,139,250,0.08)',
    badge: 'Off-Balance-Sheet',
  },
];

const BENEFITS = [
  {
    Icon: TrendingUp,
    title: 'Accelerate Growth',
    desc: 'With predictable cash flow, you can take on larger orders, expand into new markets, and scale operations — without waiting on slow-paying buyers to fund your next move.',
    color: '#1C96BF',
  },
  {
    Icon: Shield,
    title: 'Protect Against Bad Debt',
    desc: 'With our non-recourse facility option, Tradeflink absorbs the credit risk if a buyer becomes insolvent. You receive your advance regardless of what happens on the buyer\'s end.',
    color: '#0ea5e9',
  },
  {
    Icon: Clock,
    title: 'End the Cash Flow Gap',
    desc: 'The mismatch between shipping goods and receiving payment is the #1 killer of SME growth. Invoice financing eliminates that gap permanently — every invoice turns into same-day cash.',
    color: '#a78bfa',
  },
  {
    Icon: Globe,
    title: 'Finance Cross-Border Trade',
    desc: 'Tradeflink finances invoices raised against buyers in 70+ countries, in all major currencies. Whether you\'re selling locally or across continents, your invoices convert to cash just as fast.',
    color: '#f59e0b',
  },
];

const FOR_WHOM = [
  {
    Icon: Package,
    who: 'For Exporters',
    headline: 'Ship globally. Get paid instantly.',
    desc: 'Finance your export invoices regardless of where your buyers are eliminating the cash flow gap that slows growth.',
    rating: '4.8',
    gradient: 'from-teal-500 to-teal-600',
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.07)',
  },
  {
    Icon: Building2,
    who: 'For SMEs',
    headline: 'Big-order confidence. Small-business speed.',
    desc: 'Accept large purchase orders without worrying about the working capital gap Tradeflink funds until your buyer pays.',
    rating: '4.8',
    gradient: 'from-sky-500 to-sky-600',
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.07)',
  },
  {
    Icon: Factory,
    who: 'For Manufacturers',
    headline: 'Fund production. Not debt.',
    desc: 'Turn your invoices into the raw material budget you need — keeping production lines running and orders flowing without bank loans.',
    rating: '4.8',
    gradient: 'from-violet-500 to-violet-600',
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.07)',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Before Tradeflink, every large export order meant a three-month cash flow crunch. Now we submit the invoice on shipping day and the advance lands in 24 hours. We\'ve been able to double our order book without touching our bank credit lines.',
    name: 'Priya Mehta',
    role: 'CFO, Textile Exporter',
    location: 'Mumbai, India',
    flag: '🇮🇳',
    initials: 'PM',
    gradient: 'from-teal-500 to-teal-600',
    stars: 5,
  },
  {
    quote: "Tradeflink's invoice financing gave us the cash runway to take on a contract three times our usual size. The process is completely digital, the fees are transparent, and the team is incredibly responsive. It's changed how we think about working capital.",
    name: 'Omar Al-Farsi',
    role: 'Managing Director, Trading Co.',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    initials: 'OA',
    gradient: 'from-sky-500 to-sky-600',
    stars: 5,
  },
];

/* ── Shimmer beam animation ────────────────────────────────────── */
function ShimmerCard({ children, className, style }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'linear', repeatDelay: 1.5 }}
      />
      {children}
    </div>
  );
}

/* ── Process connector line ────────────────────────────────────── */
function ProcessConnector() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="w-full h-full origin-left"
        style={{ background: 'linear-gradient(to right, #1C96BF, #0ea5e9, #a78bfa)' }}
      />
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */
export default function InvoiceFinancing() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <img
            src={heroBg}
            alt="Invoice financing"
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: 'rgba(5,13,24,0.50)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(5,13,24,0.85) 0%, rgba(5,13,24,0.35) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.6) 0%, transparent 40%)' }} />
        <ParticleGrid />

        {/* Orbs */}
        <FloatingOrb className="-top-40 right-1/4" color="#1C96BF" size="600px" delay={0} />
        <FloatingOrb className="bottom-0 left-0"   color="#a78bfa" size="400px" delay={2} />
        <FloatingOrb className="top-1/3 right-0"   color="#0ea5e9" size="300px" delay={4} />

        {/* Bottom edge line */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.5),rgba(14,165,233,0.5),transparent)' }} />

        <div className="relative z-10 py-44 px-6 sm:px-10 lg:px-20 xl:px-28 max-w-7xl mx-auto w-full">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-9"
            style={{ border: '1px solid rgba(28,150,191,0.35)', background: 'rgba(28,150,191,0.08)', backdropFilter: 'blur(12px)' }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-teal-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.25em]">Invoice Finance · Funds in 24 Hours</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-clash font-semibold text-white leading-[1.05] mb-7 max-w-3xl"
            style={{ fontSize: 'clamp(26px, 3.8vw, 56px)' }}
          >
            Turn Unpaid Invoices{' '}
            <span className="text-gradient">Into Instant</span>
            <br />
            Working Capital.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-300 text-md leading-relaxed mb-10 max-w-xl"
          >
            Stop waiting 90 days for buyers to pay. Tradeflink advances up to 95%
            of your invoice value within 24 hours — giving you the cash flow to
            grow without debt, delays, or disruption.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-5"
          >
            <Link to="/contact" className="btn-brand text-xs px-8 py-3.5">
              Get Funded Today <ArrowRight size={15} />
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
            className="flex flex-wrap gap-8 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {[['95%', 'Advance Rate'], ['24h', 'Disbursement'], ['70+', 'Countries'], ['0%', 'Balance Sheet']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-white">{v}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.22em] mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating invoice card */}
        <FloatingInvoiceCard />

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
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

      {/* ════════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0a7c74 0%,#1C96BF 40%,#0ea5e9 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
            backgroundSize: '300% 100%',
          }}
          animate={{ backgroundPosition: ['300% 0', '-300% 0'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 divide-x divide-white/15">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label} value={s.value} suffix={s.suffix}
                prefix={s.prefix} label={s.label} sublabel={s.sublabel} index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT IS INVOICE FINANCING
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }} variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>What We Offer</Eyebrow>
              </motion.div>
              <motion.h2 variants={fadeUp}
                className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight mb-6"
              >
                Your invoices are worth{' '}
                <span className="text-gradient">cash today.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-5 text-lg">
                Invoice financing — also known as invoice discounting or receivables
                financing — lets you advance up to 95% of the face value of any
                outstanding invoice, the day you raise it. You stop waiting on slow-paying
                buyers and start growing with the capital you've already earned.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-8">
                Tradeflink's fully digital platform handles everything from invoice
                verification and approval to buyer collections — so you can focus on
                running your business while we manage the cash flow.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  'Advance up to 95% of invoice face value — same or next business day',
                  'Confidential facility: your buyers never know you\'ve financed the invoice',
                  'No fixed repayment schedule — the invoice pays itself on the due date',
                  'No physical collateral required — your invoices are the security',
                  'Non-recourse option available: Tradeflink absorbs buyer insolvency risk',
                ].map((item, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mt-0.5">
                      <CheckCircle2 size={12} className="text-teal-600" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <Link to="/contact" className="btn-brand text-xs px-8 py-3.5">
                  Talk to Our Team <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }} variants={fadeRight}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 group">
                <img
                  src={img2}
                  alt="Invoice financing platform"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.7) 0%, transparent 50%)' }} />
              </div>

              {/* Floating badge bottom-right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -right-5 -bottom-5 glass rounded-2xl shadow-2xl p-5 max-w-48 border border-white/10"
              >
                <p className="text-3xl font-black text-white">95%</p>
                <p className="text-[10px] text-teal-400/80 uppercase tracking-[0.2em] mt-1 font-bold">Advance Rate</p>
              </motion.div>

              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute top-6 left-6 glass rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <Zap size={18} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">Funds in 24 Hours</p>
                  <p className="text-white/40 text-[10px]">After invoice submission</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <FloatingOrb className="top-0 right-1/4"   color="#1C96BF" size="400px" delay={0} />
        <FloatingOrb className="bottom-0 left-1/4" color="#a78bfa" size="300px" delay={3} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-16"
          >
            <Eyebrow dark>The Process</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Three steps from invoice{' '}
              <span className="text-gradient">to funded</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Tradeflink's digital-first process makes invoice financing fast, transparent, and effortless.
            </p>
          </motion.div>

          <div className="relative">
            <ProcessConnector />

            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={stagger}
              className="grid sm:grid-cols-3 gap-8"
            >
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step} custom={i} variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="relative flex flex-col items-center text-center group cursor-default"
                >
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 border border-white/10"
                      style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)` }}
                    >
                      <step.Icon size={26} style={{ color: step.color }} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ background: step.color, filter: 'blur(20px)', transform: 'scale(0.7)' }}
                    />
                  </div>
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

          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-10"
          >
            <div className="grid lg:grid-cols-3 gap-6 items-center text-center">
              {[
                { label: 'Your Business', sub: 'Submits invoice & docs', color: '#1C96BF' },
                { label: 'Tradeflink', sub: 'Verifies, approves & disburses', color: '#0ea5e9', highlight: true },
                { label: 'Your Buyer', sub: 'Pays on original due date', color: '#a78bfa' },
              ].map((node, i) => (
                <React.Fragment key={node.label}>
                  <ShimmerCard
                    className={`rounded-2xl p-6 ${node.highlight ? 'border-2' : 'border border-white/10'}`}
                    style={node.highlight
                      ? { borderColor: node.color, background: `${node.color}15` }
                      : { background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${node.color}20` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: node.color }} />
                    </div>
                    <p className="text-white font-black text-lg">{node.label}</p>
                    <p className="text-white/40 text-xs mt-1">{node.sub}</p>
                  </ShimmerCard>
                  {i < 2 && (
                    <div className="hidden lg:flex items-center justify-center -mx-4">
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      >
                        <ArrowRight size={20} className="text-teal-500" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Photo strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 rounded-3xl overflow-hidden relative h-64 lg:h-80 group"
          >
            <img
              src={img3}
              alt="Invoice financing operations"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(6,15,30,0.88) 0%, rgba(6,15,30,0.3) 50%, transparent 100%)' }} />
            <div className="absolute inset-0 flex items-center px-10 lg:px-16">
              <div className="max-w-sm">
                <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">The Result</p>
                <p className="text-white text-2xl lg:text-3xl font-black leading-snug">
                  Invoice submitted.{' '}
                  <span className="text-gradient">Cash in your account.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CORE FEATURES — 3 cards
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Core Features</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Finance built for{' '}
              <span className="text-gradient">how you trade</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Tradeflink's invoice financing is designed around the real-world needs of SMEs and exporters — fast, flexible, and completely digital.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}
            className="grid lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title} custom={i} variants={scaleIn}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 overflow-hidden cursor-default transition-all duration-300 hover:shadow-2xl hover:border-transparent"
              >
                {/* Hover gradient fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${f.light} 0%, rgba(255,255,255,0) 100%)` }}
                />
                {/* Animated border glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 0 1.5px ${f.accent}40` }}
                />
                <div className="relative z-10 mb-5">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4"
                    style={{ background: f.light, color: f.accent }}
                  >
                    {f.badge}
                  </span>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: f.light }}
                  >
                    <f.Icon size={26} style={{ color: f.accent }} />
                  </div>
                </div>
                <motion.div
                  className="h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:w-20"
                  style={{ background: f.accent, width: '2rem' }}
                />
                <h3 className="text-xl font-black text-[#0f172a] mb-3">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          KEY BENEFITS — image + benefit list
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Why It Works</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Real benefits for{' '}
              <span className="text-gradient">real businesses</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Invoice financing solves the fundamental working capital problem that holds most growing businesses back.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
            {/* Image */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }} variants={fadeLeft}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 group">
                <img
                  src={img4}
                  alt="Invoice financing benefits"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.6) 0%, transparent 55%)' }} />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-5 -bottom-5 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
              >
                <p className="text-3xl font-black text-[#0f172a]">24 hours</p>
                <p className="text-[10px] text-teal-600 uppercase tracking-[0.2em] mt-1 font-bold">From invoice to cash</p>
              </motion.div>
            </motion.div>

            {/* Benefits list */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }} variants={stagger}
              className="order-1 lg:order-2 space-y-5"
            >
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title} custom={i} variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-gray-100 cursor-default"
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${b.color}15` }}
                  >
                    <b.Icon size={22} style={{ color: b.color }} />
                  </div>
                  <div>
                    <h4 className="text-[#0f172a] font-black text-base mb-1">{b.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHO IT'S FOR
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-white -mt-17">
        <div className="container-xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Built for every business{' '}
              <span className="text-gradient">that invoices</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}
            className="grid lg:grid-cols-3 gap-6"
          >
            {FOR_WHOM.map((fw, i) => (
              <motion.div
                key={fw.who} custom={i} variants={scaleIn}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl p-8 border border-gray-100 overflow-hidden cursor-default transition-all duration-300 hover:shadow-2xl hover:border-transparent"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${fw.light} 0%, rgba(255,255,255,0) 100%)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: fw.light }}
                  >
                    <fw.Icon size={26} style={{ color: fw.accent }} />
                  </div>

                  <span
                    className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4"
                    style={{ background: fw.light, color: fw.accent }}
                  >
                    {fw.who}
                  </span>

                  <h3 className="text-lg font-black text-[#0f172a] mb-3 leading-snug">{fw.headline}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{fw.desc}</p>

                  {/* Star rating */}
                  <div className="flex items-center gap-2 pt-5 border-t border-gray-100">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, k) => (
                        <Star key={k} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-[#0f172a]">{fw.rating}</span>
                    <span className="text-xs text-slate-400">satisfaction</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          IMAGE FEATURE STRIP
      ════════════════════════════════════════════════════════ */}
      <section className="relative h-[440px] lg:h-[540px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={img5}
            alt="Global invoice financing operations"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(5,13,24,0.93) 0%, rgba(5,13,24,0.6) 50%, rgba(5,13,24,0.78) 100%)' }} />
        <ParticleGrid />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }} variants={stagger}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-5">
                  <span className="w-8 h-px bg-teal-500" />
                  <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">Our Impact</span>
                </motion.div>
                <motion.h2 variants={fadeUp}
                  className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6"
                >
                  Trusted by traders across{' '}
                  <span className="text-gradient">70+ countries</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-300 text-lg leading-relaxed">
                  Every day, SMEs and exporters around the world use Tradeflink's
                  invoice financing to bridge the gap between shipping and payment —
                  closing more deals and growing faster than their competitors.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }} variants={stagger}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { val: '$250M+', label: 'Invoices Financed',  sub: 'Since inception' },
                  { val: '300+',  label: 'SME Partners',       sub: 'Vetted & verified' },
                  { val: '24h',   label: 'Avg. Disbursement',  sub: 'From submission' },
                  { val: '95%',   label: 'Advance Rate',       sub: 'On approved invoices' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label} custom={i} variants={scaleIn}
                    whileHover={{ scale: 1.04 }}
                    className="glass rounded-2xl p-5 border border-white/10 text-center cursor-default"
                  >
                    <p className="text-2xl font-black text-white">{s.val}</p>
                    <p className="text-teal-400 text-xs font-bold mt-1">{s.label}</p>
                    <p className="text-white/30 text-[10px] mt-0.5 uppercase tracking-widest">{s.sub}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow>Client Stories</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Businesses that{' '}
              <span className="text-gradient">never wait to grow</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}
            className="grid lg:grid-cols-2 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name} custom={i} variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 overflow-hidden cursor-default transition-all duration-300 hover:shadow-2xl hover:border-teal-100"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{ background: 'linear-gradient(135deg, rgba(28,150,191,0.04) 0%, rgba(14,165,233,0.04) 100%)' }} />

                <div
                  className="absolute -top-4 -right-2 text-[120px] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(28,150,191,0.06)' }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5 relative z-10">
                  {[...Array(t.stars)].map((_, k) => (
                    <Star key={k} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-7 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-black shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#0f172a] font-bold">{t.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.role}</p>
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

      {/* ════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden -mb-15">
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
        <FloatingOrb className="-top-20 left-1/3" color="#1C96BF" size="500px" delay={1} />
        <FloatingOrb className="bottom-0 right-0"  color="#a78bfa" size="350px" delay={3} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow dark>Common Questions</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              Everything you need to{' '}
              <span className="text-gradient">know</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Clear answers to the most common questions about invoice financing with Tradeflink.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-[#050d18]">
        <img
          src={heroBg}
          alt="Invoice financing"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-12"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #050d18 0%, rgba(5,13,24,0.55) 50%, #050d18 100%)' }} />
        <ParticleGrid />

        {/* Rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          <div className="w-[500px] h-[500px] rounded-full border border-teal-500/6" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <div className="w-[340px] h-[340px] rounded-full border border-violet-500/8" />
        </motion.div>

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={stagger}
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
              Turn Your Invoices Into Capital Today
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(26px, 3.5vw, 52px)', fontWeight: 900 }}
            >
              Submit an invoice.{' '}
              <span className="text-gradient">Get paid in 24 hours.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-400 text-xl max-w-lg mx-auto mb-12 leading-relaxed">
              Join hundreds of SMEs and exporters who use Tradeflink to
              eliminate cash flow gaps, fund growth, and never wait on buyers again.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" className="btn-brand text-sm px-12 py-4">
                Get Funded Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/exporters"
                className="inline-flex items-center gap-2 px-12 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/8"
            >
              {[
                { Icon: ShieldCheck, label: 'Non-Recourse Option' },
                { Icon: Lock,        label: 'Confidential Facility' },
                { Icon: Globe,       label: '70+ Countries' },
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
