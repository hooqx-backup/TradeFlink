import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cookie, Shield, Settings, BarChart2, Globe, Mail, ArrowRight,
  ToggleLeft, AlertCircle, RefreshCw, ChevronRight, CheckCircle2,
  ExternalLink, Lock, Eye, Sliders, Ban,
} from 'lucide-react';
import heroBg from '../../assets/images/cookiepolicy.jpg';

/* ── Animation variants ────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const blurUp = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};
const slideInLeft = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};
const popIn = {
  hidden:  { opacity: 0, scale: 0.88, y: 12 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};
const stagger      = { hidden: {}, visible: { transition: { staggerChildren: 0.1  } } };
const staggerFast  = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ── Helpers ───────────────────────────────────────────────────── */
function ParticleGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
      }}
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

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.75 origin-left z-999 pointer-events-none"
      style={{ scaleX, background: 'linear-gradient(90deg, #0d9488, #06b6d4, #3b82f6)' }}
    />
  );
}

function FloatingOrb({ color, size, style, duration, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        ...style,
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Cookie type badge ─────────────────────────────────────────── */
function Badge({ label, color }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
      style={{ background: `${color}18`, color }}
    >
      {label}
    </span>
  );
}

/* ── Cookie table ──────────────────────────────────────────────── */
const COOKIE_TABLE = [
  { name: 'tf_session',      category: 'Essential',   duration: 'Session',   purpose: 'Maintains authenticated user session across pages.'         },
  { name: 'tf_csrf',         category: 'Essential',   duration: 'Session',   purpose: 'Cross-site request forgery protection token.'               },
  { name: 'tf_lang',         category: 'Preference',  duration: '1 year',    purpose: 'Stores your preferred language for the platform.'           },
  { name: 'tf_currency',     category: 'Preference',  duration: '1 year',    purpose: 'Remembers your preferred currency display setting.'         },
  { name: '_ga',             category: 'Analytics',   duration: '2 years',   purpose: 'Google Analytics, distinguishes unique users.'             },
  { name: '_ga_*',           category: 'Analytics',   duration: '2 years',   purpose: 'Google Analytics, persists session state.'                 },
  { name: '_gid',            category: 'Analytics',   duration: '24 hours',  purpose: 'Google Analytics, distinguishes users within a session.'   },
  { name: 'tf_consent',      category: 'Essential',   duration: '1 year',    purpose: 'Stores your cookie consent preferences.'                    },
  { name: 'tf_dashboard',    category: 'Preference',  duration: '6 months',  purpose: 'Remembers your dashboard layout and widget arrangement.'    },
  { name: 'intercom-*',      category: 'Functional',  duration: '9 months',  purpose: 'Intercom live chat, identifies returning users.'           },
];

const CATEGORY_COLORS = {
  Essential:   '#1C96BF',
  Analytics:   '#f59e0b',
  Preference:  '#10b981',
  Functional:  '#8b5cf6',
  Marketing:   '#f43f5e',
};

/* ── Policy data ───────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'what-are-cookies',
    Icon: Cookie,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'What Are Cookies?',
    content: [
      {
        heading: 'Definition',
        body: 'Cookies are small text files placed on your device, computer, tablet, or smartphone, when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide reporting information to site owners.',
      },
      {
        heading: 'Similar Technologies',
        body: 'In addition to cookies, we may use web beacons (also called pixel tags or clear GIFs), local storage, session storage, and similar tracking technologies. These work alongside or in place of cookies to help us understand how you interact with our platform.',
      },
      {
        heading: 'First-Party vs Third-Party Cookies',
        body: 'First-party cookies are set directly by Tradeflink on our own domain. Third-party cookies are set by external services we integrate with, such as analytics providers, live chat tools, and payment processors. We carefully vet all third parties whose cookies operate on our platform.',
      },
    ],
  },
  {
    id: 'types-of-cookies',
    Icon: Sliders,
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.08)',
    title: 'Types of Cookies We Use',
    content: [
      {
        heading: 'Essential Cookies',
        body: 'These cookies are strictly necessary for the Tradeflink platform to function correctly. They enable core features such as secure login, session management, CSRF protection, and consent tracking. You cannot opt out of essential cookies without disabling core functionality. They are always active.',
        badge: { label: 'Always Active', color: '#1C96BF' },
      },
      {
        heading: 'Analytics Cookies',
        body: 'Analytics cookies help us understand how visitors interact with our platform, which pages are most visited, how long sessions last, and where users drop off. We use Google Analytics with IP anonymisation enabled so no personally identifiable information is transmitted. This data is aggregated and used solely to improve the platform.',
        badge: { label: 'Optional', color: '#f59e0b' },
      },
      {
        heading: 'Preference (Functional) Cookies',
        body: 'Preference cookies remember your personal settings, such as your chosen language, currency display, dashboard layout, and time zone, so you do not have to reconfigure them each time you visit. Disabling these cookies may mean certain features do not work as expected.',
        badge: { label: 'Optional', color: '#10b981' },
      },
      {
        heading: 'Functional Cookies',
        body: 'Functional cookies power features beyond basic navigation, including live chat via Intercom, in-app notifications, and platform customisation tools. These enhance your experience but are not strictly required for core services to operate.',
        badge: { label: 'Optional', color: '#8b5cf6' },
      },
    ],
  },
  {
    id: 'how-we-use',
    Icon: Eye,
    accent: '#10b981',
    light: 'rgba(16,185,129,0.08)',
    title: 'How We Use Cookies',
    content: [
      {
        heading: 'Authentication & Security',
        body: 'Essential cookies keep you securely logged in as you navigate the platform, prevent cross-site request forgery attacks, and flag suspicious session activity. These are foundational to the security of your account and financial data.',
      },
      {
        heading: 'Platform Performance',
        body: 'Analytics cookies allow us to measure page load times, identify bottlenecks, and prioritise performance improvements. Aggregated data helps our engineering team understand real-world usage patterns across devices and regions.',
      },
      {
        heading: 'Personalisation',
        body: 'Preference cookies enable a tailored experience, remembering whether you prefer a light or dark interface, your currency of choice, and your saved filter configurations within the dashboard. This reduces repetitive set-up on each visit.',
      },
      {
        heading: 'Support & Communication',
        body: 'Functional cookies power our live support chat, in-app messages, and notification delivery. These help our team provide timely assistance and ensure critical platform messages reach you when needed.',
      },
    ],
  },
  {
    id: 'third-party',
    Icon: Globe,
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.08)',
    title: 'Third-Party Cookies',
    content: [
      {
        heading: 'Google Analytics',
        body: 'We use Google Analytics to understand aggregate platform usage. Google Analytics sets cookies (_ga, _gid, _ga_*) to distinguish users and sessions. All data is collected with IP anonymisation enabled. You can opt out via Google\'s opt-out browser add-on or through our Cookie Settings panel.',
      },
      {
        heading: 'Intercom',
        body: 'Our live chat and in-app messaging is powered by Intercom. Intercom sets cookies to identify returning users and provide continuity across support conversations. Intercom\'s cookies are governed by Intercom\'s own Privacy Policy, available at intercom.com.',
      },
      {
        heading: 'No Advertising Cookies',
        body: 'Tradeflink does not use advertising or marketing cookies. We do not track users across third-party websites for targeted advertising purposes, and we do not sell or share your behavioural data with advertising networks.',
      },
    ],
  },
  {
    id: 'managing-cookies',
    Icon: Settings,
    accent: '#f59e0b',
    light: 'rgba(245,158,11,0.08)',
    title: 'Managing Your Cookie Preferences',
    content: [
      {
        heading: 'Cookie Settings Panel',
        body: 'You can review and update your cookie preferences at any time via the Cookie Settings panel accessible from the footer of every page. Changes take effect immediately. Withdrawing consent for non-essential cookies will not affect your ability to use core platform features.',
      },
      {
        heading: 'Browser-Level Controls',
        body: 'All major browsers allow you to block or delete cookies through their settings. Blocking all cookies may prevent certain features from working correctly. Consult your browser\'s help documentation for instructions: Chrome, Firefox, Safari, Edge, and Opera each provide granular cookie controls.',
      },
      {
        heading: 'Opt-Out Tools',
        body: 'For analytics cookies specifically, you may use the Google Analytics Opt-out Browser Add-on to prevent your data from being included in aggregate reports. For other third-party tools, their respective opt-out mechanisms are linked in our Cookie Settings panel.',
      },
      {
        heading: 'Do Not Track',
        body: 'Some browsers transmit a "Do Not Track" (DNT) signal. Tradeflink currently does not alter its data collection practices in response to DNT signals, as there is no universally accepted standard for how websites should respond. We encourage you to use our Cookie Settings panel for explicit control.',
      },
    ],
  },
  {
    id: 'legal-basis',
    Icon: Shield,
    accent: '#f43f5e',
    light: 'rgba(244,63,94,0.08)',
    title: 'Legal Basis for Cookies',
    content: [
      {
        heading: 'Strictly Necessary Cookies',
        body: 'Essential cookies are processed under the "strictly necessary" exemption in applicable e-Privacy legislation. They do not require your consent as they are necessary for the delivery of services you have requested. We do not ask for consent before placing these cookies.',
      },
      {
        heading: 'Consent for Non-Essential Cookies',
        body: 'All non-essential cookies, including analytics, preference, and functional cookies, are placed only after you have provided explicit, informed consent through our Cookie Consent banner or Settings panel. You may withdraw this consent at any time.',
      },
      {
        heading: 'Legitimate Interests',
        body: 'In some cases we may process cookie data on the basis of legitimate interests, for example, where analytics data is used solely for platform security monitoring or fraud detection. In such cases we conduct and document a legitimate interests assessment to ensure your rights are not overridden.',
      },
    ],
  },
  {
    id: 'data-retention',
    Icon: Lock,
    accent: '#06b6d4',
    light: 'rgba(6,182,212,0.08)',
    title: 'Cookie Durations & Retention',
    content: [
      {
        heading: 'Session Cookies',
        body: 'Session cookies are temporary and are deleted automatically when you close your browser. They are used to maintain your logged-in state and secure session data during a single visit to the platform.',
      },
      {
        heading: 'Persistent Cookies',
        body: 'Persistent cookies remain on your device for a defined period depending on their purpose. The specific duration for each cookie we use is listed in the cookie table below. You can delete persistent cookies at any time through your browser settings.',
      },
      {
        heading: 'Consent Record',
        body: 'We retain a record of your cookie consent preferences (stored in the tf_consent cookie) for a defined period. After this, we will ask you to review and re-confirm your preferences to ensure they remain current.',
      },
    ],
  },
  {
    id: 'updates',
    Icon: RefreshCw,
    accent: '#8b5cf6',
    light: 'rgba(139,92,246,0.08)',
    title: 'Updates to This Policy',
    content: [
      {
        heading: 'How We Notify You',
        body: 'We may update this Cookie Policy from time to time to reflect changes in the cookies we use, applicable law, or our data practices. When we make material changes, we will notify you via a prominent notice on the platform and, where required, ask for your renewed consent before placing any new non-essential cookies.',
      },
      {
        heading: 'Version History',
        body: 'Each version of this Cookie Policy is dated and versioned. Previous versions are available upon request by emailing privacy@tradeflink.com. This is the current version, recently updated.',
      },
    ],
  },
  {
    id: 'contact',
    Icon: Mail,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'Contact Us',
    content: [
      {
        heading: 'Questions About Cookies',
        body: 'If you have any questions about how we use cookies or wish to exercise your rights in relation to cookie-based data, please contact our Data Protection Officer at privacy@tradeflink.com. We aim to respond to all enquiries promptly.',
      },
      {
        heading: 'Cookie Settings',
        body: 'To manage your cookie preferences directly, use the Cookie Settings panel in the footer of any Tradeflink page. You can enable or disable individual cookie categories and withdraw or update your consent at any time without any adverse consequence to your use of core platform services.',
      },
    ],
  },
];

const TOC = SECTIONS.map(({ id, title, Icon, accent }) => ({ id, title, Icon, accent }));

/* ── Sticky TOC ────────────────────────────────────────────────── */
function TableOfContents({ activeId }) {
  return (
    <nav className="space-y-1">
      {TOC.map(({ id, title, Icon, accent }, i) => {
        const isActive = activeId === id;
        return (
          <motion.a
            key={id}
            href={`#${id}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 group ${
              isActive ? 'text-teal-700' : 'text-slate-500 hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="toc-pill-cookie"
                className="absolute inset-0 bg-teal-50 border border-teal-200 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span
              className="relative z-10 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ background: isActive ? `${accent}20` : undefined }}
            >
              <Icon
                size={14}
                style={{ color: isActive ? accent : undefined }}
                className={!isActive ? 'text-slate-400 group-hover:text-slate-600' : ''}
              />
            </span>
            <span className="relative z-10 leading-snug text-xs">{title}</span>
            {isActive && (
              <motion.span
                className="relative z-10 ml-auto shrink-0"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={12} className="text-teal-500" />
              </motion.span>
            )}
          </motion.a>
        );
      })}
    </nav>
  );
}

/* ── Section block ─────────────────────────────────────────────── */
function CookieSection({ section, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className="scroll-mt-28 mb-16"
    >
      {/* Section header */}
      <motion.div variants={blurUp} className="flex items-center gap-4 mb-8">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: section.light }}
          whileHover={{ rotate: 8, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <section.Icon size={22} style={{ color: section.accent }} />
        </motion.div>
        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] mb-0.5"
            style={{ color: section.accent }}
          >
            Section {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="text-2xl font-black text-[#0f172a] leading-tight">{section.title}</h2>
        </div>
      </motion.div>

      {/* Animated divider */}
      <motion.div
        variants={fadeUp}
        className="h-px mb-8 rounded-full"
        style={{ background: `linear-gradient(to right, ${section.accent}40, transparent)` }}
      />

      {/* Content blocks */}
      <div className="space-y-5">
        {section.content.map((block, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={blurUp}
            whileHover={{
              y: -4,
              scale: 1.012,
              boxShadow: `0 20px 40px -12px rgba(0,0,0,0.10), 0 0 0 1px ${section.accent}30`,
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="group relative bg-white border border-gray-100 rounded-2xl p-6 cursor-default"
          >
            <motion.div
              className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full origin-top"
              style={{ background: section.accent }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="pl-5">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-base font-black text-[#0f172a] flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: section.accent }} className="shrink-0" />
                  {block.heading}
                </h3>
                {block.badge && <Badge label={block.badge.label} color={block.badge.color} />}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{block.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Cookie table section ──────────────────────────────────────── */
function CookieTableSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className="mb-16"
    >
      <motion.div variants={blurUp} className="flex items-center gap-4 mb-8">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(28,150,191,0.08)' }}
          whileHover={{ rotate: 8, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <BarChart2 size={22} style={{ color: '#1C96BF' }} />
        </motion.div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-0.5" style={{ color: '#1C96BF' }}>
            Reference
          </p>
          <h2 className="text-2xl font-black text-[#0f172a] leading-tight">Full Cookie List</h2>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="h-px mb-8 rounded-full"
        style={{ background: 'linear-gradient(to right, rgba(28,150,191,0.4), transparent)' }}
      />

      <motion.div variants={blurUp} className="rounded-2xl border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-slate-50 border-b border-gray-100">
          {['Cookie Name', 'Category', 'Duration', 'Purpose'].map((h) => (
            <p key={h} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{h}</p>
          ))}
        </div>

        {/* Table rows */}
        {COOKIE_TABLE.map((row, i) => (
          <motion.div
            key={row.name}
            custom={i}
            variants={fadeUp}
            className="grid grid-cols-4 gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-slate-50/60 transition-colors duration-150"
          >
            <p className="text-sm font-mono font-bold text-[#0f172a] break-all">{row.name}</p>
            <div>
              <Badge label={row.category} color={CATEGORY_COLORS[row.category] ?? '#64748b'} />
            </div>
            <p className="text-sm text-slate-500">{row.duration}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{row.purpose}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Category legend */}
      <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs text-slate-500">{cat}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Scroll spy ────────────────────────────────────────────────── */
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return activeId;
}

/* ── Main Component ────────────────────────────────────────────── */
export default function CookiePolicy() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeId   = useActiveSection(sectionIds);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '28%']);

  return (
    <div className="bg-white overflow-x-hidden">
      <ReadingProgress />

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[62vh] overflow-hidden">
        {/* Parallax image */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroImgY }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,13,24,0.25) 0%, rgba(5,13,24,0.72) 100%)' }}
        />

        {/* Floating orbs */}
        <FloatingOrb color="#1C96BF" size={420} style={{ top: '5%', left: '-5%' }}    duration={10} delay={0} />
        <FloatingOrb color="#f59e0b" size={300} style={{ bottom: '10%', right: '-2%' }} duration={8}  delay={2} />
        <FloatingOrb color="#10b981" size={200} style={{ top: '40%', right: '20%' }}   duration={12} delay={1} />

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(28,150,191,0.6),rgba(14,165,233,0.6),transparent)' }} />
      </section>

      {/* ════════════════════════════════════════════════════════
          INTRO STRIP
      ════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-b border-gray-100">
        <div className="container-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <motion.div variants={blurUp}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-px bg-teal-500" />
                <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.3em]">Legal Document</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
                Cookie <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">
                This policy explains what cookies are, how Tradeflink uses them, and how you can
                manage your preferences across all our services.
              </p>
            </motion.div>
            <motion.div variants={blurUp} className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-xs text-slate-500 shadow-sm">
                <RefreshCw size={13} className="text-teal-500" />
                <span>Last updated: <strong className="text-[#0f172a] font-bold">Recently Updated</strong></span>
                <span className="w-px h-3 bg-gray-200" />
                <span>Version <strong className="text-[#0f172a] font-bold">1.0</strong></span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-700 font-semibold">
                <Shield size={13} className="text-teal-500" />
                ePrivacy & GDPR Compliant
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container-xl">
          <div className="flex gap-12 items-start">

            {/* Sticky sidebar */}
            <motion.aside
              className="hidden xl:block w-72 shrink-0 sticky top-24 self-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="bg-slate-50 rounded-3xl border border-gray-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 mb-4 px-2">
                  Contents
                </p>
                <TableOfContents activeId={activeId} />
              </div>

              {/* Cookie settings card */}
              <motion.div
                className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center mb-4">
                  <ToggleLeft size={18} className="text-teal-600" />
                </div>
                <p className="font-black text-[#0f172a] text-sm mb-1">Manage Cookies</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Update your preferences at any time from our Cookie Settings panel.
                </p>
                <a
                  href="mailto:privacy@tradeflink.com"
                  className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold hover:text-teal-900 transition-colors"
                >
                  privacy@tradeflink.com
                  <ExternalLink size={11} />
                </a>
              </motion.div>

              {/* Related links */}
              <motion.div
                className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs text-slate-400 leading-relaxed">Related legal documents</p>
                <Link
                  to="/privacy-policy"
                  className="flex items-center gap-2 text-teal-600 text-xs font-bold hover:text-teal-800 transition-colors"
                >
                  <Shield size={11} />
                  Privacy Policy
                  <ChevronRight size={11} className="ml-auto" />
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="flex items-center gap-2 text-teal-600 text-xs font-bold hover:text-teal-800 transition-colors"
                >
                  <Lock size={11} />
                  Terms &amp; Conditions
                  <ChevronRight size={11} className="ml-auto" />
                </Link>
              </motion.div>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">

              {/* Intro banner */}
              <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden mb-12 p-8 lg:p-10"
                style={{ background: 'linear-gradient(135deg,#050d18 0%,#0c1f3d 100%)' }}
              >
                <ParticleGrid />
                <FloatingOrb color="#1C96BF" size={250} style={{ top: '-60px', right: '-40px' }} duration={9} />
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Cookie size={14} className="text-teal-400" />
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.28em]">Overview</p>
                  </div>
                  <h2 className="text-xl font-black text-white leading-snug mb-4">
                    Transparency in how we use cookies
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    Cookies help us keep you securely logged in, remember your preferences, and understand
                    how our platform is used so we can keep improving it. We never use cookies for advertising
                    and we never sell your data to third parties.
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    This Cookie Policy should be read alongside our{' '}
                    <Link to="/privacy-policy" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/terms-and-conditions" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                      Terms &amp; Conditions
                    </Link>
                    , which together form the complete agreement governing your use of Tradeflink.
                  </p>
                </div>
              </motion.div>

              {/* Cookie type stat cards */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerFast}
                className="grid sm:grid-cols-4 gap-4 mb-12"
              >
                {[
                  { label: 'Essential',  count: 'Core',    sub: 'Always active',  accent: '#1C96BF', light: 'rgba(28,150,191,0.08)',  Icon: Shield    },
                  { label: 'Analytics',  count: 'Usage',   sub: 'Opt-in',         accent: '#f59e0b', light: 'rgba(245,158,11,0.08)',   Icon: BarChart2 },
                  { label: 'Preference', count: 'Custom',  sub: 'Opt-in',         accent: '#10b981', light: 'rgba(16,185,129,0.08)',   Icon: Sliders   },
                  { label: 'Functional', count: 'Support', sub: 'Opt-in',         accent: '#8b5cf6', light: 'rgba(139,92,246,0.08)',   Icon: Settings  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={popIn}
                    whileHover={{ y: -4, scale: 1.04, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.10)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                    className="flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 bg-white cursor-default"
                  >
                    <motion.div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: item.light }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.Icon size={16} style={{ color: item.accent }} />
                    </motion.div>
                    <p className="text-2xl font-black text-[#0f172a]">{item.count}</p>
                    <div>
                      <p className="font-black text-[#0f172a] text-xs">{item.label}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* All sections */}
              {SECTIONS.map((section, i) => (
                <CookieSection key={section.id} section={section} index={i} />
              ))}

              {/* Cookie reference table */}
              <CookieTableSection />

              {/* Bottom note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-slate-50 border border-gray-100 p-8 mt-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <AlertCircle size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0f172a] mb-2">Policy Versioning</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      This is the current version of Tradeflink's Cookie Policy, recently updated.
                      Previous versions are available on request from privacy@tradeflink.com.
                      We will notify you of any material changes with advance notice before they take effect.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <section className="section bg-[#060f1e] relative overflow-hidden">
        <ParticleGrid />
        <FloatingOrb color="#1C96BF" size={500} style={{ top: '-160px', left: '50%', transform: 'translateX(-50%)' }} duration={12} />

        <div className="container-xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Manage Your Preferences</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
              Questions about <span className="text-gradient">your cookies?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Our Data Protection Officer is happy to explain how we use cookies and help
              you exercise your rights. You can also update your preferences at any time.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:privacy@tradeflink.com"
                className="btn-brand text-sm px-10 py-4"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Contact Our DPO <ArrowRight size={16} />
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
