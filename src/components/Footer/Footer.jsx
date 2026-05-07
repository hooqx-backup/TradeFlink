import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import logo from '../../assets/logos/logo4.png';

/* ── Nav columns ────────────────────────────────────────────── */
const NAV = [
  {
    title: 'Company',
    links: [
      { label: 'About Us',     href: '#about' },
      { label: 'Exporters',    href: '#services' },
      { label: 'Investors',    href: '#investors' },
      { label: 'Case Studies', href: '#' },
      { label: 'Blog',         href: '#' },
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
      { label: 'Privacy Policy',  href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy',   href: '#' },
      { label: 'Compliance',      href: '#' },
    ],
  },
];

const OFFICES = ['Dubai', 'Delhi', 'Kolkata', 'Delaware', 'London', 'Istanbul'];

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

/* ── Animation helpers ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Footer() {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused]     = useState(false);
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const year = new Date().getFullYear();

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  }

  return (
    <footer
      ref={ref}
      className="relative w-full text-white overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060c1d 0%, #091627 60%, #060c1d 100%)' }}
    >
      {/* Top gradient border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #0d9488, transparent)' }} />

      {/* Ambient orbs */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, top: -300, left: -200, background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: -150, right: -100, background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Brand column ── */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-6"
            {...(inView ? fadeUp(0) : { initial: { opacity: 0, y: 28 } })}
          >
            <a href="#home" className="inline-block w-fit">
              <img src={logo} alt="TradeFlink" className="h-12 w-auto object-contain" />
            </a>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Empowering SMEs worldwide with transparent, fast, and technology-driven trade finance solutions across 70+ countries.
            </p>

            {/* Office tags */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-500 mb-3">Global Offices</p>
              <div className="flex flex-wrap gap-2">
                {OFFICES.map((city, i) => (
                  <motion.span
                    key={city}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: 'rgba(13,148,136,0.1)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(13,148,136,0.2)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: 'backOut' }}
                    whileHover={{ borderColor: '#0d9488', color: '#fff', backgroundColor: 'rgba(13,148,136,0.2)' }}
                  >
                    {city}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Phone */}
            <motion.a
              href="tel:+14703809098"
              className="inline-flex items-center gap-2.5 text-sm font-medium group w-fit"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              whileHover={{ color: '#fff' }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(13,148,136,0.15)' }}
                whileHover={{ backgroundColor: '#0d9488', scale: 1.1 }}
                transition={{ duration: 0.25 }}
              >
                <svg className="w-3.5 h-3.5 text-teal-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </motion.span>
              +1-470-380-9098
            </motion.a>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                  whileHover={{ backgroundColor: '#0d9488', color: '#fff', borderColor: '#0d9488', scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Nav columns ── */}
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-500 mb-5">{col.title}</p>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm"
                      style={{ color: 'rgba(255,255,255,0.42)' }}
                      whileHover={{ color: '#fff', x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className="w-1 h-1 rounded-full bg-teal-500 shrink-0"
                        whileHover={{ scale: 1.8 }}
                      />
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Newsletter ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-500 mb-5">Newsletter</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Stay ahead of global trade trends.
            </p>

            {subscribed ? (
              <motion.div
                className="flex items-center gap-2 text-sm text-teal-400 font-semibold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </motion.svg>
                You're subscribed!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  animate={{ boxShadow: focused ? `0 0 0 2px #0d9488` : '0 0 0 1px rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 text-sm font-bold rounded-xl text-white relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(13,148,136,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>

        {/* ── Divider ── */}
        <motion.div
          className="my-10 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &copy; {year} TradeFlink. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                whileHover={{ color: '#0d9488' }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-teal-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs">All systems operational</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
