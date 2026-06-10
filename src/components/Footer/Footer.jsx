import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/logo4.png';
import footerBg from '../../assets/images/18459.webp';

const MotionLink = motion(Link);

/* ── Nav columns ────────────────────────────────────────────── */
const NAV = [
  {
    title: 'Company',
    links: [
      { label: 'About Us',     href: '#about' },
      { label: 'Exporters',    to: '/exporters' },
      { label: 'Investors',    href: '#investors' },
      { label: 'Case Studies', to: '/case-studies' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Supply Chain Finance', href: '#services' },
      { label: 'Export Factoring',     href: '#services' },
      { label: 'Invoice Financing',    href: '#services' },
      { label: 'Open Account Trade',   href: '#services' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',   to: '/privacy-policy' },
      { label: 'Terms and Conditions', to: '/terms-and-conditions' },
      { label: 'Cookie Policy',    to: '/cookie-policy' },
      
    ],
  },
];

const OFFICES = ['Dubai', 'Delhi', 'Kolkata', 'Delaware', 'London', 'Istanbul'];

/* ── Floating particles ─────────────────────────────────────── */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left:     `${5 + (i * 6.1) % 90}%`,
  startY:   `${20 + (i * 13) % 70}%`,
  size:     [2, 3, 2, 4, 2, 3][i % 6],
  duration: 8 + (i * 1.3) % 10,
  delay:    (i * 0.6) % 8,
  opacity:  0.12 + (i % 5) * 0.06,
}));

/* ── Social icons ───────────────────────────────────────────── */
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* ── Animation variants ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
  },
});

const containerVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardVar = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── NavLink helper ─────────────────────────────────────────── */
function NavLink({ link }) {
  const Tag = link.to ? MotionLink : motion.a;
  const props = link.to ? { to: link.to } : { href: link.href };
  return (
    <Tag
      {...props}
      className="group relative inline-flex items-center gap-2 pb-2 text-sm text-white/55 transition-colors"
      whileHover={{ x: 6, color: '#ffffff' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span className="relative z-10">{link.label}</span>
      <motion.span
        aria-hidden="true"
        className="relative z-10 ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-400/15 text-teal-200"
        initial={{ opacity: 0, x: -6 }}
        whileHover={{ opacity: 1, x: 4, scale: 1.1, backgroundColor: 'rgba(45,212,191,0.24)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-px w-full origin-left bg-white/70"
        initial={{ scaleX: 0, opacity: 0.35 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-2 -bottom-1 h-5 rounded-full bg-teal-400/12 blur-md"
        initial={{ opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </Tag>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused]       = useState(false);

  const ref      = useRef(null);
  const navRef   = useRef(null);
  const logoRef  = useRef(null);

  const inView     = useInView(ref,    { once: true, margin: '-60px' });
  const navInView  = useInView(navRef,  { once: true, margin: '-60px' });
  const logoInView = useInView(logoRef, { once: true, margin: '-80px' });

  const year = new Date().getFullYear();

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  }

  return (
    <>
      <footer
        ref={ref}
        className="relative w-full text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,10,24,0.6) 0%, rgba(6,12,29,0.72) 50%, rgba(5,10,24,0.82) 100%), url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      {/* ── Top border with shimmer sweep ────────────────────── */}
      <div className="relative h-px w-full overflow-hidden" style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.4), transparent)' }}>
        <motion.div
          className="absolute inset-y-0 w-32 blur-sm"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      </div>

      {/* ── Floating particles ───────────────────────────────── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none rounded-full bg-teal-400"
          style={{
            left: p.left,
            bottom: p.startY,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y:       [0, -120, -240],
            opacity: [0, p.opacity * 1.8, 0],
            scale:   [0.5, 1.2, 0.3],
          }}
          transition={{
            duration:   p.duration,
            delay:      p.delay,
            repeat:     Infinity,
            ease:       'easeOut',
            repeatDelay: 0,
          }}
        />
      ))}

      {/* ── Ambient orbs ────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: -300, left: -200, background: 'radial-gradient(circle, rgba(28,150,191,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: -150, right: -100, background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      {/* Third orb, mid-right, slow drift */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 300, height: 300, top: '40%', right: '20%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Dot grid ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6">

        {/* ── Main grid ──────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

          {/* ── LEFT, brand card ──────────────────────────── */}
          <motion.section
            ref={logoRef}
            className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-xl"
            initial={{ opacity: 0, x: -32 }}
            animate={logoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated inner gradient */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(20,184,166,0.14), transparent 35%), radial-gradient(circle at bottom left, rgba(59,130,246,0.12), transparent 30%)' }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div className="space-y-6 max-w-xl">
                {/* Logo */}
                <motion.a
                  href="#home"
                  className="inline-flex items-center gap-3 w-fit"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                >
                  <img src={logo} alt="TradeFlink" className="h-12 w-auto object-contain" />
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Trade finance, modernized</span>
                </motion.a>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[0.95] tracking-[0.02em] text-white/75">
                    Faster capital for global trade.
                  </h2>
                  <p className="max-w-lg text-sm sm:text-base leading-relaxed text-white/55">
                    Fast, honest trade finance for businesses that can't afford to wait  built for SMEs, active across countries.
                  </p>
                </div>

                {/* Office badges, staggered entry */}
                <motion.div
                  className="flex flex-wrap gap-2.5"
                  variants={containerVar}
                  initial="hidden"
                  animate={logoInView ? 'show' : 'hidden'}
                >
                  {OFFICES.map((city) => (
                    <motion.span
                      key={city}
                      variants={itemVar}
                      className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-medium text-white/70"
                      whileHover={{ scale: 1.08, borderColor: 'rgba(45,212,191,0.5)', color: 'rgba(255,255,255,0.95)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {city}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Phone card */}
                <motion.a
                  href="tel:+14703809098"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70"
                  whileHover={{ borderColor: 'rgba(45,212,191,0.4)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,1)' }}
                  transition={{ duration: 0.25 }}
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-teal-300/80">Call us</span>
                    <span className="mt-1 block font-medium">+1-470-380-9098</span>
                  </span>
                  <motion.span
                    className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/15 text-teal-300"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </motion.span>
                </motion.a>

                {/* Social icons */}
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Follow</p>
                  <div className="mt-3 flex items-center gap-2">
                    {SOCIALS.map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/55"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        whileHover={{ scale: 1.15, borderColor: 'rgba(45,212,191,0.6)', backgroundColor: 'rgb(20,184,166)', color: '#fff', y: 0 }}
                      >
                        {s.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── RIGHT, nav cards ──────────────────────────── */}
          <motion.section
            ref={navRef}
            className="grid gap-4 sm:grid-cols-2"
            variants={containerVar}
            initial="hidden"
            animate={navInView ? 'show' : 'hidden'}
          >
            {/* Company */}
            <motion.div variants={cardVar} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Company</p>
              <ul className="mt-5 space-y-3">
                {NAV[0].links.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div variants={cardVar} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Solutions</p>
              <ul className="mt-5 space-y-3">
                {NAV[1].links.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={cardVar} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Legal</p>
              <ul className="mt-5 space-y-3">
                {NAV[2].links.map((link) => (
                  <li key={link.label}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              variants={cardVar}
              className="rounded-3xl border border-teal-400/15 bg-white/5 p-6 backdrop-blur-xl"
              animate={{ boxShadow: ['0 0 0px rgba(28,150,191,0)', '0 0 18px rgba(28,150,191,0.12)', '0 0 0px rgba(28,150,191,0)'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Newsletter</p>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                Stay ahead of global trade trends.
              </p>

              {subscribed ? (
                <motion.div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  You're subscribed!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                  <motion.div
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                    animate={{ boxShadow: focused ? '0 0 0 1.5px rgba(45,212,191,0.8)' : 'none' }}
                    transition={{ duration: 0.25 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full rounded-2xl bg-linear-to-r from-teal-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20"
                    whileHover={{ scale: 1.02, y: -1, boxShadow: '0 8px 24px rgba(20,184,166,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.section>
        </div>

        {/* ── Copyright bar ──────────────────────────────────── */}
        <motion.div
          className="mt-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-xs text-white/35">
            &copy; {year} TradeFlink. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-white/35">
            {/* Pulsing active indicator */}
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-teal-400"
                  animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              Global offices active
            </span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>Fast. Transparent. Inclusive.</span>
          </div>
        </motion.div>
      </div>
    </footer>
    </>
  );
}
