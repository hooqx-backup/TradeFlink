import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import visionImg from '../../../assets/images/vision.jpg';
import missionImg from '../../../assets/images/mission.jpg';
import valuesImg from '../../../assets/images/values.jpg';

const CARDS = [
  {
    num: '01',
    tag: 'Vision',
    title: ['Global Trade', 'for All'],
    description:
      'To make global trade accessible and sustainable for every business, regardless of size or geography.',
    image: visionImg,
    accent: '#1C96BF',
  },
  {
    num: '02',
    tag: 'Mission',
    title: ['Empower', 'Every SME'],
    description:
      'Empower SMEs worldwide with technology-driven trade finance solutions that are transparent, fast, and genuinely inclusive.',
    image: missionImg,
    accent: '#157ea3',
  },
  {
    num: '03',
    tag: 'Values',
    title: ['What', 'Drives Us'],
    description:
      'Transparency, Innovation, Empathy, and Empowerment — core principles that uplift communities and build lasting connections.',
    image: valuesImg,
    accent: '#14b8a6',
    values: ['Transparency', 'Innovation', 'Empathy', 'Empowerment'],
  },
];

function Card({ card, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 280, damping: 28 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <div style={{ perspective: '1100px' }}>
      <motion.article
        ref={ref}
        className="relative overflow-hidden rounded-2xl cursor-pointer select-none"
        style={{ height: '520px', rotateX: rotX, rotateY: rotY }}
        initial={{
          opacity: 0,
          x: index === 0 ? -120 : index === 2 ? 120 : 0,
          y: index === 1 ? -100 : 0,
          scale: index === 1 ? 0.9 : 1,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 2.52, delay: index * 0.22, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image — zooms on hover */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.image})` }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Dark base overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(6,10,25,0.42) 0%, rgba(6,10,25,0.92) 100%)',
          }}
        />

        {/* Accent colour overlay — fades in on hover */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${card.accent}00 0%, ${card.accent}bb 100%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.99, ease: 'easeInOut' }}
        />

        {/* Shimmer sweep on enter */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="shimmer"
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '220%' }}
              exit={{ opacity: 0, transition: { duration: 0.36 } }}
              transition={{ duration: 1.35, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)',
                zIndex: 5,
              }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-7 lg:p-8">

          {/* Top row — decorative number + tag pill */}
          <div className="flex items-start justify-between">
            <motion.span
              className="font-black leading-none"
              style={{ fontSize: '5.5rem', lineHeight: 1, color: 'rgba(255,255,255,0.07)' }}
              animate={{ color: hovered ? `${card.accent}55` : 'rgba(255,255,255,0.07)' }}
              transition={{ duration: 0.72 }}
            >
              {card.num}
            </motion.span>

            <motion.div
              className="mt-1 text-xs font-bold uppercase tracking-[0.15em] rounded-full px-3 py-1 border"
              animate={{
                borderColor: hovered ? card.accent : 'rgba(255,255,255,0.2)',
                color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
                backgroundColor: hovered ? card.accent : 'transparent',
              }}
              transition={{ duration: 0.63 }}
            >
              {card.tag}
            </motion.div>
          </div>

          {/* Bottom text block — lifts on hover */}
          <motion.div
            animate={{ y: hovered ? -10 : 0 }}
            transition={{ duration: 0.81, ease: 'easeOut' }}
          >
            {/* Expanding accent line */}
            <motion.div
              className="rounded-full mb-5"
              style={{ height: 2, backgroundColor: card.accent }}
              animate={{ width: hovered ? 60 : 28 }}
              transition={{ duration: 0.72, ease: 'easeOut' }}
            />

            {/* Title — each line masked-reveals from below */}
            <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
              {card.title.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 1.17,
                      delay: 0.35 + index * 0.12 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h3>

            {/* Description */}
            <motion.p
              className="text-sm leading-relaxed mb-4"
              animate={{
                color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
              }}
              transition={{ duration: 0.63 }}
            >
              {card.description}
            </motion.p>

            {/* Values pills */}
            {card.values && (
              <div className="flex flex-wrap gap-2 mb-5">
                {card.values.map((v, i) => (
                    <motion.span
                    key={v}
                    className="text-xs font-semibold rounded-full px-3 py-1"
                    style={{
                      backgroundColor: `${card.accent}20`,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: `${card.accent}55`,
                    }}
                    animate={{ color: hovered ? '#fff' : card.accent }}
                    transition={{ duration: 0.54, delay: i * 0.05 }}
                  >
                    {v}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Explore CTA */}
            <motion.div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              animate={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <span>Explore</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: hovered ? 6 : 0 }}
                transition={{ duration: 0.54, ease: 'easeOut' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export default function VisionMissionValues() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 bg-gray-50"
      style={{ overflow: 'clip' }}
    >
      {/* Ambient glow — top-right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: -300,
          right: -220,
          background:
            'radial-gradient(circle, rgba(28,150,191,0.18) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient glow — bottom-left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 550,
          height: 550,
          bottom: -220,
          left: -120,
          background:
            'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Dot grid texture — masked so it fades in from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(28,150,191,0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16">

          {/* Eyebrow with animated lines */}
          <motion.div
            className="inline-flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.08 }}
          >
            <motion.span
              className="block h-px bg-teal-500"
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 1.62, delay: 0.2 }}
            />
            <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.22em]">
              Our Purpose
            </span>
            <motion.span
              className="block h-px bg-teal-500"
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 1.62, delay: 0.2 }}
            />
          </motion.div>

          {/* Masked headline */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              className="text-3xl lg:text-4xl font-black text-gray-900"
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Vision, Mission &amp;{' '}
              <span style={{ color: '#1C96BF' }}>Values</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-lg max-w-xl mx-auto text-gray-500"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.26, delay: 0.38 }}
          >
            What drives everything we do at TradeFlink
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {CARDS.map((card, i) => (
            <Card key={card.tag} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
