import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Eye, Lightbulb, Heart, Rocket,
  Globe, Link2, Building2, ShieldCheck, Zap,
  Star, MapPin,
} from 'lucide-react';

// ── Images ───────────────────────────────────────────────────────────
import missionImg from '../../assets/images/mission.jpg';
import visionImg  from '../../assets/images/vision.jpg';
import about1     from '../../assets/images/about1.jpg';
import about2     from '../../assets/images/about2.jpg';
import about3     from '../../assets/images/about3.jpg';
import about4     from '../../assets/images/about4.jpg';
import about5     from '../../assets/images/about5.jpg';

// ── Animated counter ─────────────────────────────────────────────────
function useCounter(target, duration = 1800, start = false) {
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

// ── Animation variants ────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// ── Data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: 70,  suffix: '+', label: 'Countries' },
  { value: 500, suffix: '+', label: 'SMEs Served' },
  { value: 6,   suffix: '',  label: 'Global Offices' },
  { value: 98,  suffix: '%', label: 'Satisfaction' },
];

const MILESTONES = [
  { year: '2019', title: 'The Idea',          desc: 'Founded in Dubai with a single mission — remove the payment barriers holding back global SMEs.' },
  { year: '2020', title: 'First 100 Clients', desc: 'Onboarded our first 100 businesses across India, UAE, and Bangladesh within 12 months of launch.' },
  { year: '2021', title: 'Global Expansion',  desc: 'Opened offices in London, Istanbul, and Delaware. Crossed $500M in trade facilitated.' },
  { year: '2022', title: '70+ Countries',     desc: 'Our network grew to 70+ countries, connecting exporters, importers, and investors worldwide.' },
  { year: '2023', title: 'Platform 2.0',      desc: 'Launched real-time analytics dashboard, AI-powered risk scoring, and instant invoice financing.' },
  { year: '2024', title: 'Series B & Beyond', desc: 'Raised Series B to accelerate technology investment and expand into Southeast Asia and Africa.' },
];

const VALUES = [
  {
    Icon: Eye,
    title: 'Transparency',
    desc: 'Every transaction, every rate, every term — visible and verifiable. Trust is built through radical openness.',
    accent: '#0d9488',
    light: 'rgba(13,148,136,0.08)',
  },
  {
    Icon: Lightbulb,
    title: 'Innovation',
    desc: 'We constantly reimagine trade finance — leveraging real-time data and technology to create solutions that never existed before.',
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.08)',
  },
  {
    Icon: Heart,
    title: 'Empathy',
    desc: 'Behind every invoice is an entrepreneur with a dream. We design with their struggles and aspirations at the center.',
    accent: '#f43f5e',
    light: 'rgba(244,63,94,0.08)',
  },
  {
    Icon: Rocket,
    title: 'Empowerment',
    desc: "We don't just provide liquidity — we unlock potential. Every business we serve grows stronger and competes globally.",
    accent: '#f59e0b',
    light: 'rgba(245,158,11,0.08)',
  },
];

const BENTO = [
  {
    Icon: Zap,
    title: 'Real-time Invoice Financing',
    desc: 'Convert unpaid invoices into working capital in as little as 48 hours. No waiting, no uncertainty.',
    bg: about3,
    overlay: 'linear-gradient(135deg,rgba(6,15,30,0.88) 0%,rgba(13,42,42,0.80) 100%)',
    span: 'lg:col-span-2',
    large: true,
    badge: 'Flagship',
  },
  {
    Icon: Link2,
    title: 'Supply Chain Liquidity',
    desc: 'Keep your supply chain flowing with flexible financing solutions.',
    bg: about4,
    overlay: 'linear-gradient(135deg,rgba(12,30,60,0.88) 0%,rgba(10,32,64,0.82) 100%)',
    span: '',
    large: true,
  },
  {
    Icon: Globe,
    title: 'Cross-border Partnerships',
    desc: 'Connect with verified investors and partners in 70+ countries.',
    bg: null,
    light: true,
  },
  {
    Icon: Building2,
    title: 'SME-First Platform',
    desc: 'Designed from the ground up for the needs of small and medium enterprises.',
    bg: null,
    light: true,
  },
  {
    Icon: ShieldCheck,
    title: 'Risk Intelligence',
    desc: 'AI-powered risk scoring to protect every transaction end to end.',
    bg: null,
    dark: true,
  },
];


