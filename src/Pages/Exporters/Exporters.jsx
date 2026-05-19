import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import exporterBanner from '../../assets/images/exporterbanner.jpg';
import exporter1 from '../../assets/images/exporter1.jpg';
import exporter2 from '../../assets/images/exporter2.jpg';
import exporter3 from '../../assets/images/exporter3.jpg';
import exporter4 from '../../assets/images/exporter4.jpg';
import {
  ArrowRight, Zap, Shield, TrendingUp, Globe, CheckCircle2,
  Package, FileText, Banknote, RefreshCcw, Star, ChevronDown,
  BarChart3, Clock, Lock, Layers, Sparkles, ArrowUpRight, Play,
} from 'lucide-react';

/* ─────────────────── Data ──────────────────────────────────────── */
const STATS = [
  { value: 90,  suffix: '%', label: 'Invoice Advance Rate',    icon: Banknote, color: '#1C96BF' },
  { value: 3,   suffix: 'd', label: 'Average Days to Funding', icon: Clock,    color: '#2dd4bf' },
  { value: 50,  suffix: '+', label: 'Countries Supported',     icon: Globe,    color: '#a78bfa' },
  { value: 100, suffix: '%', label: 'Non-Recourse Protection', icon: Shield,   color: '#f59e0b' },
];

const STEPS = [
  { icon: Package,    num: '01', title: 'Ship & Invoice',         desc: 'Export your goods and raise an invoice against your overseas buyer as you normally would.' },
  { icon: FileText,   num: '02', title: 'Submit on Platform',     desc: 'Upload your invoice and supporting trade documents directly on the TradeFlink platform in minutes.' },
  { icon: Banknote,   num: '03', title: 'Receive Up to 90%',      desc: 'Get up to 90% of your invoice value advanced to your account within days — not months.' },
  { icon: RefreshCcw, num: '04', title: 'Buyer Pays at Maturity', desc: 'Your buyer settles the invoice directly with TradeFlink on the agreed due date. No chasing required.' },
];

const BENEFITS = [
  { icon: Zap,        title: 'Shorter Cash Cycle',      desc: 'Dramatically reduce Days Sales Outstanding and reinvest capital into production and new orders immediately.', color: '#f59e0b' },
  { icon: TrendingUp, title: 'Continuous Production',   desc: 'Keep factories running and fulfil larger purchase orders without waiting for buyer payment cycles.',           color: '#1C96BF' },
  { icon: Shield,     title: 'Non-Recourse Protection', desc: 'Client non-payment risk is transferred to TradeFlink. Your receivables are insured — you keep the advance.',  color: '#2dd4bf' },
  { icon: Lock,       title: 'No Collateral Required',  desc: 'Your invoice is the collateral. No property, no guarantees, no long-winded bank approvals.',                  color: '#a78bfa' },
  { icon: Globe,      title: 'Global Buyer Network',    desc: 'Finance receivables from buyers in over 50 countries across Asia, Europe, the Middle East, and Africa.',      color: '#ec4899' },
  { icon: BarChart3,  title: 'Real-Time Dashboard',     desc: 'Track every invoice, advance, and repayment in one transparent, real-time platform built for exporters.',     color: '#10b981' },
];


const TESTIMONIALS = [
  { name: 'Aisha Rahman', role: 'Textile Exporter, Bangladesh', avatar: 'AR', color: '#1C96BF',
    quote: 'Before TradeFlink, we waited months to receive payments from our overseas buyers. Now, we get paid within days. That stability has allowed us to take on bigger orders and grow our team.', stars: 5 },
  { name: 'Omar Khalid',  role: 'FMCG Importer, UAE',          avatar: 'OK', color: '#2dd4bf',
    quote: "We used to struggle with paying our suppliers on time. TradeFlink's supply chain finance changed everything — our partners trust us more, and we've doubled our import volume.", stars: 5 },
];

const MARQUEE_ITEMS = [
  'Up to 90% Advance','Non-Recourse Protection','Funded Within Days',
  'No Collateral','50+ Countries','Real-Time Dashboard',
  'Zero Hidden Fees','Insured Receivables','Digital-First Platform',
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: Math.random() * 100,
  size: 2 + Math.random() * 3,
  dur: 8 + Math.random() * 10,
  delay: Math.random() * 8,
  opacity: 0.15 + Math.random() * 0.25,
}));

