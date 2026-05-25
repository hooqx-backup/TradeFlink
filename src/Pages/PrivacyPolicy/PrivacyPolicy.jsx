import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Lock, Eye, Database, Globe, Mail, ArrowRight,
  FileText, Users, AlertCircle, RefreshCw, ChevronRight,
  CheckCircle2, ExternalLink,
} from 'lucide-react';

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

/* ── Policy data ───────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'information-we-collect',
    Icon: Database,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'Information We Collect',
    content: [
      {
        heading: 'Information You Provide Directly',
        body: 'When you register an account, apply for trade finance facilities, or contact our team, we collect personal details such as your full name, business name, registered address, email address, phone number, government-issued identification, and financial documentation required for KYC/AML compliance.',
      },
      {
        heading: 'Transaction & Trade Data',
        body: 'To facilitate trade finance services, we collect invoice data, shipment documentation, counterparty information, bank account details, and transaction history. This data is essential to processing your applications and managing your facilities.',
      },
      {
        heading: 'Automatically Collected Data',
        body: 'When you visit our platform, we automatically collect technical data including your IP address, browser type and version, device identifiers, operating system, pages visited, time spent, referral URLs, and clickstream data. This helps us improve platform performance and security.',
      },
      {
        heading: 'Cookies & Tracking Technologies',
        body: 'We use cookies, web beacons, and similar technologies to authenticate sessions, remember preferences, analyse usage patterns, and deliver relevant content. You can manage cookie preferences through our Cookie Settings centre or your browser settings.',
      },
    ],
  },
  {
    id: 'how-we-use',
    Icon: Eye,
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.08)',
    title: 'How We Use Your Information',
    content: [
      {
        heading: 'Service Delivery',
        body: 'We use your data to process trade finance applications, assess creditworthiness and risk, disburse funds, manage collections, issue payment guarantees, and provide all contracted services. Without this data, we cannot provide our core platform functionality.',
      },
      {
        heading: 'Compliance & Legal Obligations',
        body: 'As a regulated financial services provider, we are legally required to verify your identity (KYC), screen against sanctions lists (AML), report suspicious activity to relevant authorities, and retain records for the periods mandated by financial regulation in each jurisdiction we operate.',
      },
      {
        heading: 'Platform Improvement & Analytics',
        body: 'Aggregated and anonymised usage data helps us understand how our platform is used, identify friction points, prioritise product development, and improve the overall user experience. We never sell anonymised data to third parties.',
      },
      {
        heading: 'Communications',
        body: 'With your consent, we send you transaction notifications, product updates, market insights, and occasional promotional communications. You can opt out of marketing emails at any time through the unsubscribe link in any email or through your account settings.',
      },
    ],
  },
  {
    id: 'data-sharing',
    Icon: Users,
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.08)',
    title: 'Data Sharing & Disclosure',
    content: [
      {
        heading: 'Service Providers & Partners',
        body: 'We share data with carefully vetted third parties who help us deliver our services, including cloud infrastructure providers, identity verification services, credit bureaus, banking partners, and payment processors. All processors operate under strict data processing agreements aligned with applicable law.',
      },
      {
        heading: 'Financial Counterparties',
        body: 'To facilitate transactions, we share relevant trade and business information with investors, correspondent banks, insurance providers, and counterparties on the other side of your transactions. We share only the minimum data necessary to complete each transaction.',
      },
      {
        heading: 'Regulatory & Legal Disclosure',
        body: 'We may disclose your information to regulators, law enforcement agencies, or courts when legally required, for example, under anti-money laundering legislation, court orders, or national security obligations. We will notify you where permitted by law.',
      },
      {
        heading: 'Business Transfers',
        body: 'In the event of a merger, acquisition, or sale of all or substantially all of our assets, your data may be transferred to the acquiring entity. We will notify you in advance and ensure your rights under this Policy are maintained.',
      },
    ],
  },
  {
    id: 'data-security',
    Icon: Lock,
    accent: '#f59e0b',
    light: 'rgba(245,158,11,0.08)',
    title: 'Data Security',
    content: [
      {
        heading: 'Technical Safeguards',
        body: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on ISO 27001-certified cloud providers with multi-region redundancy. We conduct regular penetration testing and vulnerability assessments.',
      },
      {
        heading: 'Access Controls',
        body: 'Access to personal and financial data is strictly controlled on a need-to-know basis. All staff with data access undergo background checks and mandatory security training. Multi-factor authentication is enforced across all internal systems.',
      },
      {
        heading: 'Incident Response',
        body: 'In the event of a data breach that may affect your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours of becoming aware of the incident, in line with GDPR and applicable data protection laws.',
      },
    ],
  },
  {
    id: 'international-transfers',
    Icon: Globe,
    accent: '#10b981',
    light: 'rgba(16,185,129,0.08)',
    title: 'International Data Transfers',
    content: [
      {
        heading: 'Cross-Border Operations',
        body: 'Tradeflink operates globally with offices in Dubai, Delhi, Kolkata, Delaware, London, and Istanbul. Your data may be processed in any of these locations. We ensure all cross-border transfers comply with applicable data protection laws through Standard Contractual Clauses, Adequacy Decisions, or equivalent transfer mechanisms.',
      },
      {
        heading: 'GDPR & UK GDPR',
        body: 'For users in the European Economic Area and United Kingdom, your data transfers are protected by EU Standard Contractual Clauses (SCCs). Our London office acts as the EU/UK data representative. You have the right to request information about the specific transfer mechanisms applicable to your data.',
      },
    ],
  },
  {
    id: 'your-rights',
    Icon: Shield,
    accent: '#f43f5e',
    light: 'rgba(244,63,94,0.08)',
    title: 'Your Rights & Choices',
    content: [
      {
        heading: 'Access & Portability',
        body: 'You have the right to request a copy of the personal data we hold about you, and to receive it in a structured, machine-readable format. Submit a Subject Access Request (SAR) via your account dashboard or by emailing privacy@tradeflink.com.',
      },
      {
        heading: 'Correction & Erasure',
        body: 'You may request correction of inaccurate data at any time. You may also request erasure ("right to be forgotten") where we have no overriding legal basis to retain it, such as an ongoing regulatory obligation or legitimate dispute.',
      },
      {
        heading: 'Restriction & Objection',
        body: 'You have the right to restrict processing of your data in certain circumstances, and to object to processing based on legitimate interests. Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing.',
      },
      {
        heading: 'Automated Decision-Making',
        body: 'Some credit risk assessments involve automated processing. You have the right to request human review of any automated decision that significantly affects you, to express your view, and to contest the outcome. Contact our Risk & Compliance team at compliance@tradeflink.com.',
      },
    ],
  },
  {
    id: 'data-retention',
    Icon: RefreshCw,
    accent: '#06b6d4',
    light: 'rgba(6,182,212,0.08)',
    title: 'Data Retention',
    content: [
      {
        heading: 'Retention Periods',
        body: 'We retain personal data for as long as necessary to deliver services, comply with legal obligations, resolve disputes, and enforce agreements. For financial records, this typically means 7 years from the end of the relevant transaction or relationship, as required by most financial regulators.',
      },
      {
        heading: 'Deletion & Anonymisation',
        body: 'When data is no longer required, we securely delete or anonymise it. Anonymised data that cannot be re-linked to an individual may be retained indefinitely for statistical and research purposes.',
      },
    ],
  },
  {
    id: 'cookies',
    Icon: FileText,
    accent: '#8b5cf6',
    light: 'rgba(139,92,246,0.08)',
    title: 'Cookies Policy',
    content: [
      {
        heading: 'Essential Cookies',
        body: 'These cookies are strictly necessary for the platform to function, managing sessions, maintaining security tokens, and enabling core platform features. They cannot be disabled without breaking core functionality.',
      },
      {
        heading: 'Analytics Cookies',
        body: 'We use analytics cookies (including Google Analytics with IP anonymisation enabled) to understand aggregate usage patterns. These help us identify popular features, measure performance, and improve the platform experience.',
      },
      {
        heading: 'Preference Cookies',
        body: "Preference cookies remember your settings, such as language, currency display, and dashboard layout, so you don't have to reconfigure them each visit.",
      },
      {
        heading: 'Managing Cookies',
        body: 'You can manage or withdraw cookie consent at any time through the Cookie Settings panel accessible from the footer of every page. Note that disabling non-essential cookies will not affect your access to core services.',
      },
    ],
  },
  {
    id: 'contact',
    Icon: Mail,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'Contact & Complaints',
    content: [
      {
        heading: 'Data Protection Officer',
        body: 'For all privacy matters, contact our Data Protection Officer at privacy@tradeflink.com. We aim to respond to all enquiries within 30 days. For Subject Access Requests, the response window may be extended to 90 days for complex requests, with prior notification.',
      },
      {
        heading: 'Supervisory Authority',
        body: 'If you are in the EEA or UK and believe we have not handled your data lawfully, you have the right to lodge a complaint with your local supervisory authority, for example, the ICO in the United Kingdom or your national Data Protection Authority within the EU.',
      },
      {
        heading: 'General Enquiries',
        body: 'For any other questions about this Privacy Policy or our data practices, contact us at: Tradeflink, [Registered Address], or by email at info@tradeflink.com. Our legal team will ensure your enquiry reaches the right person.',
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
                layoutId="toc-pill-privacy"
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
function PolicySection({ section, index }) {
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
      <div className="space-y-6">
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
              <h3 className="text-base font-black text-[#0f172a] mb-2 flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: section.accent }} className="shrink-0" />
                {block.heading}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{block.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Scroll spy hook ───────────────────────────────────────────── */
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
export default function PrivacyPolicy() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeId   = useActiveSection(sectionIds);

  return (
    <div className="bg-white overflow-x-hidden">
      <ReadingProgress />

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
              <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
                Privacy <span className="text-gradient">Policy</span>
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">
                This policy describes how we collect, use, share, and protect your personal information
                across all Tradeflink services and platforms.
              </p>
            </motion.div>
            <motion.div variants={blurUp} className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-xs text-slate-500 shadow-sm">
                <RefreshCw size={13} className="text-teal-500" />
                <span>Last updated: <strong className="text-[#0f172a] font-bold">20 May 2026</strong></span>
                <span className="w-px h-3 bg-gray-200" />
                <span>Version <strong className="text-[#0f172a] font-bold">2.1</strong></span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-700 font-semibold">
                <Shield size={13} className="text-teal-500" />
                GDPR & DIFC DP Law Compliant
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT, sticky sidebar + content
      ════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container-xl">
          <div className="flex gap-12 items-start">

            {/* Sticky sidebar, slide in from left */}
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

              {/* Contact card */}
              <motion.div
                className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center mb-4">
                  <Mail size={18} className="text-teal-600" />
                </div>
                <p className="font-black text-[#0f172a] text-sm mb-1">Privacy Questions?</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Our DPO responds within 30 days.
                </p>
                <a
                  href="mailto:privacy@tradeflink.com"
                  className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold hover:text-teal-900 transition-colors"
                >
                  privacy@tradeflink.com
                  <ExternalLink size={11} />
                </a>
              </motion.div>

              {/* Terms link */}
              <motion.div
                className="mt-4 rounded-2xl border border-gray-100 bg-white p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  This Policy is read alongside our Terms &amp; Conditions.
                </p>
                <Link
                  to="/terms-and-conditions"
                  className="inline-flex items-center gap-2 text-teal-600 text-xs font-bold hover:text-teal-800 transition-colors"
                >
                  Read Terms &amp; Conditions
                  <ChevronRight size={12} />
                </Link>
              </motion.div>
            </motion.aside>

            {/* Policy content */}
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
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.28em] mb-3">Overview</p>
                  <h2 className="text-xl font-black text-white leading-snug mb-4">
                    Your privacy is a core part of how we operate
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    This Privacy Policy applies to all services provided by Tradeflink and its subsidiaries
                    ("Tradeflink", "we", "our", "us"). It describes how we collect, use, share, and protect
                    your personal information. By accessing our platform or services, you acknowledge that
                    you have read and understood this Policy.
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mt-3">
                    We may update this Policy from time to time. We will notify you of material changes
                    via email and by posting a prominent notice on our platform at least 30 days before
                    the changes take effect. Continued use of our services after that date constitutes
                    acceptance of the revised Policy.
                  </p>
                </div>
              </motion.div>

              {/* Key highlights, pop-in stagger */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerFast}
                className="grid sm:grid-cols-3 gap-4 mb-12"
              >
                {[
                  { Icon: Shield,    label: 'GDPR Compliant',   sub: 'EU & UK data standards',       accent: '#1C96BF', light: 'rgba(28,150,191,0.08)'  },
                  { Icon: Lock,      label: 'AES-256 Encrypted', sub: 'Data at rest & in transit',    accent: '#10b981', light: 'rgba(16,185,129,0.08)'   },
                  { Icon: RefreshCw, label: 'Version 2.1',       sub: 'Effective 20 May 2026',        accent: '#0ea5e9', light: 'rgba(14,165,233,0.08)'   },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={popIn}
                    whileHover={{ y: -4, scale: 1.03, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.10)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white cursor-default"
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: item.light }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.Icon size={18} style={{ color: item.accent }} />
                    </motion.div>
                    <div>
                      <p className="font-black text-[#0f172a] text-sm">{item.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* All sections */}
              {SECTIONS.map((section, i) => (
                <PolicySection key={section.id} section={section} index={i} />
              ))}

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
                    <h4 className="font-black text-[#0f172a] mb-2">Policy Changes & Versioning</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Previous versions of this Privacy Policy are available on request. Each version is
                      dated and versioned. This document is version 2.1, effective 20 May 2026, superseding
                      all prior versions. For questions about historical data practices, contact
                      privacy@tradeflink.com.
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
              <Eyebrow dark>Get in Touch</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
              Questions about your <span className="text-gradient">data?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Our Data Protection Officer is here to help. Whether you want to exercise
              your rights, ask about our practices, or raise a concern, we're listening.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:privacy@tradeflink.com"
                className="btn-brand text-sm px-10 py-4"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Email Our DPO <ArrowRight size={16} />
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