const OFFICES = [
  { city: 'Dubai',    country: 'UAE',    flag: '🇦🇪', role: 'MENA HQ' },
  { city: 'Delhi',    country: 'India',  flag: '🇮🇳', role: 'South Asia Hub' },
  { city: 'Kolkata',  country: 'India',  flag: '🇮🇳', role: 'Operations' },
  { city: 'Delaware', country: 'USA',    flag: '🇺🇸', role: 'Americas' },
  { city: 'London',   country: 'UK',     flag: '🇬🇧', role: 'Europe' },
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', role: 'EMEA Bridge' },
];

const TESTIMONIALS = [
  { quote: 'Tradeflink transformed how we operate. Our payment cycles accelerated dramatically, giving us the capital to expand into markets we never thought possible.', name: 'Aisha Rahman', role: 'Textile Exporter',  location: 'Bangladesh', flag: '🇧🇩', initials: 'AR', gradient: 'from-teal-500 to-teal-600'   },
  { quote: 'The supply chain financing changed everything. Better supplier relationships, improved cash flow — we doubled our import volume within a year.',             name: 'Omar Khalid',  role: 'FMCG Importer',    location: 'UAE',        flag: '🇦🇪', initials: 'OK', gradient: 'from-sky-500 to-sky-600'    },
  { quote: 'Finally a platform built for businesses like ours. Fast, transparent, and the team actually understands the challenges of cross-border trade.',              name: 'Priya Nair',   role: 'Pharma Exporter',  location: 'India',      flag: '🇮🇳', initials: 'PN', gradient: 'from-indigo-500 to-indigo-600' },
];

// ── Sub-components ────────────────────────────────────────────────────
function StatBlock({ value, suffix = '', label, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count  = useCounter(value, 1800, inView);
  return (
    <motion.div ref={ref} custom={index} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
      className="text-center">
      <div className="text-5xl lg:text-6xl font-black text-white tabular-nums leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="text-teal-200/70 text-[10px] font-bold uppercase tracking-[0.25em]">{label}</div>
    </motion.div>
  );
}

function ImgSlot({ src, alt, className = '' }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={`flex items-center justify-center text-white/10 text-xs uppercase tracking-widest font-bold ${className}`}
        style={{ background: 'linear-gradient(135deg,#0d1f1f 0%,#0c1a2e 100%)' }}>
        {alt}
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErr(true)} className={`object-cover ${className}`} />;
}

