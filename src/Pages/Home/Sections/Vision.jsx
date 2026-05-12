import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import visionImg from '../../../assets/images/18459.jpg';

const FACTS = [
  { val: '$4.5T+', label: 'Trade Finance Gap' },
  { val: '3.5B+',  label: 'Underserved People' },
  { val: '2030',   label: 'Our Horizon' },
];

export default function Vision() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  return (
    <section ref={sectionRef} id="vision" className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.15 }}>
        <img src={visionImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(4,10,24,0.90) 0%, rgba(4,10,24,0.65) 50%, rgba(4,10,24,0.82) 100%)' }} />
      </motion.div>

      {/* Decorative teal radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(28,150,191,0.12) 0%, transparent 70%)' }} />

      {/* Vertical "01 VISION" label */}
      <motion.div
        className="absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.44, delay: 0.3 }}
      >
        <div className="h-20 w-px bg-linear-to-b from-transparent via-teal-500/50 to-transparent" />
        <span className="text-teal-400/60 text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.35em' }}>
          01 Vision
        </span>
        <div className="h-20 w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />
      </motion.div>

      {/* Main content — parallaxes with scroll */}
      <motion.div className="relative z-10 flex flex-col min-h-screen" style={{ y: textY }}>

        {/* Top eyebrow */}
        <motion.div className="pt-20 lg:pt-28 px-16 lg:px-24 xl:px-32"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.26, delay: 0.1 }}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-teal-500/70" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.25em]">Our Vision</span>
          </div>
        </motion.div>

        {/* Headline + description — center fill */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-20 xl:px-28 py-12">

          {/* GLOBAL TRADE — left, white */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-black text-white leading-[0.88]"
              style={{ fontSize: 'clamp(56px, 9.5vw, 144px)', letterSpacing: '-0.02em' }}
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              GLOBAL TRADE
            </motion.h2>
          </div>

          {/* Thin rule + body text */}
          <motion.div
            className="flex items-start gap-8 my-8 lg:my-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.62, delay: 0.55 }}
          >
            <motion.div
              className="shrink-0 mt-3"
              style={{ transformOrigin: 'left', width: 'clamp(40px, 6vw, 80px)', height: '1px', background: 'rgba(255,255,255,0.2)' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.44, delay: 0.6 }}
            />
            <p className="text-white/45 text-sm lg:text-base max-w-md leading-relaxed">
              A world where every business — regardless of size, country, or capital — competes freely on the global stage.
            </p>
          </motion.div>

          {/* FOR ALL. — right-aligned, teal */}
          <div className="overflow-hidden flex justify-end">
            <motion.h2
              className="font-black text-teal-400 leading-[0.88] text-right"
              style={{ fontSize: 'clamp(56px, 9.5vw, 144px)', letterSpacing: '-0.02em' }}
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              FOR ALL.
            </motion.h2>
          </div>

          {/* Decorative horizontal line */}
          <motion.div
            style={{ transformOrigin: 'left', marginTop: '3rem', height: '1px', background: 'linear-gradient(to right, rgba(28,150,191,0.5), rgba(255,255,255,0.05) 60%, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.6 }}
          />
        </div>

        {/* Bottom stat bar */}
        <motion.div
          className="border-t border-white/10 grid grid-cols-3 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.26, delay: 0.75 }}
        >
          {FACTS.map(({ val, label }, i) => (
            <div key={label}
              className={`px-8 lg:px-14 xl:px-20 py-8 ${i < 2 ? 'border-r border-white/10' : ''}`}>
              <p className="text-2xl lg:text-3xl font-black text-white leading-none mb-1.5">{val}</p>
              <p className="text-xs text-white/25 uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
