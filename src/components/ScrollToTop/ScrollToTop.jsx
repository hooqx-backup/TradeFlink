import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* 4 orbiting dots evenly spaced */
const ORBIT_DOTS = [0, 90, 180, 270];

/* 6 burst particles on click */
const BURST = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  angle: i * 60,
}));

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [clicked,  setClicked]  = useState(false);
  const [burst,    setBurst]    = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      setVisible(scrolled > 300);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isBottom = progress >= 0.5;

  const handleClick = () => {
    setClicked(true);
    setBurst(true);
    setTimeout(() => setClicked(false), 600);
    setTimeout(() => setBurst(false), 700);
    if (isBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const RADIUS = 22;
  const CIRC   = 2 * Math.PI * RADIUS;
  const dashOff = CIRC * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          aria-label={isBottom ? 'Scroll to top' : 'Scroll to bottom'}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
          style={{ width: 64, height: 64, borderRadius: '9999px', border: 'none', cursor: 'pointer', background: 'none', padding: 0 }}
          initial={{ opacity: 0, scale: 0.3, y: 32, rotate: -90 }}
          animate={{ opacity: 1, scale: 1,   y: 0,  rotate: 0 }}
          exit={{ opacity: 0,   scale: 0.3, y: 32,  rotate: 90 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileTap={{ scale: 0.82 }}
        >

          {/* ── Burst particles on click ── */}
          <AnimatePresence>
            {burst && BURST.map(p => (
              <motion.span
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 6, height: 6,
                  background: p.id % 2 === 0 ? '#1C96BF' : '#2dd4bf',
                  top: '50%', left: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((p.angle * Math.PI) / 180) * 38,
                  y: Math.sin((p.angle * Math.PI) / 180) * 38,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </AnimatePresence>

          {/* ── Pulse ring 1 ── */}
          <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -4,
              border: '1.5px solid rgba(28,150,191,0.5)',
              borderRadius: '9999px',
            }}
            animate={{ scale: [1, 1.55, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* ── Pulse ring 2 (offset) ── */}
          <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -4,
              border: '1.5px solid rgba(45,212,191,0.4)',
              borderRadius: '9999px',
            }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
          />

          {/* ── Soft glow blob ── */}
          <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -8,
              background: 'radial-gradient(circle, rgba(28,150,191,0.28) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── Orbiting dots ── */}
          {ORBIT_DOTS.map((startDeg, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none"
              style={{ width: 64, height: 64, top: 0, left: 0 }}
              animate={{ rotate: [startDeg, startDeg + 360] }}
              transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'linear' }}
            >
              <motion.span
                className="absolute rounded-full"
                style={{
                  width: i % 2 === 0 ? 5 : 3.5,
                  height: i % 2 === 0 ? 5 : 3.5,
                  top: '50%',
                  left: '50%',
                  marginTop: -34,
                  marginLeft: i % 2 === 0 ? -2.5 : -1.75,
                  background: i % 2 === 0
                    ? 'rgba(28,150,191,0.9)'
                    : 'rgba(45,212,191,0.75)',
                  boxShadow: i % 2 === 0
                    ? '0 0 6px rgba(28,150,191,0.9)'
                    : '0 0 5px rgba(45,212,191,0.8)',
                }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
              />
            </motion.span>
          ))}

          {/* ── Progress ring (SVG) ── */}
          <svg
            className="absolute inset-0"
            width="64" height="64"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <circle
              cx="32" cy="32" r={RADIUS}
              fill="none"
              stroke="url(#sg)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOff}
              style={{ transition: 'stroke-dashoffset 0.25s ease' }}
            />
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#1C96BF" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>

          {/* ── Button face ── */}
          <motion.span
            className="relative flex items-center justify-center rounded-full overflow-hidden"
            style={{
              width: 46, height: 46,
              background: 'linear-gradient(135deg, #1C96BF 0%, #0ea5e9 60%, #2dd4bf 100%)',
            }}
            animate={{
              boxShadow: hovered
                ? '0 0 0 3px rgba(28,150,191,0.3), 0 10px 32px rgba(28,150,191,0.65), 0 0 60px rgba(45,212,191,0.2)'
                : clicked
                ? '0 0 0 6px rgba(28,150,191,0.4), 0 12px 40px rgba(28,150,191,0.7)'
                : '0 4px 20px rgba(28,150,191,0.45)',
            }}
            transition={{ duration: 0.22 }}
          >
            {/* Rotating inner highlight */}
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.22) 85%, transparent 100%)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.32) 50%, transparent 75%)' }}
              animate={{ x: ['-120%', '160%'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.2 }}
            />

            {/* Arrow */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={
                clicked
                  ? { y: isBottom ? [-2, -16, 2, 0] : [2, 16, -2, 0], rotate: isBottom ? 0 : 180 }
                  : hovered
                  ? { y: isBottom ? [0, -4, 0] : [0, 4, 0], rotate: isBottom ? 0 : 180 }
                  : { y: 0, rotate: isBottom ? 0 : 180 }
              }
              transition={
                clicked
                  ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  : hovered
                  ? { y: { duration: 0.65, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  : { rotate: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
              }
            >
              <polyline points="18 15 12 9 6 15" />
            </motion.svg>
          </motion.span>

          {/* ── Tooltip ── */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="absolute right-full mr-3 whitespace-nowrap rounded-xl px-3.5 py-2 text-[11px] font-bold text-white pointer-events-none"
                style={{
                  background: 'rgba(6,12,28,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(28,150,191,0.25)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
                initial={{ opacity: 0, x: 10, scale: 0.88 }}
                animate={{ opacity: 1, x: 0,  scale: 1 }}
                exit={{ opacity: 0,    x: 10, scale: 0.88 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #1C96BF, #2dd4bf)' }}
                >
                  {isBottom ? '↑ Back to top' : '↓ Scroll to bottom'}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
