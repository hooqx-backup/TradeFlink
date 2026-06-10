import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  FileText, DollarSign, Globe, Users, Zap, BarChart3,
  ChevronDown, Star, Package, Banknote, RefreshCw, Lock,
  ShieldCheck, Activity, Layers, Network, Truck, Building2,
} from 'lucide-react';

import heroBg from '../../assets/images/supply1.webp';
import img2   from '../../assets/images/supply2.webp';
import img3   from '../../assets/images/supply3.webp';
import img4   from '../../assets/images/supply4.webp';
import img5   from '../../assets/images/supply5.webp';
import img6   from '../../assets/images/supply6.webp';

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
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
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

/* ── Sub-components ────────────────────────────────────────────── */
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

function StatCard({ value, suffix = '', prefix = '', text, label, sublabel, index }) {
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
      <div className="text-5xl lg:text-6xl font-black text-white uppercase leading-none mb-1">
        {text ?? `${prefix}${count}${suffix}`}
      </div>
      <div className="text-teal-200 text-sm font-semibold mt-2">{label}</div>
      {sublabel && <div className="text-teal-200/50 text-[10px] uppercase tracking-widest mt-0.5">{sublabel}</div>}
    </motion.div>
  );
}

/* ── FAQ Accordion ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is supply chain finance?',
    a: 'Supply chain finance (SCF) is a buyer-led program where Tradeflink pays your approved suppliers early, on the buyer\'s behalf. The supplier gets cash quickly, while the buyer continues to pay Tradeflink on the original invoice due date. Everyone wins: suppliers get liquidity, buyers strengthen their supply chain without touching their credit lines.',
  },
  {
    q: 'Who initiates the program, the buyer or the supplier?',
    a: 'The anchor buyer initiates and approves the program. Once the buyer approves an invoice, the supplier can then choose to request early payment at any time before the due date. The supplier\'s decision to draw early is entirely optional, they can take the full term if they prefer.',
  },
  {
    q: 'Does this increase the buyer\'s debt burden?',
    a: 'No. Supply chain finance is structured as a trade payable extension, not additional borrowing. Buyers continue to pay on their normal terms, and the program is off-balance-sheet for suppliers. This keeps the financial position of all parties clean.',
  },
  {
    q: 'How fast do suppliers receive funds?',
    a: 'Once the buyer approves the invoice and the supplier requests early payment, Tradeflink transfers funds quickly. Our digital-first platform eliminates paperwork delays and manual verification steps.',
  },
  {
    q: 'Which industries and geographies does the program cover?',
    a: 'Tradeflink\'s supply chain finance program serves buyers and suppliers across manufacturing, FMCG, retail, agriculture, and more, across many countries. Our offices in Dubai, Delhi, Kolkata, Delaware, London, and Istanbul provide local expertise globally.',
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
  { value: 3,   text: 'Fast',  suffix: '', prefix: '< ', label: 'Supplier Funding Speed',  sublabel: 'After buyer approval' },
  { value: 70,  text: 'Wide',  suffix: '+', prefix: '',  label: 'Countries Covered',        sublabel: 'Global reach' },
  { value: 100, text: 'Clean', suffix: '%', prefix: '',  label: 'Off-Balance-Sheet',        sublabel: 'For suppliers' },
  { value: 0,   text: 'Zero',  suffix: '%', prefix: '',  label: 'Supplier Credit Risk',     sublabel: 'Fully absorbed' },
];

const HOW_IT_WORKS = [
  {
    step: 'A', Icon: FileText, color: '#1C96BF',
    title: 'Buyer Approves Invoices',
    desc: 'The anchor buyer reviews and approves supplier invoices on Tradeflink\'s digital platform, confirming payment obligation and unlocking early-payment eligibility for each invoice.',
  },
  {
    step: 'B', Icon: Banknote, color: '#0ea5e9',
    title: 'Supplier Requests Early Payment',
    desc: 'The supplier selects approved invoices and requests early payment at any time before the due date. Tradeflink transfers funds to the supplier\'s account rapidly.',
  },
  {
    step: 'C', Icon: RefreshCw, color: '#a78bfa',
    title: 'Buyer Settles on Original Terms',
    desc: 'On the original invoice due date, the buyer pays Tradeflink directly, with no change to their existing payment cycle. Suppliers enjoy early liquidity; buyers stay on schedule.',
  },
];

const FEATURES = [
  {
    Icon: Building2,
    title: 'Buyer-Driven Programme',
    desc: 'Anchor buyers approve invoices on our platform, granting their entire supplier base access to early-payment liquidity, powered by the buyer\'s creditworthiness, not the supplier\'s.',
    accent: '#1C96BF', light: 'rgba(28,150,191,0.08)',
    badge: 'Buyer-Led',
  },
  {
    Icon: Zap,
    title: 'Rapid Supplier Funding',
    desc: 'Suppliers access approved funds quickly through our digital-first portal. No paper, no delays, no relationship banking required, just fast, reliable liquidity.',
    accent: '#0ea5e9', light: 'rgba(14,165,233,0.08)',
    badge: 'Rapid Disbursement',
  },
  {
    Icon: Activity,
    title: 'Dynamic Discounting',
    desc: 'Suppliers pick their own draw date, earlier means a smaller discount, later means more cash. No pressure, fully flexible.',
    accent: '#a78bfa', light: 'rgba(167,139,250,0.08)',
    badge: 'Flexible Draw Dates',
  },
];

const BENEFITS = [
  {
    Icon: Network,
    title: 'Strengthen Supplier Relationships',
    desc: 'By giving suppliers predictable, early access to cash, buyers build deeper loyalty and resilience across their entire supply chain, reducing the risk of disruption.',
    color: '#1C96BF',
  },
  {
    Icon: TrendingUp,
    title: 'Extend Payment Terms Freely',
    desc: 'Buyers can negotiate longer payment terms with suppliers without creating financial pressure downstream, Tradeflink bridges the gap so everyone operates on their ideal timeline.',
    color: '#0ea5e9',
  },
  {
    Icon: Shield,
    title: 'Off-Balance-Sheet for Suppliers',
    desc: 'Because Tradeflink\'s advances are based on confirmed buyer payables, not supplier credit, the funding remains off the supplier\'s balance sheet and preserves their borrowing headroom.',
    color: '#a78bfa',
  },
  {
    Icon: Truck,
    title: 'Reduce Supply Chain Risk',
    desc: 'Suppliers who get paid on time deliver on time, and they take on bigger orders. A healthier chain benefits everyone in it.',
    color: '#f59e0b',
  },
];

const FOR_WHOM = [
  {
    Icon: Building2,
    who: 'For Buyers',
    headline: 'Extend terms. Strengthen suppliers. Zero new debt.',
    desc: 'Large corporates and anchor buyers use Tradeflink\'s SCF programme to optimise working capital while ensuring their suppliers never face a liquidity crunch.',
    rating: 'Top Rated',
    gradient: 'from-teal-500 to-teal-600',
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.07)',
  },
  {
    Icon: Package,
    who: 'For Suppliers',
    headline: 'Get paid quickly, not months away.',
    desc: 'SME suppliers access early payment on approved invoices without taking on debt or going through lengthy credit processes, just fast, frictionless liquidity.',
    rating: 'Top Rated',
    gradient: 'from-sky-500 to-sky-600',
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.07)',
  },
  {
    Icon: BarChart3,
    who: 'For Investors',
    headline: 'Short-duration returns backed by buyer credit.',
    desc: 'Invest in verified, buyer-approved payables and earn transparent returns on short-duration assets underpinned by the credit of investment-grade buyers.',
    rating: 'Top Rated',
    gradient: 'from-violet-500 to-violet-600',
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.07)',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Tradeflink\'s supply chain finance programme transformed how we manage our supplier base. Our partners get paid within days of invoice approval, and we\'ve seen zero supply disruptions since we onboarded, a game-changer for our procurement team.',
    name: 'Priya Mehta',
    role: 'Head of Procurement',
    location: 'Mumbai, India',
    flag: '🇮🇳',
    initials: 'PM',
    gradient: 'from-teal-500 to-teal-600',
    stars: 5,
  },
  {
    quote: 'As a manufacturer supplying large retailers, waiting months for payment was crippling our growth. With Tradeflink, we choose when to draw early, sometimes we take the full term, sometimes we draw right away. That flexibility is everything.',
    name: 'Khalid Al-Farsi',
    role: 'Manufacturing Supplier',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    initials: 'KA',
    gradient: 'from-sky-500 to-sky-600',
    stars: 5,
  },
];

/* ── Main Page ─────────────────────────────────────────────────── */
export default function SupplyChainFinance() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: 'rgba(5,13,24,0.45)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(5,13,24,0.78) 0%, rgba(5,13,24,0.28) 60%, transparent 100%)' }} />
        <ParticleGrid />
        <FloatingOrb className="-top-40 right-1/4" color="#1C96BF" size="500px" delay={0} />
        <FloatingOrb className="bottom-0 right-0"  color="#0ea5e9" size="300px" delay={3} />

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
            <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.25em]">Trade Finance · Working Capital</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-clash font-semibold text-white leading-[1.05] mb-7 max-w-3xl"
            style={{ fontSize: 'clamp(26px, 3.8vw, 52px)' }}
          >
            Supply Chain Finance{' '}
            <span className="text-gradient">Solutions</span>
            <br />
            Built for Every Link.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-300 text-md leading-relaxed mb-10 max-w-xl"
          >
            Tradeflink connects buyers and suppliers through a buyer-led early-payment
            programme .so suppliers get paid in days and buyers optimise their working
            capital without taking on new debt.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-5"
          >
            <Link to="/contact" className="btn-brand text-xs px-8 py-3.5">
              Get Started Today <ArrowRight size={15} />
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
            {[['Fast', 'Supplier Funding'], ['Global', 'Countries'], ['Clean', 'Off-Balance-Sheet'], ['Zero', 'Supplier Risk']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-white">{v}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.22em] mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

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

      {/* ════════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0a7c74 0%,#1C96BF 40%,#0ea5e9 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 divide-x divide-white/15">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label} value={s.value} suffix={s.suffix}
                prefix={s.prefix} text={s.text} label={s.label} sublabel={s.sublabel} index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT IS SCF
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
                Pay your suppliers early.{' '}
                <span className="text-gradient">Keep your cash.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-5 text-lg">
                Supply chain finance flips the traditional model: instead of suppliers
                chasing buyers for payment, the buyer's approved invoices become the
                key that unlocks early liquidity for every supplier in the chain,
                without costing the buyer anything extra.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-8">
                Tradeflink acts as the financial intermediary, funding suppliers immediately
                on buyer-approved invoices, then collecting from the buyer on the original
                due date. The result is a healthier supply chain for everyone.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  'Suppliers funded quickly after buyer approval',
                  'Buyers pay on original terms, no change to their cash cycle',
                  'Fully off-balance-sheet for suppliers, not a loan',
                  'Onboard your entire supplier base in one programme',
                  'Coverage across many countries and all major currencies',
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
                  alt="Supply chain finance for global trade"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.7) 0%, transparent 50%)' }} />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -right-5 -bottom-5 glass rounded-2xl shadow-2xl p-5 max-w-45 border border-white/10"
              >
                <p className="text-3xl font-black text-white">Fast</p>
                <p className="text-[10px] text-teal-400/80 uppercase tracking-[0.2em] mt-1 font-bold">Supplier Funded</p>
              </motion.div>

              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute top-6 left-6 glass rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <ShieldCheck size={18} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">Zero Supplier Risk</p>
                  <p className="text-white/40 text-[10px]">Buyer-backed programme</p>
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
        <FloatingOrb className="bottom-0 left-1/4" color="#0ea5e9" size="300px" delay={3} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-16"
          >
            <Eyebrow dark>The Process</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              How supply chain finance{' '}
              <span className="text-gradient">actually works</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Simple steps from invoice approval to supplier payment, seamless for every party.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px origin-left"
              style={{ background: 'linear-gradient(to right, #1C96BF, #0ea5e9, #a78bfa)' }}
            />

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
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: step.color, filter: 'blur(16px)', transform: 'scale(0.8)' }}
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
                { label: 'Buyer', sub: 'Approves invoices on platform', color: '#1C96BF' },
                { label: 'Tradeflink', sub: 'Funds supplier quickly', color: '#0ea5e9', highlight: true },
                { label: 'Supplier', sub: 'Receives early payment, stress-free', color: '#a78bfa' },
              ].map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className={`rounded-2xl p-6 ${node.highlight ? 'border-2' : 'border border-white/10'}`}
                    style={node.highlight ? { borderColor: node.color, background: `${node.color}15` } : { background: 'rgba(255,255,255,0.04)' }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${node.color}20` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: node.color }} />
                    </div>
                    <p className="text-white font-black text-lg">{node.label}</p>
                    <p className="text-white/40 text-xs mt-1">{node.sub}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden lg:flex items-center justify-center -mx-4">
                      <ArrowRight size={20} className="text-teal-500" />
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
              alt="Supply chain operations"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(6,15,30,0.85) 0%, rgba(6,15,30,0.3) 50%, transparent 100%)' }} />
            <div className="absolute inset-0 flex items-center px-10 lg:px-16">
              <div className="max-w-sm">
                <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">The Result</p>
                <p className="text-white text-2xl lg:text-3xl font-black leading-snug">
                  Suppliers funded{' '}
                  <span className="text-gradient">fast</span>
                  {' '}buyers pay on their original schedule.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CORE FEATURES, 3 cards
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
              A complete programme,{' '}
              <span className="text-gradient">end-to-end</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Tradeflink's supply chain finance platform is built to be flexible, transparent, and effortless for both buyers and suppliers.
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
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${f.light} 0%, rgba(255,255,255,0) 100%)` }}
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
                <div className="w-8 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                  style={{ background: f.accent }} />
                <h3 className="text-xl font-black text-[#0f172a] mb-3">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          KEY BENEFITS, image + benefit list
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
              <span className="text-gradient">every party</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Tradeflink's SCF programme creates a genuine win-win, buyers preserve cash, suppliers access liquidity, and supply chains become resilient.
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
                  alt="Supply chain finance benefits"
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
                <p className="text-3xl font-black text-[#0f172a]">Extended</p>
                <p className="text-[10px] text-teal-600 uppercase tracking-[0.2em] mt-1 font-bold">Wait time eliminated</p>
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
              Built for every player in{' '}
              <span className="text-gradient">the supply chain</span>
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
      <section className="relative h-[440px] lg:h-[520px] overflow-hidden">
        <img
          src={img5}
          alt="Global supply chain finance operations"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(5,13,24,0.92) 0%, rgba(5,13,24,0.6) 50%, rgba(5,13,24,0.75) 100%)' }} />
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
                  Trusted by supply chains across{' '}
                  <span className="text-gradient">many countries</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-300 text-lg leading-relaxed">
                  From anchor corporates to SME suppliers, Tradeflink's platform is
                  transforming how working capital flows through global supply chains,
                  one approved invoice at a time.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }} variants={stagger}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { val: 'Active',  label: 'Trade Financed',    sub: 'Since inception' },
                  { val: 'Growing', label: 'Supply Chains',     sub: 'Fully onboarded' },
                  { val: 'Fast',    label: 'Avg Supplier Pay',  sub: 'Fast settlement' },
                  { val: 'Zero',    label: 'Supplier Risk',     sub: 'Fully absorbed' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label} custom={i} variants={scaleIn}
                    className="glass rounded-2xl p-5 border border-white/10 text-center"
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
              Supply chains that{' '}
              <span className="text-gradient">transformed</span>
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
              Clear answers to the most common questions about supply chain finance with Tradeflink.
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
          src={img6}
          alt="Global supply chain"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #050d18 0%, rgba(5,13,24,0.55) 50%, #050d18 100%)' }} />
        <ParticleGrid />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          <div className="w-225 h-225 rounded-full border border-teal-500/6" />
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
              Launch Your Programme Today
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(26px, 3.5vw, 50px)', fontWeight: 900 }}
            >
              A stronger supply chain{' '}
              <span className="text-gradient">starts here.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-400 text-xl max-w-lg mx-auto mb-12 leading-relaxed">
              Join hundreds of buyers and suppliers who use Tradeflink to unlock
              working capital, build trust, and grow without limits.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" className="btn-brand text-sm px-12 py-4">
                Start Your Programme <ArrowRight size={16} />
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
                { Icon: ShieldCheck, label: 'Buyer-Backed Security' },
                { Icon: Lock,        label: 'KYC / AML Compliant' },
                { Icon: Globe,       label: 'Global Reach' },
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
