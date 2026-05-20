import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const MotionLink = motion(Link);

const WORDS = ['TRADE', 'WITHOUT', 'BORDERS.'];

export default function CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040c1e 0%, #071426 55%, #040c1e 100%)', minHeight: '88vh' }}
    >
      {/* Animated gradient orb — dead center */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(28,150,191,0.18) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Thin horizontal rule at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.5), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-3 mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-8 bg-teal-500" />
          <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.22em]">Get Started Today</span>
          <span className="h-px w-8 bg-teal-500" />
        </motion.div>

        {/* The main enormous headline — word by word masked reveal */}
        <h2 className="font-black text-white leading-[0.88] tracking-tighter mb-12 lg:mb-16"
          style={{ fontSize: 'clamp(30px, 5vw, 72px)' }}>
          {WORDS.map((word, i) => (
            <div key={word} className="overflow-hidden block">
              <motion.span
                className={`block ${i === 2 ? 'text-teal-400' : 'text-white'}`}
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h2>

        {/* Subline */}
        <motion.p
          className="text-gray-400 text-lg lg:text-xl max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Join hundreds of SMEs already growing their global trade with TradeFlink. Get funded in days, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.68 }}
        >
          <MotionLink
            to="/contact"
            className="px-10 py-4 rounded-full text-white text-sm font-bold uppercase tracking-widest"
            style={{ background: 'linear-gradient(135deg, #1C96BF, #14b8a6)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(28,150,191,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            Start Trading Now
          </MotionLink>
          <MotionLink
            to="/contact"
            className="px-10 py-4 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-widest"
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.45)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </MotionLink>
        </motion.div>

        {/* Office tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          {['Dubai', 'Delhi', 'Kolkata', 'Delaware', 'London', 'Istanbul'].map((city, i) => (
            <motion.span
              key={city}
              className="px-4 py-1.5 rounded-full text-xs text-white/35 font-medium"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(28,150,191,0.5)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
            >
              {city}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="mt-5 text-xs text-white/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Reach us at{' '}
          <a href="tel:+14703809098" className="text-teal-500 hover:text-teal-300 transition-colors">
            +1-470-380-9098
          </a>
        </motion.p>

      </div>

      {/* Bottom rule */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.3), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
      />

    </section>
  );
}
