import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import contactBanner from '../../assets/images/contactpagebanner.jpg';
import {
  ArrowRight, Mail, Phone, MapPin, Send, MessageSquare,
  Clock, Globe, ChevronDown, CheckCircle2,
  Building2, Zap, Shield, Sparkles,
} from 'lucide-react';

/* ── Social icons ─────────────────────────────────────────────────── */
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ── Framer variants ──────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const premiumRise = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const floatUp = {
  hidden: { opacity: 0, y: 80 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};
const rotateFade = {
  hidden: { opacity: 0, rotate: -20, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1, rotate: 0, scale: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: 'easeOut' },
  }),
};
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.08 },
  }),
};

/* ── Static particle data (pre-seeded to avoid re-render flicker) ─── */
const PARTICLES = Array.from({ length: 48 }, (_, i) => {
  const seed = (i * 137.508) % 1;
  const seed2 = (i * 73.1) % 1;
  const seed3 = (i * 42.7) % 1;
  const seed4 = (i * 99.3) % 1;
  return {
    id: i,
    left: `${(seed * 100).toFixed(2)}%`,
    top: `${(seed2 * 100).toFixed(2)}%`,
    size: seed3 * 3 + 1,
    opacity: seed4 * 0.35 + 0.08,
    duration: seed * 6 + 4,
    delay: seed2 * 6,
    yRange: -(seed3 * 40 + 20),
    xRange: (seed4 - 0.5) * 30,
  };
});

/* ── Data ─────────────────────────────────────────────────────────── */
const WA_HREF = `https://wa.me/917003634890?text=${encodeURIComponent('*TRADEFLINK, INQUIRY*\n\n──────────────────────\n\nI would like to learn more about your trade finance services.\n\n──────────────────────\n_Sent via tradeflink.com_')}`;

const CONTACT_CARDS = [
  {
    Icon: WhatsAppIcon, title: 'WhatsApp Us',
    desc: 'Message us instantly on WhatsApp. Our team responds within minutes during business hours.',
    action: '+91 70036 34890', href: WA_HREF, external: true,
    accent: '#25D366', light: 'rgba(37,211,102,0.1)',
    glow: 'rgba(37,211,102,0.25)', badge: 'Usually replies in minutes',
  },
  {
    Icon: Mail, title: 'Email Us',
    desc: "Drop us an email and we'll get back to you promptly on business days.",
    action: 'info@tradeflink.com', href: 'mailto:info@tradeflink.com',
    accent: '#0ea5e9', light: 'rgba(14,165,233,0.1)',
    glow: 'rgba(14,165,233,0.25)', badge: 'Prompt Response',
  },
  {
    Icon: Phone, title: 'Call Us',
    desc: 'Speak directly with a trade finance specialist.',
    action: '+91 70036 34890', href: 'tel:+917003634890',
    accent: '#6366f1', light: 'rgba(99,102,241,0.1)',
    glow: 'rgba(99,102,241,0.25)', badge: 'Mon – Fri, Business Hours',
  },
];