// ── Section eyebrow ───────────────────────────────────────────────────
function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-5">
      <span className={`w-8 h-px ${light ? 'bg-teal-500' : 'bg-teal-500'}`} />
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${light ? 'text-teal-600' : 'text-teal-400'}`}>
        {children}
      </span>
      <span className="w-8 h-px bg-teal-500" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden bg-[#050d18]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.15]"
            style={{ background: 'radial-gradient(circle,#0d9488 0%,transparent 65%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.10]"
            style={{ background: 'radial-gradient(circle,#0ea5e9 0%,transparent 65%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
              backgroundSize: '48px 48px',
            }} />
        </div>

        {/* Left copy */}
        <div className="relative z-10 flex items-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 py-40 lg:py-32">
          <div className="max-w-lg">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-8">
              <span className="w-8 h-px bg-teal-500" />
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">Who We Are</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-white leading-[1.0] mb-7"
              style={{ fontSize: 'clamp(40px,6vw,80px)' }}>
              Bridging the Gap<br />
              in <span className="text-gradient">Global Trade</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-400 text-lg leading-relaxed mb-10">
              We were built on one belief — no good business should struggle because of delayed payments.
              Tradeflink connects exporters, importers, and investors across{' '}
              <span className="text-teal-400 font-semibold">70+ countries</span>.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3">
              <Link to="/" className="btn-brand text-xs px-7 py-3.5">
                Explore Platform
                <ArrowRight size={16} />
              </Link>
              <a href="#story"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/70 text-xs font-bold uppercase tracking-wider hover:border-white/35 hover:text-white transition-all duration-200">
                Our Story
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
              className="flex gap-8 mt-14 pt-10 border-t border-white/8">
              {[['70+','Countries'], ['500+','SMEs'], ['6','Offices']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{v}</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.25em] mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right image */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]">
          <ImgSlot src={about1} alt="Global Trade Network" className="w-full h-full" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #050d18 0%, transparent 25%, transparent 85%, #050d18 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #050d18 0%, transparent 15%, transparent 85%, #050d18 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-16 left-10 glass rounded-2xl p-5 max-w-[200px]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-3">
              <Globe size={16} className="text-white" />
            </div>
            <p className="text-white text-xs font-bold leading-snug">Global trade finance, made accessible</p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-teal-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0a7c74 0%,#0d9488 40%,#0ea5e9 100%)' }}>
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-white/15">
            {STATS.map((s, i) => (
              <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════════════════ */}
      <section id="story" className="section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp} className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <ImgSlot src={about2} alt="Our Story" className="w-full h-full" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,13,24,0.5) 0%, transparent 60%)' }} />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-6 -bottom-6 bg-white rounded-2xl shadow-2xl p-5 max-w-[180px] border border-gray-100">
                <p className="text-3xl font-black text-[#0f172a]">$2B+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1 font-bold">Trade Facilitated</p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              variants={stagger} className="order-1 lg:order-2">
              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-px bg-teal-500" />
                <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.3em]">How We Started</span>
              </motion.div>
              <motion.h2 variants={fadeUp}
                className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-6">
                Built to solve a <span className="text-gradient">real problem</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed mb-4">
                Tradeflink was established to address one of the most persistent challenges in
                international commerce — payment delays that quietly cripple the growth of small
                and medium enterprises.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-8">
                Traditional financial institutions have long excluded smaller players from the
                trade finance ecosystem. We set out to change that — creating a platform where
                every entrepreneur, regardless of geography or size, can access the capital they
                need to compete globally.
              </motion.p>
              <motion.blockquote variants={fadeUp}
                className="border-l-4 border-teal-500 pl-6 py-3 bg-teal-50 rounded-r-2xl pr-5">
                <p className="text-xl font-bold text-[#0f172a] italic leading-snug">
                  "No good business should struggle because of delayed payments."
                </p>
                <p className="text-xs text-slate-400 mt-2 font-semibold">— Tradeflink Founding Principle</p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BENTO GRID
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-14">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight">
              Everything you need to<br />
              <span className="text-gradient">trade without limits</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {BENTO.map((card, i) => {
              if (card.bg) {
                return (
                  <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -5 }}
                    className={`relative rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-end p-8 cursor-default ${card.span}`}>
                    <img src={card.bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: card.overlay }} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-4">
                        <card.Icon size={card.large ? 24 : 20} className="text-teal-300" />
                      </div>
                      <h3 className={`font-black text-white mb-2 ${card.large ? 'text-2xl' : 'text-xl'}`}>{card.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-md">{card.desc}</p>
                    </div>
                    {card.badge && (
                      <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30">
                        <span className="text-teal-300 text-[10px] font-bold uppercase tracking-widest">{card.badge}</span>
                      </div>
                    )}
                  </motion.div>
                );
              }
              return (
                <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -5 }}
                  className={`relative rounded-3xl overflow-hidden min-h-[200px] flex flex-col justify-end p-7 cursor-default ${card.dark ? 'bg-[#060f1e]' : 'bg-white border border-gray-100'}`}>
                  {card.dark && <div className="absolute inset-0 bg-dots opacity-20" />}
                  <div className="absolute top-6 left-7">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${card.dark ? 'bg-white/8 border border-white/10' : 'bg-slate-50 border border-gray-100'}`}>
                      <card.Icon size={20} className={card.dark ? 'text-teal-400' : 'text-teal-600'} />
                    </div>
                  </div>
                  <div className="relative z-10 mt-14">
                    <h3 className={`text-lg font-black mb-1.5 ${card.dark ? 'text-white' : 'text-[#0f172a]'}`}>{card.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

        <div className="container-xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-14">
            <Eyebrow>Our Direction</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Purpose-driven from day <span className="text-gradient">one</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                img: visionImg, alt: 'Vision', badgeColor: 'teal',
                Icon: Eye,
                text: 'To make global trade accessible and sustainable for every business, regardless of size or geography.',
                label: 'Vision',
              },
              {
                img: missionImg, alt: 'Mission', badgeColor: 'sky',
                Icon: Zap,
                text: 'To democratize trade finance by connecting SMEs with real-time financing, supply chain solutions, and cross-border investor networks.',
                label: 'Mission',
              },
            ].map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-60px' }} variants={fadeUp} whileHover={{ y: -6 }}
                className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col justify-end p-8 cursor-default group">
                <ImgSlot src={item.img} alt={item.alt}
                  className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(6,15,30,0.96) 0%, rgba(6,15,30,0.5) 50%, transparent 100%)' }} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5
                    ${item.badgeColor === 'teal'
                      ? 'bg-teal-500/20 border border-teal-500/30'
                      : 'bg-sky-500/20 border border-sky-500/30'}`}>
                    <item.Icon size={15} className={item.badgeColor === 'teal' ? 'text-teal-400' : 'text-sky-400'} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.badgeColor === 'teal' ? 'text-teal-300' : 'text-sky-300'}`}>
                      {item.label}
                    </span>
                  </div>
                  <p className="text-white text-xl font-bold leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CORE VALUES
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-14">
            <Eyebrow light>Our DNA</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight">
              Values that drive<br />everything we <span className="text-gradient">build</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} custom={i} variants={fadeUp} whileHover={{ y: -8 }}
                className="group relative p-7 rounded-3xl border border-gray-100 bg-white cursor-default overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-transparent">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${v.light} 0%, rgba(255,255,255,0) 100%)` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: v.light }}>
                    <v.Icon size={22} style={{ color: v.accent }} />
                  </div>
                  <div className="w-8 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-14"
                    style={{ background: v.accent }} />
                  <h3 className="text-lg font-black text-[#0f172a] mb-3">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MILESTONES TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-16">
            <Eyebrow light>Our Journey</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight">
              From idea to <span className="text-gradient">global platform</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-sky-400 to-transparent -translate-x-1/2" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              variants={stagger} className="space-y-10">
              {MILESTONES.map((m, i) => (
                <motion.div key={m.year} custom={i} variants={fadeUp}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div whileHover={{ y: -4 }}
                      className="inline-block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm text-left">
                      <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.25em] mb-2">{m.year}</p>
                      <h4 className="text-lg font-black text-[#0f172a] mb-2">{m.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-sky-500 shadow-lg flex-shrink-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 hidden lg:flex">
                    <p className={`text-5xl font-black opacity-10 text-[#0f172a] ${i % 2 === 0 ? 'text-left' : 'text-right w-full'}`}>
                      {m.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GLOBAL PRESENCE
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-14">
            <Eyebrow light>Where We Operate</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight">
              A global network,<br />a local <span className="text-gradient">touch</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Six strategic offices spanning four continents.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICES.map((o, i) => (
              <motion.div key={o.city} custom={i} variants={fadeUp} whileHover={{ y: -5 }}
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 cursor-default
                           transition-all duration-300 hover:border-teal-200 hover:shadow-xl">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{o.flag}</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-lg font-black text-[#0f172a]">{o.city}</h4>
                    <span className="text-xs text-slate-400 font-medium">{o.country}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-teal-600" />
                    <p className="text-[10px] text-teal-600 font-black uppercase tracking-[0.18em]">{o.role}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-200 group-hover:text-teal-400 transition-colors duration-300 ml-auto flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#0d9488 0%,transparent 70%)' }} />

        <div className="container-xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} className="text-center mb-14">
            <Eyebrow>Real Stories</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Businesses that trust <span className="text-gradient">Tradeflink</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={stagger} className="grid lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} custom={i} variants={fadeUp} whileHover={{ y: -6 }}
                className="glass rounded-3xl p-7 relative overflow-hidden cursor-default group">
                <div className="absolute -top-4 -right-2 text-[120px] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(13,148,136,0.07)' }}>
                  &ldquo;
                </div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/85 text-sm leading-relaxed mb-7 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-[10px] mt-0.5">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 text-white/50 text-[10px] font-semibold">
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
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-[#060f1e]">
        <img src={about5} alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #060f1e 0%, rgba(6,15,30,0.7) 50%, #060f1e 100%)' }} />
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

        <div className="container-xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Join Tradeflink
            </motion.div>

            <motion.h2 variants={fadeUp}
              className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
              Ready to transform<br />your trade finance?
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-slate-400 text-xl max-w-lg mx-auto mb-12 leading-relaxed">
              Join hundreds of SMEs across 70+ countries who've unlocked new growth with Tradeflink.
            </motion.p>

            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="btn-brand text-sm px-10 py-4">
                Get Started Today
                <ArrowRight size={16} />
              </Link>
              <a href="mailto:info@tradeflink.com"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-200">
                Talk to Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
