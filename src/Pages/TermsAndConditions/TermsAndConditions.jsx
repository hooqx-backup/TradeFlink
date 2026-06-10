import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, Scale, Shield, AlertTriangle, Globe, Lock,
  RefreshCw, ChevronRight, CheckCircle2, ExternalLink,
  Handshake, Ban, CreditCard, Mail, ArrowRight, Users,
  Gavel, BookOpen, Building2,
} from 'lucide-react';
import heroBg from '../../assets/images/termsandcondition.jpg';

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
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[999] pointer-events-none"
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

/* ── Terms data ────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'acceptance',
    Icon: Handshake,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'Acceptance of Terms',
    content: [
      {
        heading: 'Agreement to Terms',
        body: 'By accessing or using any Tradeflink platform, website, application, or service ("Services"), you confirm that you have read, understood, and agree to be legally bound by these Terms and Conditions ("Terms"). If you do not agree, you must cease using our Services immediately.',
      },
      {
        heading: 'Eligibility',
        body: 'You must be at least 18 years of age and have the legal authority to enter into contracts on behalf of yourself or the business you represent. By using our Services, you warrant that you meet these requirements and that all information you provide is accurate and complete.',
      },
      {
        heading: 'Updates to These Terms',
        body: 'Tradeflink reserves the right to modify these Terms at any time. We will notify you of material changes via email and a prominent notice on our platform with advance notice. Continued use of our Services after the effective date of changes constitutes your acceptance of the revised Terms.',
      },
    ],
  },
  {
    id: 'services',
    Icon: Building2,
    accent: '#0ea5e9',
    light: 'rgba(14,165,233,0.08)',
    title: 'Our Services',
    content: [
      {
        heading: 'Scope of Services',
        body: 'Tradeflink provides trade finance solutions including invoice financing, export factoring, supply chain finance, and open account trade protection. Our platform connects exporters, importers, and investors across many countries. The specific services available to you depend on your jurisdiction, account type, and applicable regulatory approvals.',
      },
      {
        heading: 'Service Availability',
        body: 'We strive to maintain continuous platform availability but do not guarantee uninterrupted access. Scheduled maintenance, upgrades, and events beyond our control may temporarily affect service availability. We will provide advance notice of planned downtime where possible.',
      },
      {
        heading: 'Service Modifications',
        body: 'Tradeflink reserves the right to modify, suspend, or discontinue any part of its Services at any time. We will provide reasonable notice where practicable. We are not liable to you or any third party for any modification, suspension, or discontinuation of Services.',
      },
      {
        heading: 'Third-Party Services',
        body: 'Our platform may integrate with or link to third-party services, including banking partners, insurance providers, and identity verification services. Your use of such third-party services is governed by their own terms and policies. Tradeflink is not responsible for the content, accuracy, or practices of third-party services.',
      },
    ],
  },
  {
    id: 'accounts',
    Icon: Users,
    accent: '#a78bfa',
    light: 'rgba(167,139,250,0.08)',
    title: 'Accounts & Registration',
    content: [
      {
        heading: 'Account Creation',
        body: 'To access our Services, you must register for an account and complete our KYC/AML verification process. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date. Failure to maintain accurate information may result in suspension or termination of your account.',
      },
      {
        heading: 'Account Security',
        body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify Tradeflink immediately at security@tradeflink.com if you suspect any unauthorised access to or use of your account. Tradeflink will not be liable for any loss resulting from unauthorised use of your account.',
      },
      {
        heading: 'Account Suspension & Termination',
        body: 'Tradeflink may suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms, engaged in fraudulent or illegal activity, or pose a risk to the platform or other users. You may close your account at any time by contacting support, subject to settlement of any outstanding obligations.',
      },
    ],
  },
  {
    id: 'financial-terms',
    Icon: CreditCard,
    accent: '#f59e0b',
    light: 'rgba(245,158,11,0.08)',
    title: 'Financial Terms & Transactions',
    content: [
      {
        heading: 'Fees & Charges',
        body: "Tradeflink charges fees for its Services as set out in your specific facility agreement or as displayed on the platform at the time of transaction. All fees are exclusive of applicable taxes unless stated otherwise. We reserve the right to change our fee structure with reasonable notice to existing clients.",
      },
      {
        heading: 'Transaction Processing',
        body: 'All transactions on the Tradeflink platform are subject to our credit assessment, compliance checks, and approval processes. Submission of a transaction does not guarantee approval or funding. Tradeflink reserves the right to decline any transaction at its sole discretion.',
      },
      {
        heading: 'Payment Obligations',
        body: 'You agree to honour all payment obligations arising from transactions facilitated through our platform on the dates and in the manner specified in your facility agreement. Late payments may attract interest and additional charges as specified in your agreement.',
      },
      {
        heading: 'Currency & Exchange',
        body: 'Transactions may involve multiple currencies. Exchange rates applied are those prevailing at the time of transaction processing. Tradeflink is not liable for losses arising from currency fluctuations between transaction initiation and settlement.',
      },
    ],
  },
  {
    id: 'prohibited-use',
    Icon: Ban,
    accent: '#f43f5e',
    light: 'rgba(244,63,94,0.08)',
    title: 'Prohibited Uses',
    content: [
      {
        heading: 'Unlawful Activity',
        body: 'You may not use our Services for any purpose that is unlawful, fraudulent, or prohibited by these Terms. This includes but is not limited to money laundering, terrorist financing, sanctions evasion, tax fraud, or any other financial crime. Tradeflink actively monitors for suspicious activity and will report it to the relevant authorities.',
      },
      {
        heading: 'Platform Misuse',
        body: "You may not attempt to gain unauthorised access to any part of our platform or its related systems, introduce malicious code, reverse engineer our software, scrape data without permission, or interfere with the proper functioning of the platform or other users' access to it.",
      },
      {
        heading: 'Misrepresentation',
        body: 'You may not submit false, inaccurate, or misleading information, documentation, or trade data to Tradeflink. This includes fabricated invoices, inflated transaction values, fictitious counterparties, or any other misrepresentation designed to obtain financing or other benefits under false pretences.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    Icon: BookOpen,
    accent: '#10b981',
    light: 'rgba(16,185,129,0.08)',
    title: 'Intellectual Property',
    content: [
      {
        heading: 'Tradeflink Ownership',
        body: 'All content, software, technology, trademarks, logos, and intellectual property on the Tradeflink platform are owned by or licensed to Tradeflink. Nothing in these Terms grants you any right, title, or interest in our intellectual property beyond the limited licence to use our Services as expressly permitted.',
      },
      {
        heading: 'Limited Licence',
        body: 'Tradeflink grants you a limited, non-exclusive, non-transferable, revocable licence to access and use our platform solely for your own internal business purposes in accordance with these Terms. This licence does not permit you to copy, modify, distribute, or create derivative works from our platform or content.',
      },
      {
        heading: 'Your Content',
        body: 'You retain ownership of all data and documentation you upload to our platform. By uploading content, you grant Tradeflink a limited licence to use, process, and store that content solely for the purpose of providing the Services. You warrant that you have the right to upload such content and that it does not infringe any third-party rights.',
      },
    ],
  },
  {
    id: 'liability',
    Icon: Scale,
    accent: '#6366f1',
    light: 'rgba(99,102,241,0.08)',
    title: 'Limitation of Liability',
    content: [
      {
        heading: 'Disclaimer of Warranties',
        body: 'Our Services are provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Tradeflink does not warrant that the Services will be error-free, uninterrupted, or free of viruses or other harmful components.',
      },
      {
        heading: 'Limitation of Damages',
        body: "To the maximum extent permitted by applicable law, Tradeflink's total liability to you for any claims arising from or related to these Terms or our Services shall not exceed the fees you paid to Tradeflink in the period preceding the claim. In no event shall Tradeflink be liable for indirect, incidental, special, consequential, or punitive damages.",
      },
      {
        heading: 'Indemnification',
        body: 'You agree to indemnify, defend, and hold harmless Tradeflink and its officers, directors, employees, agents, and partners from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from your use of our Services, violation of these Terms, or infringement of any third-party rights.',
      },
    ],
  },
  {
    id: 'governing-law',
    Icon: Gavel,
    accent: '#06b6d4',
    light: 'rgba(6,182,212,0.08)',
    title: 'Governing Law & Disputes',
    content: [
      {
        heading: 'Governing Law',
        body: 'These Terms are governed by and construed in accordance with the laws of the Dubai International Financial Centre (DIFC), United Arab Emirates, without regard to its conflict of law provisions. For users in the European Union or United Kingdom, mandatory consumer protection laws of your jurisdiction shall also apply to the extent required by law.',
      },
      {
        heading: 'Dispute Resolution',
        body: 'In the event of a dispute, we encourage you to contact us first at legal@tradeflink.com to seek an informal resolution. If the dispute cannot be resolved informally within a reasonable timeframe, it shall be submitted to binding arbitration under the DIFC-LCIA Arbitration Rules, conducted in English in Dubai.',
      },
      {
        heading: 'Class Action Waiver',
        body: 'To the extent permitted by applicable law, you agree to resolve disputes with Tradeflink on an individual basis only and waive any right to participate in a class action lawsuit or class-wide arbitration. This waiver does not apply where prohibited by law.',
      },
    ],
  },
  {
    id: 'confidentiality',
    Icon: Lock,
    accent: '#8b5cf6',
    light: 'rgba(139,92,246,0.08)',
    title: 'Confidentiality',
    content: [
      {
        heading: 'Mutual Confidentiality',
        body: "Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared in connection with the Services (\"Confidential Information\"). Neither party shall disclose Confidential Information to any third party without the other's prior written consent, except as required by law or regulation.",
      },
      {
        heading: 'Exceptions',
        body: 'Confidentiality obligations do not apply to information that is or becomes publicly available through no fault of the receiving party, was known to the receiving party prior to disclosure, is independently developed by the receiving party, or is disclosed pursuant to a valid court order or regulatory requirement.',
      },
    ],
  },
  {
    id: 'general',
    Icon: Shield,
    accent: '#1C96BF',
    light: 'rgba(28,150,191,0.08)',
    title: 'General Provisions',
    content: [
      {
        heading: 'Entire Agreement',
        body: 'These Terms, together with our Privacy Policy, any facility agreements, and any other agreements you enter into with Tradeflink, constitute the entire agreement between you and Tradeflink with respect to the subject matter hereof and supersede all prior agreements, representations, and understandings.',
      },
      {
        heading: 'Severability',
        body: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it enforceable.',
      },
      {
        heading: 'No Waiver',
        body: "Tradeflink's failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. Any waiver must be in writing and signed by an authorised representative of Tradeflink to be effective.",
      },
      {
        heading: 'Contact Us',
        body: 'For any questions about these Terms, please contact our legal team at legal@tradeflink.com or write to us at Tradeflink, Gate Avenue, DIFC, Dubai, UAE. We aim to respond to all legal enquiries promptly.',
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
                layoutId="toc-pill-terms"
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
function TermsSection({ section, index }) {
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
            Clause {String(index + 1).padStart(2, '0')}
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
export default function TermsAndConditions() {
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeId   = useActiveSection(sectionIds);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '28%']);

  return (
    <div className="bg-white overflow-x-hidden">
      <ReadingProgress />

      {/* ════════════════════════════════════════════════════════
          HERO, parallax + floating orbs + title overlay
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
        <FloatingOrb color="#1C96BF" size={420} style={{ top: '5%', left: '-5%' }}  duration={10} delay={0} />
        <FloatingOrb color="#0ea5e9" size={300} style={{ bottom: '10%', right: '-2%' }} duration={8}  delay={2} />
        <FloatingOrb color="#8b5cf6" size={200} style={{ top: '40%', right: '20%' }} duration={12} delay={1} />

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
              <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
                Terms &amp; <span className="text-gradient">Conditions</span>
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">
                Please read these terms carefully before using the Tradeflink platform or services.
                They govern your relationship with us.
              </p>
            </motion.div>
            <motion.div variants={blurUp} className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-xs text-slate-500 shadow-sm">
                <RefreshCw size={13} className="text-teal-500" />
                <span>Last updated: <strong className="text-[#0f172a] font-bold">Recently Updated</strong></span>
                <span className="w-px h-3 bg-gray-200" />
                <span>Version <strong className="text-[#0f172a] font-bold">3.0</strong></span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-700 font-semibold">
                <Gavel size={13} className="text-teal-500" />
                Governed by DIFC Law, Dubai UAE
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

            {/* Sticky sidebar, slide in from left */}
            <motion.aside
              className="hidden xl:block w-72 shrink-0 sticky top-24 self-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="bg-slate-50 rounded-3xl border border-gray-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 mb-4 px-2">
                  Clauses
                </p>
                <TableOfContents activeId={activeId} />
              </div>

              {/* Legal contact card */}
              <motion.div
                className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center mb-4">
                  <Scale size={18} className="text-teal-600" />
                </div>
                <p className="font-black text-[#0f172a] text-sm mb-1">Legal Queries?</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Our legal team responds promptly.
                </p>
                <a
                  href="mailto:legal@tradeflink.com"
                  className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold hover:text-teal-900 transition-colors"
                >
                  legal@tradeflink.com
                  <ExternalLink size={11} />
                </a>
              </motion.div>

              {/* Privacy policy link */}
              <motion.div
                className="mt-4 rounded-2xl border border-gray-100 bg-white p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  These Terms are read alongside our Privacy Policy.
                </p>
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-2 text-teal-600 text-xs font-bold hover:text-teal-800 transition-colors"
                >
                  Read Privacy Policy
                  <ChevronRight size={12} />
                </Link>
              </motion.div>
            </motion.aside>

            {/* Terms content */}
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
                    <AlertTriangle size={14} className="text-amber-400" />
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.28em]">Important Notice</p>
                  </div>
                  <h2 className="text-xl font-black text-white leading-snug mb-4">
                    These Terms form a legally binding agreement
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    These Terms and Conditions ("Terms") govern your access to and use of all products
                    and services offered by Tradeflink and its subsidiaries ("Tradeflink", "we", "our", "us").
                    By registering an account, submitting a transaction, or otherwise using our Services,
                    you agree to be bound by these Terms.
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    These Terms should be read alongside our{' '}
                    <Link to="/privacy-policy" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                      Privacy Policy
                    </Link>{' '}
                    and any specific facility agreements you enter into with Tradeflink, which together
                    form the complete agreement between you and Tradeflink.
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
                  { Icon: Globe,     label: 'DIFC Governed',  sub: 'Dubai, UAE law applies',      accent: '#1C96BF', light: 'rgba(28,150,191,0.08)'  },
                  { Icon: FileText,  label: 'Clear Structure', sub: 'Plain-language terms',        accent: '#0ea5e9', light: 'rgba(14,165,233,0.08)'   },
                  { Icon: RefreshCw, label: 'Version 3.0',     sub: 'Current Version',             accent: '#10b981', light: 'rgba(16,185,129,0.08)'   },
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
                <TermsSection key={section.id} section={section} index={i} />
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
                    <AlertTriangle size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0f172a] mb-2">Document Versioning</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      This is the current version of Tradeflink's Terms and Conditions, recently updated,
                      superseding all prior versions. Previous versions are available on request from
                      legal@tradeflink.com. If you accepted a prior version and wish to review what
                      has changed, please contact our legal team.
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
              <Eyebrow dark>Questions?</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
              Need help understanding <span className="text-gradient">these terms?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Our legal team is happy to clarify any aspect of these Terms. Reach out
              before you sign, we believe informed clients make better partners.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:legal@tradeflink.com"
                className="btn-brand text-sm px-10 py-4"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Contact Legal Team <ArrowRight size={16} />
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
                  General Contact
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