const OFFICES = [
  { city: 'Dubai',    country: 'UAE',    flag: '🇦🇪', role: 'MENA HQ',        address: 'DIFC, Gate Avenue, Level 3' },
  { city: 'Delhi',    country: 'India',  flag: '🇮🇳', role: 'South Asia Hub', address: 'Connaught Place, New Delhi' },
  { city: 'Kolkata',  country: 'India',  flag: '🇮🇳', role: 'Operations',     address: 'Salt Lake Sector V, Kolkata' },
  { city: 'Delaware', country: 'USA',    flag: '🇺🇸', role: 'Americas',       address: '1209 Orange St, Wilmington' },
  { city: 'London',   country: 'UK',     flag: '🇬🇧', role: 'Europe',         address: 'Canary Wharf, London E14' },
  { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', role: 'EMEA Bridge',    address: 'Levent, Büyükdere Caddesi' },
];

const FAQS = [
  {
    q: 'How quickly can I expect a response?',
    a: 'For general inquiries via email, we respond promptly on business days. Live chat responses are usually instant. Phone lines are open Monday to Friday during business hours.',
  },
  {
    q: 'Which office should I contact for my region?',
    a: 'Our Dubai HQ handles all MENA inquiries. India-based businesses can reach our Delhi or Kolkata teams. For the Americas, contact our Delaware office, and for Europe, reach our London team.',
  },
  {
    q: 'Can I request a product demo?',
    a: 'Absolutely. Select "Product Demo" in the subject field of the contact form and our solutions team will reach out to schedule a personalized walkthrough of the platform.',
  },
  {
    q: "I'm having an issue with my account. Who do I contact?",
    a: 'Existing clients can reach our dedicated support team at support@tradeflink.com. For urgent issues, please call our support hotline available 24/7.',
  },
];

const SOCIAL = [
  { Icon: LinkedinIcon,  label: 'LinkedIn',  href: '#' },
  { Icon: XIcon,         label: 'X',         href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
];

/* ── Hooks ────────────────────────────────────────────────────────── */
function useMouseParallax(strength = 0.025) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const handler = (e) => {
      x.set((e.clientX - window.innerWidth  / 2) * strength);
      y.set((e.clientY - window.innerHeight / 2) * strength);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [strength, x, y]);
  return { x: sx, y: sy };
}

/* ── Sub-components ───────────────────────────────────────────────── */
function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-5">
      <span className="w-8 h-px bg-teal-500" />
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${light ? 'text-teal-600' : 'text-teal-400'}`}>
        {children}
      </span>
      <span className="w-8 h-px bg-teal-500" />
    </div>
  );
}

/* 3-D tilt card */
function TiltCard({ children, className, style, intensity = 8 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 28 });
  const sry = useSpring(ry, { stiffness: 250, damping: 28 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width  - 0.5;
    const dy = (e.clientY - rect.top)  / rect.height - 0.5;
    rx.set(-dy * intensity);
    ry.set( dx * intensity);
  };
  const handleLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Animated counter */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const ctrl = animate(0, num, {
      duration: 2.2, ease: 'easeOut',
      onUpdate: v => setVal(Math.round(v * 10) / 10),
    });
    return ctrl.stop;
  }, [inView, target]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* Floating hero particles */
function HeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#1C96BF' : p.id % 3 === 1 ? '#0ea5e9' : '#6366f1',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
          animate={{ y: [0, p.yRange, 0], x: [0, p.xRange, 0], opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* Split-word hero text animation */
function SplitWords({ text, className, delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, skewY: 4, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.22em', willChange: 'transform, opacity, filter' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* Animated form input */
function FormInput({ label, type = 'text', name, value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div className="relative">
      <label style={{
        position: 'absolute', left: '1rem',
        top: focused || filled ? '-0.5rem' : '1rem',
        fontSize: focused || filled ? '0.65rem' : '0.875rem',
        color: focused ? '#1C96BF' : '#94a3b8',
        fontWeight: focused || filled ? 800 : 500,
        letterSpacing: focused || filled ? '0.08em' : '0',
        textTransform: focused || filled ? 'uppercase' : 'none',
        background: focused || filled ? '#fff' : 'transparent',
        padding: focused || filled ? '0 0.375rem' : '0',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }}>{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} placeholder={focused ? placeholder : ''}
        style={{
          width: '100%', padding: '1rem', borderRadius: '0.875rem',
          border: `2px solid ${focused ? '#1C96BF' : '#e2e8f0'}`,
          background: '#fff', fontSize: '0.875rem', color: '#0f172a',
          outline: 'none',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          boxShadow: focused ? '0 0 0 4px rgba(28,150,191,0.12), 0 4px 16px rgba(28,150,191,0.08)' : 'none',
        }}
      />
    </div>
  );
}

function FormTextarea({ label, name, value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div className="relative">
      <label style={{
        position: 'absolute', left: '1rem',
        top: focused || filled ? '-0.5rem' : '1rem',
        fontSize: focused || filled ? '0.65rem' : '0.875rem',
        color: focused ? '#1C96BF' : '#94a3b8',
        fontWeight: focused || filled ? 800 : 500,
        letterSpacing: focused || filled ? '0.08em' : '0',
        textTransform: focused || filled ? 'uppercase' : 'none',
        background: focused || filled ? '#fff' : 'transparent',
        padding: focused || filled ? '0 0.375rem' : '0',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }}>{label}</label>
      <textarea
        name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} rows={5} placeholder={focused ? placeholder : ''}
        style={{
          width: '100%', padding: '1rem', borderRadius: '0.875rem',
          border: `2px solid ${focused ? '#1C96BF' : '#e2e8f0'}`,
          background: '#fff', fontSize: '0.875rem', color: '#0f172a',
          outline: 'none', resize: 'none', fontFamily: 'inherit',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          boxShadow: focused ? '0 0 0 4px rgba(28,150,191,0.12), 0 4px 16px rgba(28,150,191,0.08)' : 'none',
        }}
      />
    </div>
  );
}

const COUNTRY_CODES = [
  { code: 'IN', flag: '🇮🇳', name: 'India',          dial: '+91'  },
  { code: 'AE', flag: '🇦🇪', name: 'UAE',            dial: '+971' },
  { code: 'US', flag: '🇺🇸', name: 'United States',  dial: '+1'   },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dial: '+44'  },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia',   dial: '+966' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar',          dial: '+974' },
  { code: 'KW', flag: '🇰🇼', name: 'Kuwait',         dial: '+965' },
  { code: 'BH', flag: '🇧🇭', name: 'Bahrain',        dial: '+973' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman',           dial: '+968' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan',       dial: '+92'  },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',     dial: '+880' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka',      dial: '+94'  },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey',         dial: '+90'  },
  { code: 'DE', flag: '🇩🇪', name: 'Germany',        dial: '+49'  },
  { code: 'FR', flag: '🇫🇷', name: 'France',         dial: '+33'  },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands',    dial: '+31'  },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden',         dial: '+46'  },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore',      dial: '+65'  },
  { code: 'HK', flag: '🇭🇰', name: 'Hong Kong',      dial: '+852' },
  { code: 'CN', flag: '🇨🇳', name: 'China',          dial: '+86'  },
  { code: 'JP', flag: '🇯🇵', name: 'Japan',          dial: '+81'  },
  { code: 'AU', flag: '🇦🇺', name: 'Australia',      dial: '+61'  },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa',   dial: '+27'  },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria',        dial: '+234' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya',          dial: '+254' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt',          dial: '+20'  },
  { code: 'GH', flag: '🇬🇭', name: 'Ghana',          dial: '+233' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',         dial: '+1'   },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil',         dial: '+55'  },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico',         dial: '+52'  },
];

function FormPhoneInput({ label, countryCode, phone, onCountryChange, onPhoneChange, onOpenChange }) {
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selected = COUNTRY_CODES.find(c => c.dial === countryCode) || COUNTRY_CODES[0];

  const setOpen = (val) => { setDropdownOpen(val); onOpenChange?.(val); };

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <label style={{
        position: 'absolute', left: '1rem', zIndex: 1, pointerEvents: 'none',
        top: '-0.5rem', fontSize: '0.65rem',
        color: focused ? '#1C96BF' : '#94a3b8',
        fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
        background: '#fff', padding: '0 0.375rem',
        transition: 'color 0.25s ease',
      }}>{label}</label>
      <div style={{
        display: 'flex', position: 'relative',
        borderRadius: '0.875rem',
        border: `2px solid ${focused ? '#1C96BF' : '#e2e8f0'}`,
        background: '#fff',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: focused ? '0 0 0 4px rgba(28,150,191,0.12), 0 4px 16px rgba(28,150,191,0.08)' : 'none',
        overflow: 'visible',
      }}>
        {/* Country code selector */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setOpen(!dropdownOpen)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => { if (!wrapperRef.current?.contains(e.relatedTarget)) setFocused(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '1rem 0.75rem',
              background: '#f8fafc',
              border: 'none', borderRight: '1.5px solid #e2e8f0',
              borderRadius: '0.75rem 0 0 0.75rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: '0.875rem', fontWeight: 700, color: '#0f172a',
              outline: 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{selected.flag}</span>
            <span style={{ color: '#1C96BF', minWidth: '2.5rem' }}>{selected.dial}</span>
            <ChevronDown
              size={13}
              style={{ color: '#94a3b8', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
            />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 200,
              background: '#fff', border: '1.5px solid #e2e8f0',
              borderRadius: '0.875rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              maxHeight: '220px', overflowY: 'auto', width: '230px',
            }}>
              {COUNTRY_CODES.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); onCountryChange(c.dial); setOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.625rem',
                    width: '100%', padding: '0.6rem 0.875rem',
                    background: c.dial === countryCode ? 'rgba(28,150,191,0.08)' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: '0.8rem', color: '#0f172a',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{c.flag}</span>
                  <span style={{ fontWeight: 700, color: '#1C96BF', minWidth: '2.5rem' }}>{c.dial}</span>
                  <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9\s\-()+]/g, ''); onPhoneChange(e); }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { if (!wrapperRef.current?.contains(e.relatedTarget)) setFocused(false); }}
          placeholder="e.g. 555 123 4567"
          style={{
            flex: 1, padding: '1rem',
            border: 'none', background: 'transparent',
            fontSize: '0.875rem', color: '#0f172a',
            outline: 'none', borderRadius: '0 0.75rem 0.75rem 0',
          }}
        />
      </div>
    </div>
  );
}

function FormSelect({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const OPTIONS = ['General Inquiry','Product Demo','Invoice Financing','Supply Chain Solutions','Partnership Opportunity','Media & Press','Support'];
  return (
    <div className="relative">
      <label style={{
        position: 'absolute', left: '1rem',
        top: value ? '-0.5rem' : '1rem',
        fontSize: value ? '0.65rem' : '0.875rem',
        color: focused ? '#1C96BF' : '#94a3b8',
        fontWeight: value ? 800 : 500,
        letterSpacing: value ? '0.08em' : '0',
        textTransform: value ? 'uppercase' : 'none',
        background: value ? '#fff' : 'transparent',
        padding: value ? '0 0.375rem' : '0',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <select
          name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '1rem', paddingRight: '2.5rem',
            borderRadius: '0.875rem',
            border: `2px solid ${focused ? '#1C96BF' : '#e2e8f0'}`,
            background: '#fff', fontSize: '0.875rem',
            color: value ? '#0f172a' : '#94a3b8',
            outline: 'none', appearance: 'none', cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            boxShadow: focused ? '0 0 0 4px rgba(28,150,191,0.12)' : 'none',
          }}
        >
          <option value="" disabled />
          {OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

/* Confetti particles for success */
const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  color: ['#1C96BF','#0ea5e9','#6366f1','#f59e0b','#ec4899'][i % 5],
  angle: (i / 24) * 360,
  dist: 80 + (i % 5) * 30,
}));

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center text-center py-20 rounded-3xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#f0fdf9 0%,#f0f9ff 100%)', border: '2px solid rgba(28,150,191,0.2)' }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-12 top-10 h-24 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle,rgba(28,150,191,0.25) 0%,transparent 70%)' }}
      />

      {/* Confetti burst */}
      {CONFETTI.map(c => (
        <motion.div
          key={c.id}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 8, height: 8, background: c.color, top: '50%', left: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((c.angle * Math.PI) / 180) * c.dist,
            y: Math.sin((c.angle * Math.PI) / 180) * c.dist,
            opacity: 0, scale: 0,
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
        style={{ background: 'linear-gradient(135deg,#1C96BF,#0ea5e9)' }}
      >
        <CheckCircle2 size={40} className="text-white" />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle,rgba(28,150,191,0.4) 0%,transparent 70%)' }}
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-black text-[#0f172a] mb-3"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-slate-500 leading-relaxed max-w-sm mb-8"
      >
        Thank you for reaching out. One of our specialists will get back to you promptly.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        onClick={onReset}
        whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(28,150,191,0.4)' }}
        whileTap={{ scale: 0.96 }}
        className="btn-brand text-xs px-8 py-3"
      >
        Send Another
      </motion.button>
    </motion.div>
  );
}

/* FAQ item */
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref} custom={index} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
      className="border-b border-gray-100 last:border-none"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-6 text-left gap-4"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] font-black tabular-nums w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ background: open ? 'linear-gradient(135deg,#1C96BF,#0ea5e9)' : '#f1f5f9', color: open ? '#fff' : '#94a3b8' }}
          >
            {['A','B','C','D'][index]}
          </span>
          <span className="font-bold text-[#0f172a] text-base leading-snug">{q}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            flexShrink: 0, width: '1.75rem', height: '1.75rem', borderRadius: '9999px',
            background: open ? 'linear-gradient(135deg,#1C96BF,#0ea5e9)' : '#f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronDown size={14} style={{ color: open ? '#fff' : '#64748b', transform: open ? 'rotate(-90deg)' : 'none' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-slate-500 leading-relaxed pb-6 pl-10 pr-10 text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', countryCode: '+91', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const { x: orbX, y: orbY } = useMouseParallax(0.03);

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    const text = [
      `*TRADEFLINK, NEW INQUIRY*`,
      ``,
      `──────────────────────`,
      ``,
      `*From:*    ${form.name}`,
      `*Email:*   ${form.email}`,
      form.company ? `*Company:* ${form.company}` : null,
      form.subject ? `*Re:*      ${form.subject}` : null,
      form.phone   ? `*Phone:*   ${form.countryCode} ${form.phone}` : null,
      ``,
      `──────────────────────`,
      ``,
      `${form.name} writes:`,
      ``,
      form.message,
      ``,
      `──────────────────────`,
      `_Sent via tradeflink.com_`,
    ].filter(l => l !== null).join('\n');

    const url = `https://wa.me/917003634890?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════ HERO ══════════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${contactBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(5,13,24,0.72)' }} />

        {/* Noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '128px' }} />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
          }} />

        {/* Floating particles */}
        <HeroParticles />

        {/* Animated floating orbs */}
        <motion.div
          className="absolute top-32 right-20 w-32 h-32 rounded-full pointer-events-none"
          animate={{ y: [0, 30, 0], x: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-32 left-10 w-40 h-40 rounded-full pointer-events-none"
          animate={{ y: [0, -30, 0], x: [0, -20, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
        />

          {/* Premium ambient glow */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full blur-3xl pointer-events-none"
            animate={{ x: [0, 18, 0], y: [0, -14, 0], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, rgba(28,150,191,0.42) 0%, transparent 70%)' }}
          />

        {/* Parallax orbs */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute -top-60 -left-32 w-200 h-200 rounded-full pointer-events-none"
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.12, 1], opacity: [0.14, 0.22, 0.14] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle,#1C96BF 0%,transparent 65%)' }}
          />
        </motion.div>

        <motion.div
          style={{ x: orbX, y: orbY, scale: -1 }}
          className="absolute bottom-0 right-0 w-150 h-150 rounded-full pointer-events-none"
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.09, 0.15, 0.09] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ background: 'radial-gradient(circle,#0ea5e9 0%,transparent 65%)' }}
          />
        </motion.div>

        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.5),rgba(14,165,233,0.5),transparent)' }} />

        <div className="relative z-10 py-44 px-6 sm:px-10 lg:px-16 xl:px-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={premiumRise}
            className="relative max-w-xl text-left"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[2rem] bg-white/[0.03] backdrop-blur-[2px]"
              style={{ boxShadow: '0 0 120px rgba(28,150,191,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)' }}
            />

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-9"
              style={{
                border: '1px solid rgba(28,150,191,0.35)',
                background: 'rgba(28,150,191,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.25em]">Get In Touch</span>
              <Sparkles size={12} className="text-teal-400" />
            </motion.div>

            {/* Headline with split-word animation */}
            <h1 className="font-clash font-semibold text-white leading-[1.02] mb-7 text-left" style={{ fontSize: 'clamp(26px, 3.8vw, 52px)' }}>
              <SplitWords text="We'd love to" delay={0.15} />
              <br />
              <span className="text-gradient" style={{ textShadow: '0 0 80px rgba(28,150,191,0.4)' }}>
                <SplitWords text="hear from you" delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-slate-400 text-md leading-relaxed mb-12 max-w-xl"
            >
              Whether you're exploring trade finance, looking for a demo, or just have a question,
              our team across{' '}
              <span className="text-teal-400 font-bold">global offices</span> is ready to help.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start justify-start gap-4"
            >
              <motion.a
                href="#form"
                whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(28,150,191,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="btn-brand text-xs px-9 py-4"
              >
                Send a Message <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="mailto:info@tradeflink.com"
                whileHover={{ borderColor: 'rgba(255,255,255,0.45)', color: '#fff' }}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-white/60 text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Mail size={14} /> info@tradeflink.com
              </motion.a>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex items-center justify-start gap-12 mt-16 pt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { Icon: Clock,  text: 'Fast',   label: 'Response Time' },
                { Icon: Globe,  text: 'Global', label: 'Offices' },
                { Icon: Shield, text: 'Full',   label: 'Confidential' },
              ].map(({ Icon, text, label }, idx) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                    className="text-teal-400 mb-0.5"
                  >
                    <Icon size={18} />
                  </motion.div>
                  <p className="text-2xl font-black text-white uppercase">
                    {text}
                  </p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.25em]">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}
          >
            <div className="w-1 h-2 rounded-full bg-teal-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════ CONTACT CARDS ════════════════════════════════ */}
      <section className="relative z-10 -mt-14 pb-0">
        <div className="container-xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-40px' }} variants={stagger}
            className="grid sm:grid-cols-3 gap-5"
          >
            {CONTACT_CARDS.map((card, i) => (
              <TiltCard key={card.title} intensity={6}>
                <motion.a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  custom={i} variants={floatUp}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-xl overflow-hidden block"
                  style={{ textDecoration: 'none' }}
                  whileHover={{ boxShadow: `0 28px 70px -8px ${card.glow}` }}
                >
                  {/* Gradient bg on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at top left, ${card.light} 0%, transparent 70%)` }}
                  />

                  {/* Shimmer streak */}
                  <motion.div
                    className="absolute inset-0 -skew-x-12 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)`,
                      width: '60%', left: '-60%',
                    }}
                    animate={{}}
                      whileHover={{ left: ['-60%', '160%'] }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />

                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${card.accent}40` }}
                  />

                  <div className="relative z-10">
                    {/* Icon with pulsing ring */}
                    <div className="relative w-14 h-14 mb-5">
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        style={{ background: card.light, borderRadius: '1rem' }}
                      />
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: card.light }}
                        animate={hoveredCard === i ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div animate={hoveredCard === i ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 0.4, repeat: Infinity }}>
                          <card.Icon size={24} style={{ color: card.accent }} />
                        </motion.div>
                      </motion.div>
                    </div>

                    <span
                      className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-4"
                      style={{ background: card.light, color: card.accent }}
                    >
                      {card.badge}
                    </span>
                    <h3 className="text-xl font-black text-[#0f172a] mb-2">{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{card.desc}</p>
                    <div
                      className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group-hover:gap-3"
                      style={{ color: card.accent }}
                    >
                      {card.action}
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.a>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FORM + SIDEBAR ═══════════════════════════════ */}
      <section id="form" className="section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">

            {/* ── FORM ─────────────────────────────────────────────── */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeLeft}
            >
              <div className="mb-10">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-8 h-px bg-teal-500" />
                  <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.3em]">Contact Form</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-4">
                  Send us a<br />
                  <span className="text-gradient" style={{ textShadow: '0 0 60px rgba(28,150,191,0.2)' }}>message</span>
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Fill in the form below and we'll route your message to the right team member.
                </p>
              </div>

              {submitted ? (
                <SuccessState onReset={() => { setSubmitted(false); setForm({ name:'', email:'', company:'', subject:'', countryCode:'+91', phone:'', message:'' }); }} />
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="max-sm:grid-cols-1">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <FormInput label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Sarah Johnson" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <FormInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="sarah@company.com" />
                    </motion.div>
                  </motion.div>
                  <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="max-sm:grid-cols-1">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <FormInput label="Company" name="company" value={form.company} onChange={handleChange} placeholder="Company name (optional)" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <FormSelect label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    variants={fadeUp}
                    style={{ position: 'relative', zIndex: phoneDropdownOpen ? 50 : 1 }}
                  >
                    <FormPhoneInput
                      label="Phone Number (optional)"
                      countryCode={form.countryCode}
                      phone={form.phone}
                      onCountryChange={(dial) => setForm(f => ({ ...f, countryCode: dial }))}
                      onPhoneChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                      onOpenChange={setPhoneDropdownOpen}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp} whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
                    <FormTextarea label="Your Message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us how we can help..." />
                  </motion.div>
                  <motion.p variants={fadeUp} className="text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                    <Shield size={12} className="text-teal-500 flex-shrink-0 mt-0.5" />
                    Your information is secure and will never be shared. By submitting you agree to our Privacy Policy.
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(28,150,191,0.45)' }}
                      whileTap={{ scale: 0.97 }}
                      disabled={sending}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                        padding: '1rem 2.5rem',
                        background: sending ? '#94a3b8' : 'linear-gradient(135deg,#1C96BF,#0ea5e9)',
                        color: '#fff', fontWeight: 700, fontSize: '0.8125rem',
                        borderRadius: '9999px', border: 'none',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }}
                          />
                          Sending…
                        </>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>

            {/* ── SIDEBAR ──────────────────────────────────────────── */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeRight}
              className="space-y-5 lg:sticky lg:top-28"
            >
              {/* Fast Response card – dark glass */}
              <motion.div
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#060f1e 0%,#0c1a2e 100%)' }}
                whileHover={{ boxShadow: '0 20px 60px rgba(28,150,191,0.2)', y: -4 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Moving gradient shimmer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'radial-gradient(ellipse 60% 40% at 30% 30%,rgba(28,150,191,0.12),transparent)',
                    backgroundSize: '200% 200%',
                  }}
                />
                <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(28,150,191,0.12)', border: '1px solid rgba(28,150,191,0.2)' }}>
                      <Zap size={20} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm">Fast Response</p>
                      <p className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">Guaranteed</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Our team reviews every message personally. No bots, no auto-replies, real people ready to help.
                  </p>
                  <div className="flex gap-5">
                    {[['Fast','Live Chat'],['Prompt','Email'],['Instant','Phone']].map(([v, l]) => (
                      <div key={l} className="text-center">
                        <p className="text-teal-400 font-black text-sm">{v}</p>
                        <p className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* HQ Address */}
              <motion.div
                className="rounded-3xl p-6 border border-gray-100 bg-white"
                whileHover={{ borderColor: 'rgba(28,150,191,0.3)', boxShadow: '0 12px 40px rgba(28,150,191,0.08)', y: -4 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center">
                    <MapPin size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-[#0f172a] font-black text-sm">Global Headquarters</p>
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Dubai, UAE 🇦🇪</p>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-teal-200 pl-4">
                  DIFC, Gate Avenue, Level 3<br />
                  Dubai International Financial Centre<br />
                  Dubai, United Arab Emirates
                </p>
              </motion.div>

              {/* Direct contacts */}
              <motion.div
                className="rounded-3xl p-6 border border-gray-100 bg-white space-y-4"
                whileHover={{ borderColor: 'rgba(28,150,191,0.2)', y: -4 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Direct Lines</p>
                {[
                  { Icon: Mail,         v: 'info@tradeflink.com',    l: 'General',   href: 'mailto:info@tradeflink.com' },
                  { Icon: Mail,         v: 'support@tradeflink.com', l: 'Support',   href: 'mailto:support@tradeflink.com' },
                  { Icon: Phone,        v: '+91 70036 34890',        l: 'Phone',     href: 'tel:+917003634890' },
                  { Icon: WhatsAppIcon, v: 'Chat on WhatsApp',       l: 'WhatsApp',  href: WA_HREF, external: true, color: '#25D366' },
                ].map(({ Icon, v, l, href, external, color }) => (
                  <motion.a
                    key={v} href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 group"
                    style={{ textDecoration: 'none' }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-50 transition-colors"
                      style={color ? { background: `${color}15` } : {}}>
                      <Icon size={14} className="text-slate-400 transition-colors" style={color ? { color } : {}} />
                    </div>
                    <div>
                      <p className="text-[#0f172a] text-sm font-semibold transition-colors" style={color ? {} : {}}>{v}</p>
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest">{l}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Social */}
              <div className="rounded-3xl p-6 border border-gray-100 bg-white">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ Icon, label, href }, i) => (
                    <motion.a
                      key={label} href={href} aria-label={label}
                      whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(28,150,191,0.25)', borderColor: 'rgba(28,150,191,0.4)', background: 'rgba(28,150,191,0.05)' }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
                      style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ GLOBAL OFFICES ═══════════════════════════════ */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container-xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            className="text-center mb-14"
          >
            <Eyebrow light>Our Presence</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight">
              Global offices,<br />one <span className="text-gradient">connected team</span>
            </h2>
            <p className="text-slate-400 text-lg mt-5 max-w-xl mx-auto">
              Wherever you are, there's a Tradeflink team member close by.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {OFFICES.map((o, i) => (
              <TiltCard key={o.city} intensity={5}>
                <motion.div
                  custom={i} variants={slideInLeft}
                  className="group bg-white rounded-3xl p-6 border border-gray-100 cursor-default relative overflow-hidden h-full"
                  whileHover={{ borderColor: 'rgba(28,150,191,0.3)', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover gradient fill */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at top right,rgba(28,150,191,0.05) 0%,transparent 70%)' }} />

                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div
                      className="text-4xl shrink-0 mt-0.5"
                      whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {o.flag}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <h4 className="text-lg font-black text-[#0f172a]">{o.city}</h4>
                        <span className="text-xs text-slate-400">{o.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        {/* Active pulse dot */}
                        <div className="relative w-2 h-2">
                          <div className="w-2 h-2 rounded-full bg-teal-500" />
                          <motion.div
                            className="absolute inset-0 rounded-full bg-teal-400"
                            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                          />
                        </div>
                        <Building2 size={10} className="text-teal-600" />
                        <p className="text-[10px] text-teal-600 font-black uppercase tracking-[0.18em]">{o.role}</p>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{o.address}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8, x: -10 }}
                    whileHover={{ opacity: 1, y: 0, x: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-teal-600 relative z-10 group cursor-pointer"
                  >
                    <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <MapPin size={12} />
                    </motion.div>
                    Get Directions
                    <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <ArrowRight size={12} className="ml-auto" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">

            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeLeft}
              className="lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-8 h-px bg-teal-500" />
                <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.3em]">FAQ</span>
              </div>
              <h2 className="text-4xl font-black text-[#0f172a] leading-tight mb-5">
                Common<br /><span className="text-gradient">questions</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Can't find what you're looking for? Our team is happy to help.
              </p>
              <motion.a
                href="mailto:info@tradeflink.com"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(28,150,191,0.4)' }}
                whileTap={{ scale: 0.96 }}
                className="btn-brand text-xs px-7 py-3"
              >
                Ask a Question <Mail size={14} />
              </motion.a>
            </motion.div>

            <div className="divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white overflow-hidden px-6 relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-blue-500 to-teal-500 rounded-l-3xl"
                animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {FAQS.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FaqItem q={faq.q} a={faq.a} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════════════════════════════════ */}
      <section className="section relative overflow-hidden" style={{ background: '#060f1e' }}>
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 20% 50%,rgba(28,150,191,0.12) 0%,transparent 60%), radial-gradient(ellipse 60% 80% at 80% 50%,rgba(14,165,233,0.1) 0%,transparent 60%)',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />

        {/* Pulsing center orb */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,#1C96BF 0%,transparent 70%)' }}
        />

        {/* Horizontal glow line */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.5),rgba(14,165,233,0.5),transparent)' }} />

        <div className="container-xl relative z-10">
          <motion.div
            className="absolute top-20 left-20 w-48 h-48 rounded-full pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'conic-gradient(from 0deg, rgba(13,148,136,0.1), rgba(14,165,233,0.05), rgba(13,148,136,0.1))' }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-56 h-56 rounded-full pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'conic-gradient(from 0deg, rgba(99,102,241,0.08), rgba(14,165,233,0.05), rgba(99,102,241,0.08))' }}
          />
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={stagger}
            className="text-center max-w-3xl mx-auto relative z-10"
          >
            <motion.div variants={rotateFade}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-9"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Start Today
            </motion.div>

            <motion.h2 variants={fadeUp}
              className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6"
              style={{ textShadow: '0 0 120px rgba(28,150,191,0.25)' }}
            >
              Ready to unlock<br />global trade?
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-slate-400 text-xl max-w-lg mx-auto mb-12 leading-relaxed"
            >
              Join a growing community of SMEs across many countries who've already transformed their trade finance with Tradeflink.
            </motion.p>

            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 20px 56px rgba(28,150,191,0.55)' }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/" className="btn-brand text-sm px-10 py-4">
                  Get Started <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.a
                href="#form"
                whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)' }}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider transition-all duration-200"
              >
                <MessageSquare size={16} /> Contact Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
