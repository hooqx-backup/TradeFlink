import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/images/404page.png';

export default function NotFound() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/#services' },
    { label: 'Solutions', path: '/#solutions' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,5,20,0.45) 0%, rgba(0,5,20,0.1) 35%, rgba(0,5,20,0.6) 60%, rgba(0,5,20,0.85) 100%)' }} />

      {/* Top glow accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(10,50,120,0.3) 0%, transparent 70%)' }} />

      {/* ── Subtitle text ── */}
      <motion.p
        className="relative z-10 text-white/70 text-sm sm:text-lg font-light leading-relaxed tracking-widest text-center mt-[7vh] uppercase"
        style={{ textShadow: '0 0 30px rgba(100,160,255,0.5)', letterSpacing: '0.2em' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.62, ease: [0.22, 1, 0.36, 1] }}
      >
        Lost in space
      </motion.p>

      {/* ── 404 number ── */}
      <motion.div
        className="relative z-10 mt-4 select-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.98, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glow bloom */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(30,120,255,0.5) 0%, rgba(10,60,200,0.25) 45%, transparent 75%)',
            filter: 'blur(24px)',
            transform: 'scaleY(1.5) translateY(10%)',
          }} />

        <motion.span
          className="relative leading-none"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(120px, 22vw, 280px)',
            color: 'transparent',
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #c8deff 35%, #6aaeff 70%, #1a6fff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 60px rgba(60,130,255,0.8)) drop-shadow(0 0 140px rgba(30,80,220,0.6))',
            letterSpacing: '0.12em',
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.span>
      </motion.div>

      {/* ── Content below 404 ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center mt-4 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.62, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Page Not Found heading */}
        <h1
          className="text-white font-bold text-xl sm:text-3xl tracking-wide mb-2"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 40px rgba(80,150,255,0.6)' }}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-white text-xs sm:text-sm font-light leading-relaxed max-w-xs sm:max-w-md mb-5"
          style={{ letterSpacing: '0.03em', textShadow: '0 1px 6px rgba(0,0,0,1), 0 1px 6px rgba(0,0,0,1)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
          Let&apos;s get you back on track.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5 w-full max-w-xs sm:max-w-sm">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,160,255,0.5))' }} />
          <span className="text-white/70 text-[10px] tracking-widest uppercase"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>Quick Links</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(100,160,255,0.5), transparent)' }} />
        </div>

        {/* Quick nav links */}
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="text-white text-xs font-semibold uppercase tracking-widest hover:text-blue-300 transition-colors"
              style={{ letterSpacing: '0.15em', textShadow: '0 1px 6px rgba(0,0,0,1), 0 0 20px rgba(80,140,255,0.4)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              whileHover={{ scale: 1.08 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── Back to Homepage Button ── */}
      <motion.div
        className="relative z-20 mt-auto mb-[6vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.44, delay: 0.6 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="relative px-9 py-3 rounded-full text-white text-xs font-bold uppercase tracking-[0.22em] overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.35)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 20px rgba(60,120,255,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
          whileHover={{
            scale: 1.05,
            borderColor: 'rgba(140,200,255,0.7)',
            boxShadow: '0 0 30px rgba(60,140,255,0.35), 0 0 60px rgba(30,80,200,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.36 }}
        >
          <motion.span
            className="absolute inset-y-0 w-12 pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }}
            animate={{ x: [-48, 260] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
          />
          Back to Homepage
        </motion.button>
      </motion.div>
    </div>
  );
}
