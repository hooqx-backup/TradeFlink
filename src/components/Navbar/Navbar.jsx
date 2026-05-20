import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logos/logo3.png';
import ContactModal from '../ContactModal/ContactModal';

/* ── Nav data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: 'Supply Chain Finance',
    desc: 'Early payments for suppliers',
    href: '/supply-chain-finance',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: 'Export Factoring',
    desc: 'Instant cash on export invoices',
    href: '/export-factoring',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Invoice Financing',
    desc: 'Unlock unpaid invoice liquidity',
    href: '/invoice-financing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Open Account Trade',
    desc: 'Flexible terms, zero defaults',
    href: '/open-account-trade',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'Home',      route: '/' },
  { label: 'About',     route: '/about' },
  { label: 'Service',   href: '/#services', dropdown: SERVICES },
  { label: 'Investors', route: '/investors' },
  { label: 'Exporters', route: '/exporters' },
  { label: 'Contact',   route: '/contact' },
];

/* ── Service mega-dropdown (desktop — untouched) ────────────────── */
function ServiceDropdown({ visible }) {
  return (
    <div
      className={`absolute top-[calc(100%+14px)] left-1/2 w-[480px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden z-50 transition-all duration-200 origin-top ${
        visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}
      style={{ transform: visible ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.95)' }}
    >
      <div className="flex items-center justify-between px-5 py-3.5 bg-linear-to-r from-teal-600 to-sky-500">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">Our Services</p>
          <p className="text-white font-semibold text-sm mt-0.5">Trade finance built for SMEs</p>
        </div>
        <a href="#services" className="text-[11px] font-bold text-white/80 hover:text-white flex items-center gap-1 transition">
          View all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {SERVICES.map((s) => {
          const isPage = s.href.startsWith('/') && !s.href.includes('#');
          const inner = (
            <>
              <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug">{s.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            </>
          );
          return isPage ? (
            <Link key={s.title} to={s.href} className="group flex items-start gap-3 bg-white px-5 py-4 hover:bg-teal-50 transition-colors">{inner}</Link>
          ) : (
            <a key={s.title} href={s.href} className="group flex items-start gap-3 bg-white px-5 py-4 hover:bg-teal-50 transition-colors">{inner}</a>
          );
        })}
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">Ready to grow your business globally?</p>
        <Link to="/export-factoring" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition">
          Get started
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Desktop link (untouched) ───────────────────────────────────── */
function DesktopLink({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);
  const { pathname } = useLocation();
  const isActive = link.route ? pathname === link.route : false;

  const handleEnter = () => { clearTimeout(timerRef.current); setOpen(true); };
  const handleLeave = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (link.dropdown) {
    return (
      <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <button className={`group flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-150 pb-0.5 ${isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}`}>
          {link.label}
          <svg className={`w-3.5 h-3.5 mt-px transition-transform duration-200 ${open ? 'rotate-180 text-teal-600' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-teal-500 transition-all duration-300 ${isActive || open ? 'w-full' : 'w-0 group-hover:w-full'}`} />
        <ServiceDropdown visible={open} />
      </div>
    );
  }

  const cls = `relative group text-[14px] font-semibold transition-colors duration-150 pb-0.5 ${isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}`;
  const underline = <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-teal-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />;
  if (link.route) return <Link to={link.route} className={cls}>{link.label}{underline}</Link>;
  return <a href={link.href} className={cls}>{link.label}{underline}</a>;
}

/* ── Mobile: single nav link ────────────────────────────────────── */
function MobileNavLink({ to, label, onClick }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
        isActive ? 'bg-teal-50/80 text-teal-600' : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="mobile-active-pill"
          className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full bg-teal-500"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="text-[14px] font-semibold tracking-[-0.01em] pl-1">{label}</span>
      <svg
        className={`w-3.5 h-3.5 transition-all duration-200 ${isActive ? 'text-teal-400' : 'text-gray-200 group-hover:text-teal-300 group-hover:translate-x-0.5'}`}
        fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

/* ── Mobile: services accordion ─────────────────────────────────── */
function ServiceAccordion({ link, onClose, isOpen, setOpen }) {
  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
          isOpen ? 'bg-teal-50/80 text-teal-600' : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
        }`}
      >
        <span className="text-[14px] font-semibold tracking-[-0.01em] pl-1">{link.label}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`w-3.5 h-3.5 flex-shrink-0 ${isOpen ? 'text-teal-400' : 'text-gray-300'}`}
          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 px-2 pt-2 pb-3">
              {link.dropdown.map((s) => {
                const isPage = s.href.startsWith('/') && !s.href.includes('#');
                const inner = (
                  <div className="flex flex-col gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-teal-600 group-hover:text-white">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-800 leading-snug group-hover:text-teal-700 transition-colors">{s.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                );
                const cls = "group p-3 rounded-2xl bg-gray-50/80 hover:bg-teal-50 border border-transparent hover:border-teal-100/60 transition-all duration-200";
                return isPage ? (
                  <Link key={s.title} to={s.href} onClick={onClose} className={cls}>{inner}</Link>
                ) : (
                  <a key={s.title} href={s.href} onClick={onClose} className={cls}>{inner}</a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Stagger variants for mobile drawer items ───────────────────── */
const drawerItem = {
  hidden: { opacity: 0, x: -14 },
  show: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.38, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Main Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [contactOpen,   setContactOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-linear-to-r from-white via-white to-teal-50/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
            : 'bg-linear-to-r from-white via-white to-teal-50/60 border-b border-teal-100/60'
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[62px]' : 'h-[74px]'}`}>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="TradeFlink"
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-[46px]' : 'h-[70px]'}`}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => <DesktopLink key={link.label} link={link} />)}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setContactOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-px active:scale-95 transition-all duration-200 cursor-pointer border-0"
                style={{ background: 'linear-gradient(135deg,#1C96BF,#0ea5e9)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-all duration-200"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-0.5 w-6 rounded-full"
                  style={{ background: mobileOpen ? '#1C96BF' : '#374151' }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.22 }}
                  className="block h-0.5 w-5 rounded-full"
                  style={{ background: '#374151' }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-0.5 w-6 rounded-full"
                  style={{ background: mobileOpen ? '#1C96BF' : '#374151' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden absolute inset-x-0 top-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(32px) saturate(200%)',
                WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                borderBottom: '1px solid rgba(28,150,191,0.12)',
                boxShadow: '0 24px 60px rgba(0,0,10,0.14), 0 4px 16px rgba(28,150,191,0.07)',
              }}
            >
              {/* Top teal accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.5), rgba(20,184,166,0.4), transparent)' }}
              />

              <div className="max-w-[1140px] mx-auto px-4 pt-3 pb-5 overflow-y-auto max-h-[calc(100svh-74px)]">

                {/* Nav items */}
                <nav className="space-y-0.5">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      custom={i}
                      variants={drawerItem}
                      initial="hidden"
                      animate="show"
                    >
                      {link.dropdown ? (
                        <ServiceAccordion
                          link={link}
                          onClose={() => setMobileOpen(false)}
                          isOpen={mobileSvcOpen}
                          setOpen={setMobileSvcOpen}
                        />
                      ) : link.route ? (
                        <MobileNavLink
                          to={link.route}
                          label={link.label}
                          onClick={() => setMobileOpen(false)}
                        />
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                        >
                          <span className="pl-1">{link.label}</span>
                          <svg className="w-3.5 h-3.5 text-gray-200 group-hover:text-teal-300 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={drawerItem}
                  initial="hidden"
                  animate="show"
                  className="my-4 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.18), transparent)' }}
                />

                {/* CTA area */}
                <motion.div
                  custom={NAV_LINKS.length + 1}
                  variants={drawerItem}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  <button
                    onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                    className="relative overflow-hidden w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white text-[13px] font-bold uppercase tracking-widest cursor-pointer border-0 shadow-lg shadow-cyan-500/20"
                    style={{ background: 'linear-gradient(135deg,#1C96BF,#0ea5e9)' }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
                      animate={{ x: ['-100%', '150%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
                    />
                    <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="relative">Contact Us</span>
                  </button>

                  {/* Phone strip */}
                  <div className="flex items-center gap-3 py-0.5">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-100" />
                    <a
                      href="tel:+14703809098"
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-teal-600 transition-colors duration-200 tracking-wide"
                    >
                      <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +1-470-380-9098
                    </a>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-100" />
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page overlay when mobile menu is open */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(5,15,35,0.28)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