/* ─────────────────── Variants ──────────────────────────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };
const fadeLeft= { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } };
const stagger = (d=0) => ({ hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:d } } });

/* ─────────────────── Counter ───────────────────────────────────── */
function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 55);
    const id = setInterval(() => { n = Math.min(n + step, to); setVal(n); if (n >= to) clearInterval(id); }, 18);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────── Tilt card ─────────────────────────────────── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 22 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22 });
  const mx = useMotionValue(0), my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(160px circle at ${mx}px ${my}px, rgba(28,150,191,0.07), transparent 80%)`;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set(((e.clientY - r.top  - r.height/2) / r.height) * -10);
    ry.set(((e.clientX - r.left - r.width /2) / r.width)  *  10);
    mx.set(e.clientX - r.left); my.set(e.clientY - r.top);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, ...style }} className={className}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit] z-10" style={{ background: bg }} />
      {children}
    </motion.div>
  );
}

/* ─────────────────── Shimmer line ──────────────────────────────── */
function ShimmerLine() {
  return (
    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.5),rgba(45,212,191,0.4),transparent)' }}
    >
      <motion.div className="absolute inset-y-0 w-32 blur-sm"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)' }}
        animate={{ x:['-10%','110%'] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut', repeatDelay:2.5 }}
      />
    </div>
  );
}

/* ─────────────────── Benefit card ──────────────────────────────── */
function BenefitCard({ icon: Icon, title, desc, color, idx }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 25 });
  const sry = useSpring(ry, { stiffness: 300, damping: 25 });
  const mx = useMotionValue(0), my = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, ${color}18, transparent 80%)`;
  const [hov, setHov] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;
    const b = ref.current.getBoundingClientRect();
    rx.set(((e.clientY - b.top  - b.height / 2) / b.height) * -14);
    ry.set(((e.clientX - b.left - b.width  / 2) / b.width)  *  14);
    mx.set(e.clientX - b.left);
    my.set(e.clientY - b.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); setHov(false); }}
      onMouseEnter={() => setHov(true)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      variants={fadeUp}
      className="relative h-full"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border bg-white p-7 h-full flex flex-col cursor-default"
        animate={{
          borderColor: hov ? `${color}55` : 'rgba(226,232,240,1)',
          boxShadow: hov
            ? `0 0 0 1px ${color}22, 0 28px 72px ${color}18, 0 8px 24px rgba(0,0,0,0.07)`
            : '0 1px 6px rgba(0,0,0,0.05)',
          y: hov ? -12 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cursor spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 z-10 rounded-2xl" style={{ background: spot }} />

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.75) 50%,transparent 70%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3.5 + idx * 0.5 }}
        />

        {/* Background color flood on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}08 0%, transparent 70%)` }}
        />

        {/* Top animated line */}
        <div className="absolute top-0 inset-x-0 h-px overflow-hidden">
          <motion.div className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            animate={{ opacity: hov ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div className="absolute inset-y-0 w-20 blur-sm"
            style={{ background: `linear-gradient(90deg, transparent, ${color}dd, transparent)` }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: hov ? 1.0 : 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: hov ? 0.2 : 2 }}
          />
        </div>

        {/* Icon area */}
        <div className="relative mb-6 z-20" style={{ width: 56, height: 56 }}>
          {/* Pulse rings */}
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1.5px solid ${color}` }}
            animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
            transition={{ duration: 2.2 + idx * 0.25, repeat: Infinity, ease: 'easeOut', delay: idx * 0.4 }}
          />
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1px solid ${color}` }}
            animate={{ scale: [1, 1.4], opacity: [0.25, 0] }}
            transition={{ duration: 2.2 + idx * 0.25, repeat: Infinity, ease: 'easeOut', delay: idx * 0.4 + 0.7 }}
          />

          {/* Orbiting dot (visible on hover) */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 0, height: 0, pointerEvents: 'none' }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                style={{ position: 'absolute', width: 7, height: 7, borderRadius: '50%', background: color, top: -32, left: -3.5 }}
                animate={{ opacity: hov ? 0.9 : 0, scale: hov ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Icon box */}
          <motion.div
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden"
            style={{ background: `${color}10`, border: `1.5px solid ${color}30` }}
            animate={hov ? { scale: 1.06, borderColor: `${color}60` } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={hov
                ? { rotate: [0, -10, 10, 0], scale: [1, 1.12, 1] }
                : { y: [0, -3, 0] }
              }
              transition={{ duration: hov ? 0.55 : 3.5 + idx * 0.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
            >
              <Icon size={22} style={{ color }} />
            </motion.div>
            {/* Inner glow burst on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle, ${color}30 0%, transparent 70%)` }}
              animate={{ opacity: hov ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          className="text-[16px] font-extrabold mb-3 z-20 relative leading-snug"
          animate={{ color: hov ? color : '#1e293b' }}
          transition={{ duration: 0.35 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-[13px] text-slate-500 leading-relaxed flex-1 z-20 relative">{desc}</p>

        {/* Bottom accent */}
        <div className="mt-6 z-20 relative">
          <motion.div
            className="h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}25)`, originX: 0 }}
            animate={{ scaleX: hov ? 1 : 0.18, opacity: hov ? 1 : 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="flex items-center gap-1.5 mt-2.5 text-[11px] font-bold"
            style={{ color }}
            animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
            transition={{ duration: 0.3, delay: hov ? 0.08 : 0 }}
          >
            Learn more <ArrowRight size={10} />
          </motion.div>
        </div>

        {/* Corner glow */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-48 h-48 pointer-events-none rounded-full"
          style={{ background: `radial-gradient(circle, ${color}18, transparent 70%)` }}
          animate={{ opacity: hov ? 1 : 0.25, scale: hov ? 1.2 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Bottom right pulsing dot */}
        <motion.div
          className="absolute bottom-5 right-5 pointer-events-none"
          style={{ width: 6, height: 6, borderRadius: '50%', background: color }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.2 + idx * 0.3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.25 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── Section label ─────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
      <motion.span className="h-1.5 w-1.5 rounded-full bg-teal-500"
        animate={{ scale:[1,1.8,1], opacity:[1,0.4,1] }} transition={{ duration:1.8, repeat:Infinity }}
      />
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-teal-500">{text}</p>
      <motion.span className="h-1.5 w-1.5 rounded-full bg-teal-500"
        animate={{ scale:[1,1.8,1], opacity:[1,0.4,1] }} transition={{ duration:1.8, repeat:Infinity, delay:0.9 }}
      />
    </motion.div>
  );
}

/* ═══════════════════ PAGE ══════════════════════════════════════ */
export default function Exporters() {
  const statsRef    = useRef(null);
  const stepsRef    = useRef(null);
  const benefitRef  = useRef(null);
  const servicesRef = useRef(null);
  const testRef     = useRef(null);
  const ctaRef      = useRef(null);

  const statsInView    = useInView(statsRef,    { once:true, margin:'-80px' });
  const stepsInView    = useInView(stepsRef,    { once:true, margin:'-80px' });
  const benefitInView  = useInView(benefitRef,  { once:true, margin:'-80px' });
  const servicesInView = useInView(servicesRef, { once:true, margin:'-80px' });
  const testInView     = useInView(testRef,     { once:true, margin:'-80px' });
  const ctaInView      = useInView(ctaRef,      { once:true, margin:'-80px' });

  const [activeStep, setActiveStep] = useState(0);
  const [activeTest,  setActiveTest]  = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s+1) % STEPS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveTest(s => (s+1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-white text-slate-800">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(160deg,rgba(2,6,18,0.75) 0%,rgba(4,12,30,0.62) 50%,rgba(2,8,22,0.78) 100%),url(${exporterBanner})`,
          backgroundSize:'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat',
        }}
      >
        {/* Scan line */}
        <motion.div className="absolute inset-x-0 h-px pointer-events-none z-10"
          style={{ background:'linear-gradient(90deg,transparent,rgba(28,150,191,0.6),rgba(45,212,191,0.5),transparent)' }}
          animate={{ top:['0%','100%'] }} transition={{ duration:6, repeat:Infinity, ease:'linear', repeatDelay:1 }}
        />

        {/* Rising particles */}
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute pointer-events-none rounded-full"
            style={{ width:p.size, height:p.size, left:`${p.x}%`, bottom:0, background: p.id%2 ? '#1C96BF':'#2dd4bf', opacity:p.opacity }}
            animate={{ y:[0,-700], opacity:[0,p.opacity,0] }}
            transition={{ duration:p.dur, repeat:Infinity, ease:'linear', delay:p.delay }}
          />
        ))}

        {/* Ambient orbs */}
        {[
          { w:600, top:-200, left:-200, color:'rgba(28,150,191,0.14)', dur:12 },
          { w:400, bottom:-120, right:-130, color:'rgba(45,212,191,0.10)', dur:14 },
          { w:260, top:'42%', left:'58%', color:'rgba(99,102,241,0.08)', dur:9 },
        ].map((o,i) => (
          <motion.div key={i} className="absolute pointer-events-none rounded-full"
            style={{ width:o.w, height:o.w, top:o.top, bottom:o.bottom, left:o.left, right:o.right,
              background:`radial-gradient(circle,${o.color} 0%,transparent 70%)` }}
            animate={{ scale:[1,1.2,1], opacity:[0.7,1,0.7] }}
            transition={{ duration:o.dur, repeat:Infinity, ease:'easeInOut', delay:i*2 }}
          />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity:0, y:20, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 mb-8 backdrop-blur-sm"
          >
            <motion.span className="h-2 w-2 rounded-full bg-teal-400"
              animate={{ scale:[1,1.8,1], opacity:[1,0.4,1] }} transition={{ duration:1.8, repeat:Infinity }}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Export Finance Platform</span>
            <motion.div animate={{ rotate:[0,15,-15,0], scale:[1,1.2,1] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
              <Sparkles size={11} className="text-teal-400/70" />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight text-white mb-6"
            initial="hidden" animate="show"
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.2 } } }}
          >
            {'Unlock Your Working Capital'.split(' ').map((w,i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]"
                variants={{ hidden:{ opacity:0, y:40, filter:'blur(8px)' }, show:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.65, ease:[0.22,1,0.36,1] } } }}
                style={i>=2 ? { backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' } : {}}
              >{w}</motion.span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7, duration:0.7, ease:[0.22,1,0.36,1] }}
            className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Get up to <span className="text-teal-300 font-bold">90% of invoice value</span> upfront on eligible export receivables and reinvest immediately in production and sales.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.9, duration:0.6, ease:[0.22,1,0.36,1] }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}>
              <Link to="/contact"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-400/30 no-underline"
                style={{ background:'linear-gradient(135deg,#1C96BF,#0ea5e9)' }}
              >
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.24) 50%,transparent 70%)' }}
                  animate={{ x:['-100%','150%'] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut', repeatDelay:2 }}
                />
                <span className="relative">Get Started</span>
                <motion.div animate={{ x:[0,4,0] }} transition={{ duration:1.2, repeat:Infinity, ease:'easeInOut' }}>
                  <ArrowRight size={15} className="relative" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
              <Link to="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white/80 backdrop-blur-sm hover:bg-white/20 transition-colors no-underline"
              >
                See Case Studies <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating chips */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {['Up to 90% advance','Funded in 3 days','No collateral','Non-recourse'].map((t,i) => (
              <motion.span key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold text-white/70 backdrop-blur-sm"
                animate={{ y:[0,-6,0] }}
                transition={{ duration:2.5+i*0.4, repeat:Infinity, ease:'easeInOut', delay:i*0.5 }}
              >
                <motion.div animate={{ scale:[1,1.4,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.4 }}>
                  <CheckCircle2 size={10} className="text-teal-400 shrink-0" />
                </motion.div>
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y:[0,8,0], opacity:[0.4,0.9,0.4] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll</span>
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="relative py-4 border-y border-slate-100 overflow-hidden bg-linear-to-r from-slate-50 via-white to-slate-50">
        <motion.div className="flex gap-12 whitespace-nowrap"
          animate={{ x:[0,'-50%'] }} transition={{ duration:20, repeat:Infinity, ease:'linear' }}
        >
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
            <span key={i} className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 shrink-0">
              <motion.span className="h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0"
                animate={{ scale:[1,1.6,1], opacity:[0.5,1,0.5] }} transition={{ duration:1.4, repeat:Infinity, delay:i*0.08 }}
              />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════ STATS ══════════════════ */}
      <section ref={statsRef} className="relative py-24 px-6 bg-white overflow-hidden">
        {/* Background shimmer sweep */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background:'linear-gradient(108deg,transparent 20%,rgba(28,150,191,0.03) 50%,transparent 80%)' }}
          animate={{ x:['-100%','150%'] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut', repeatDelay:4 }}
        />
        <div className="max-w-5xl mx-auto">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger(0)} initial="hidden" animate={statsInView ? 'show':'hidden'}
          >
            {STATS.map(({ value, suffix, label, icon:Icon, color }, idx) => (
              <motion.div key={label} variants={fadeUp}>
                <TiltCard className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-md shadow-slate-100/80 group">
                  {/* Continuous top shimmer */}
                  <ShimmerLine />
                  <div className="relative z-10">
                    <motion.div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border"
                      style={{ background:`${color}12`, borderColor:`${color}28` }}
                      animate={{ scale:[1,1.08,1], rotate:[0,4,-4,0] }}
                      transition={{ duration:3+idx*0.5, repeat:Infinity, ease:'easeInOut', delay:idx*0.4 }}
                    >
                      <Icon size={20} style={{ color }} />
                    </motion.div>
                    <div className="text-4xl font-black mb-1"
                      style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}
                    >
                      <Counter to={value} suffix={suffix} />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                  </div>
                  {/* Pulsing bottom glow */}
                  <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full pointer-events-none"
                    style={{ background:`linear-gradient(90deg,transparent,${color},transparent)` }}
                    animate={{ opacity:[0.3,0.9,0.3], scaleX:[0.5,1.2,0.5] }}
                    transition={{ duration:2.5+idx*0.3, repeat:Infinity, ease:'easeInOut', delay:idx*0.5 }}
                  />
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section ref={stepsRef} className="relative py-24 px-6 overflow-hidden"
        style={{ background:'linear-gradient(180deg,#f8fafc 0%,#f0f9ff 100%)' }}
      >
        {/* Animated background grid */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:'radial-gradient(rgba(28,150,191,0.06) 1px,transparent 1px)', backgroundSize:'40px 40px' }}
          animate={{ backgroundPosition:['0px 0px','40px 40px'] }}
          transition={{ duration:8, repeat:Infinity, ease:'linear' }}
        />

        <div className="max-w-5xl mx-auto relative">
          <motion.div className="text-center mb-16" variants={stagger(0)} initial="hidden" animate={stepsInView ? 'show':'hidden'}>
            <SectionLabel text="How It Works" />
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Four steps to <span style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>get funded</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              From shipment to cash in your account — fast, transparent, and fully digital.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Animated connecting line */}
            <div className="absolute top-10 left-0 right-0 h-px hidden lg:block"
              style={{ background:'linear-gradient(90deg,transparent,rgba(28,150,191,0.2),rgba(45,212,191,0.2),transparent)' }}
            >
              <motion.div className="absolute inset-y-0 w-24 blur-sm"
                style={{ background:'linear-gradient(90deg,transparent,rgba(28,150,191,0.8),transparent)' }}
                animate={{ x:['-20%','110%'] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatType:'reverse' }}
              />
            </div>

            {/* Moving dot along line */}
            <motion.div className="absolute top-9.5 hidden lg:block w-3 h-3 rounded-full border-2 border-teal-400 bg-white z-10"
              animate={{ left:['8%','88%'] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatType:'reverse' }}
            >
              <motion.div className="absolute inset-0.5 rounded-full bg-teal-400"
                animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ duration:1, repeat:Infinity }}
              />
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={stagger(0.1)} initial="hidden" animate={stepsInView ? 'show':'hidden'}
            >
              {STEPS.map(({ icon:Icon, num, title, desc }, i) => (
                <motion.div key={num} variants={fadeUp} className="relative cursor-pointer" onHoverStart={() => setActiveStep(i)}>
                  <motion.div className="relative overflow-hidden rounded-2xl border p-6 bg-white shadow-sm"
                    animate={{
                      borderColor: activeStep===i ? 'rgba(28,150,191,0.45)' : 'rgba(226,232,240,1)',
                      boxShadow:   activeStep===i ? '0 12px 40px rgba(28,150,191,0.14)' : '0 1px 4px rgba(0,0,0,0.05)',
                      y:           activeStep===i ? -8 : 0,
                    }}
                    transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <motion.div className="flex h-12 w-12 items-center justify-center rounded-xl border"
                        animate={{
                          borderColor: activeStep===i ? 'rgba(28,150,191,0.45)' : 'rgba(226,232,240,1)',
                          background:  activeStep===i ? 'rgba(28,150,191,0.1)' : '#f8fafc',
                          rotate:      activeStep===i ? [0,10,-10,0] : 0,
                        }}
                        transition={{ duration: activeStep===i ? 0.6 : 0.3 }}
                      >
                        <Icon size={20} className={activeStep===i ? 'text-teal-500':'text-slate-400'} />
                      </motion.div>
                      <motion.span className="text-4xl font-black text-slate-100"
                        animate={{ opacity: activeStep===i ? [0.08,0.18,0.08] : 0.08 }}
                        transition={{ duration:2, repeat:Infinity }}
                      >{num}</motion.span>
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-800 mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>

                    {/* Active top bar */}
                    <AnimatePresence>
                      {activeStep===i && (
                        <motion.div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                          style={{ background:'linear-gradient(90deg,#1C96BF,#2dd4bf)' }}
                          initial={{ scaleX:0 }} animate={{ scaleX:1 }} exit={{ scaleX:0 }}
                          transition={{ duration:0.4 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Shimmer on active */}
                    {activeStep===i && (
                      <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background:'linear-gradient(105deg,transparent 30%,rgba(28,150,191,0.04) 50%,transparent 70%)' }}
                        animate={{ x:['-100%','150%'] }} transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {STEPS.map((_,i) => (
              <motion.button key={i} onClick={() => setActiveStep(i)}
                className="rounded-full" style={{ height:8, border:'none', cursor:'pointer', padding:0 }}
                animate={{ width: activeStep===i ? 28:8, background: activeStep===i ? '#1C96BF':'#cbd5e1' }}
                transition={{ duration:0.35 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ BENEFITS ══════════════════ */}
      <section ref={benefitRef} className="relative py-28 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 55%,#f0f9ff 100%)' }}
      >
        {/* Soft orbs */}
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width:700, height:700, top:'10%', left:'-18%', background:'radial-gradient(circle,rgba(28,150,191,0.05) 0%,transparent 65%)' }}
          animate={{ scale:[1,1.18,1], x:[0,30,0] }} transition={{ duration:13, repeat:Infinity, ease:'easeInOut' }}
        />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width:500, height:500, bottom:'5%', right:'-12%', background:'radial-gradient(circle,rgba(45,212,191,0.05) 0%,transparent 65%)' }}
          animate={{ scale:[1,1.12,1], x:[0,-20,0] }} transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:3 }}
        />

        {/* Animated horizontal sweep lines */}
        {[12, 38, 62, 88].map((top, i) => (
          <motion.div key={i} className="absolute inset-x-0 h-px pointer-events-none"
            style={{ top:`${top}%`, background:'linear-gradient(90deg,transparent,rgba(28,150,191,0.07),rgba(45,212,191,0.05),transparent)' }}
            animate={{ x:['-100%','100%'] }}
            transition={{ duration:9+i*2, repeat:Infinity, ease:'linear', delay:i*1.8 }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative">
          <motion.div className="text-center mb-20" variants={stagger(0)} initial="hidden" animate={benefitInView ? 'show':'hidden'}>
            <SectionLabel text="Why TradeFlink" />
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-3">
              Built for <span style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>exporters</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Six reasons why thousands of exporters choose TradeFlink over traditional bank financing.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.1)} initial="hidden" animate={benefitInView ? 'show':'hidden'}
          >
            {BENEFITS.map(({ icon, title, desc, color }, idx) => (
              <motion.div key={title} variants={fadeUp} className="h-full">
                <BenefitCard icon={icon} title={title} desc={desc} color={color} idx={idx} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section ref={servicesRef} className="relative py-24 px-6 overflow-hidden"
        style={{ background:'linear-gradient(180deg,#f8fafc 0%,#f0f9ff 100%)' }}
      >
        {[0,1,2,3].map(i => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ width:1, top:0, bottom:0, left:`${20+i*20}%`, background:`linear-gradient(180deg,transparent,rgba(28,150,191,0.06),transparent)` }}
            animate={{ opacity:[0,1,0], scaleY:[0.2,1,0.2] }}
            transition={{ duration:4+i, repeat:Infinity, ease:'easeInOut', delay:i*0.9 }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative">
          <motion.div className="text-center mb-16" variants={stagger(0)} initial="hidden" animate={servicesInView ? 'show':'hidden'}>
            <SectionLabel text="Our Solutions" />
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              One platform, <span style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>every solution</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              TradeFlink provides flexible, transparent, and technology-driven trade finance solutions designed for the real world.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger(0.1)} initial="hidden" animate={servicesInView ? 'show':'hidden'}
          >
            {[
              { title:'Export Factoring',     desc:'Turn invoices into immediate working capital. Up to 90% advance within days.', icon:Banknote, accent:'#1C96BF', img:exporter1 },
              { title:'Supply Chain Finance', desc:'Optimise your supply chain from raw materials to finished goods with flexible finance.', icon:Layers,   accent:'#2dd4bf', img:exporter2 },
              { title:'Invoice Financing',    desc:'Unlock cash in unpaid invoices without new debt. Fast, flexible, fully digital.',        icon:FileText, accent:'#a78bfa', img:exporter3 },
              { title:'Open Account Trade',   desc:'Offer open account terms confidently. We manage the risk so you win more contracts.',    icon:Globe,    accent:'#f59e0b', img:exporter4 },
            ].map(({ title, desc, icon:Icon, accent, img }, idx) => (
              <motion.div key={title} variants={fadeUp}>
                <TiltCard className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden rounded-t-2xl shrink-0">
                    <motion.img src={img} alt={title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale:1.08 }}
                      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0"
                      style={{ background:`linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.52) 100%)` }}
                    />
                    {/* Icon badge */}
                    <motion.div
                      className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md"
                      animate={{ scale:[1,1.1,1], rotate:[0,5,-5,0] }}
                      transition={{ duration:3+idx*0.4, repeat:Infinity, ease:'easeInOut', delay:idx*0.5 }}
                    >
                      <Icon size={17} style={{ color:'white' }} />
                    </motion.div>
                    {/* Shimmer on image */}
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.12) 50%,transparent 70%)' }}
                      animate={{ x:['-100%','150%'] }}
                      transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatDelay:3+idx }}
                    />
                    {/* Accent top line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background:`linear-gradient(90deg,transparent,${accent},transparent)` }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[14px] font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      {title}
                      <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        animate={{ x:[0,3,0] }} transition={{ duration:1.2, repeat:Infinity, ease:'easeInOut' }}
                      >
                        <ArrowUpRight size={12} style={{ color:accent }} />
                      </motion.div>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1">{desc}</p>

                    {/* Learn more */}
                    <motion.div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold"
                      style={{ color:accent }}
                      animate={{ x:[0,3,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut', delay:idx*0.4 }}
                    >
                      Learn more <ArrowRight size={11} />
                    </motion.div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                    style={{ background:`linear-gradient(90deg,${accent},${accent}66)` }}
                    initial={{ scaleX:0 }}
                    whileInView={{ scaleX:1 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.8, delay:0.2+idx*0.15, ease:[0.22,1,0.36,1] }}
                  />
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section ref={testRef} className="relative py-24 px-6 bg-white overflow-hidden">
        {/* Background pulse orb */}
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width:600, height:600, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            background:'radial-gradient(circle,rgba(28,150,191,0.04) 0%,transparent 70%)' }}
          animate={{ scale:[1,1.2,1] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" variants={stagger(0)} initial="hidden" animate={testInView ? 'show':'hidden'}>
            <SectionLabel text="Testimonials" />
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Trusted by <span style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>traders worldwide</span>
            </motion.h2>
          </motion.div>

          {/* Auto-cycling testimonials */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((t, idx) => idx === activeTest && (
                <motion.div key={t.name}
                  initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-60 }}
                  transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
                >
                  <TiltCard className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
                    <ShimmerLine />
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length:t.stars }).map((_,si) => (
                          <motion.div key={si}
                            initial={{ opacity:0, scale:0, rotate:-30 }} animate={{ opacity:1, scale:1, rotate:0 }}
                            transition={{ delay:0.1+si*0.07, type:'spring', stiffness:300 }}
                          >
                            <Star size={16} fill="#f59e0b" stroke="none" />
                          </motion.div>
                        ))}
                      </div>
                      <motion.div className="text-6xl font-black leading-none mb-4" style={{ color:t.color, opacity:0.15 }}
                        animate={{ scale:[1,1.05,1] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                      >"</motion.div>
                      <p className="text-base text-slate-600 leading-relaxed mb-8 italic max-w-2xl">"{t.quote}"</p>
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-black text-white shrink-0 relative"
                          style={{ background:`linear-gradient(135deg,${t.color},${t.color}99)` }}
                        >
                          {t.avatar}
                          <motion.div className="absolute inset-0 rounded-full"
                            style={{ border:`2px solid ${t.color}` }}
                            animate={{ scale:[1,1.5,1], opacity:[0.8,0,0.8] }}
                            transition={{ duration:2, repeat:Infinity, ease:'easeOut' }}
                          />
                        </motion.div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{t.name}</p>
                          <p className="text-[11px] text-slate-400">{t.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background:`linear-gradient(90deg,transparent,${t.color}50,transparent)` }}
                    />
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_,i) => (
              <motion.button key={i} onClick={() => setActiveTest(i)}
                className="rounded-full" style={{ height:8, border:'none', cursor:'pointer', padding:0 }}
                animate={{ width: activeTest===i ? 28:8, background: activeTest===i ? '#1C96BF':'#cbd5e1' }}
                transition={{ duration:0.35 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section ref={ctaRef} className="relative py-28 px-6 overflow-hidden"
        style={{ background:'linear-gradient(160deg,#020617 0%,#0a0f1e 50%,#030712 100%)' }}
      >
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:'radial-gradient(rgba(28,150,191,0.07) 1px,transparent 1px)',
          backgroundSize:'32px 32px',
        }} />

        {/* Scan line */}
        <motion.div className="absolute inset-x-0 h-px pointer-events-none"
          style={{ background:'linear-gradient(90deg,transparent,rgba(28,150,191,0.4),rgba(45,212,191,0.35),transparent)' }}
          animate={{ top:['0%','100%'] }} transition={{ duration:7, repeat:Infinity, ease:'linear', repeatDelay:1.5 }}
        />

        {/* Rings */}
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width:320+i*160, height:320+i*160, top:'50%', left:'50%',
              border:`1px solid rgba(28,150,191,${0.18-i*0.05})`, transform:'translate(-50%,-50%)' }}
            animate={{ scale:[1,1.1,1], opacity:[0.4,1,0.4] }}
            transition={{ duration:4+i, repeat:Infinity, ease:'easeInOut', delay:i*1.2 }}
          />
        ))}

        {/* Rising dots */}
        {Array.from({ length:14 }, (_,i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width:3, height:3, background: i%2 ? '#1C96BF':'#2dd4bf', left:`${5+i*6.5}%`, bottom:0, opacity:0.3 }}
            animate={{ y:[0,-320], opacity:[0,0.45,0] }}
            transition={{ duration:5+i*0.4, repeat:Infinity, ease:'linear', delay:i*0.55 }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity:0, y:40 }} animate={ctaInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
          >
            <motion.div className="inline-flex items-center gap-2 mb-4"
              animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2.5, repeat:Infinity }}
            >
              <motion.span className="h-1.5 w-1.5 rounded-full bg-teal-400"
                animate={{ scale:[1,1.8,1] }} transition={{ duration:1.8, repeat:Infinity }}
              />
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-teal-400">Get Started Today</p>
              <motion.span className="h-1.5 w-1.5 rounded-full bg-teal-400"
                animate={{ scale:[1,1.8,1] }} transition={{ duration:1.8, repeat:Infinity, delay:0.9 }}
              />
            </motion.div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
              Trade without{' '}
              <motion.span
                style={{ backgroundImage:'linear-gradient(90deg,#1C96BF,#2dd4bf)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}
                animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }}
                transition={{ duration:4, repeat:Infinity, ease:'linear' }}
              >
                borders or delays
              </motion.span>
            </h2>

            <p className="text-white/45 text-base leading-relaxed max-w-xl mx-auto mb-10">
              Join thousands of exporters who've replaced slow bank transfers with same-week advances. Your next shipment deserves better financing.
            </p>

            <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <Link to="/contact"
                className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-10 py-4 text-sm font-black text-white shadow-xl shadow-teal-500/25 no-underline"
                style={{ background:'linear-gradient(135deg,#1C96BF,#0ea5e9)' }}
              >
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.24) 50%,transparent 70%)' }}
                  animate={{ x:['-100%','150%'] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut', repeatDelay:1.5 }}
                />
                <span className="relative">START TRADING NOW</span>
                <motion.div animate={{ x:[0,5,0] }} transition={{ duration:1.2, repeat:Infinity, ease:'easeInOut' }}>
                  <ArrowRight size={16} className="relative" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity:0 }} animate={ctaInView ? { opacity:1 }:{}} transition={{ delay:0.4 }}
            >
              {['Regulated & Compliant','Bank-Grade Security','ISO Certified'].map((t,i) => (
                <motion.span key={t} className="flex items-center gap-2 text-[11px] text-white/35 font-semibold"
                  animate={{ opacity:[0.35,0.65,0.35] }} transition={{ duration:3+i, repeat:Infinity, ease:'easeInOut', delay:i*0.8 }}
                >
                  <CheckCircle2 size={12} className="text-teal-400/60" />{t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
