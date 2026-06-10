import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FAQS = [
  { q: 'How quickly can I get funded after applying?',
    a: 'Most applications are reviewed within a day or two. Once approved, funds can be transferred within a few business days depending on your bank and country.' },
  { q: 'What documents do I need to apply?',
    a: 'Typically: business registration, recent invoices, bank statements, and tax documents. Our team guides you through the exact requirements for your country.' },
  { q: 'Are there any hidden fees?',
    a: 'No. We believe in complete transparency. All fees are clearly outlined upfront before you commit to any transaction, no surprises, ever.' },
  { q: 'Which countries do you operate in?',
    a: 'We currently serve SMEs across many countries spanning Asia, Europe, Africa, and the Americas. We have offices in Dubai, Delhi, Kolkata, Delaware, London, and Istanbul.' },
  { q: 'What is the minimum funding amount?',
    a: "There's no strict minimum. We work with businesses of all sizes, from small invoices to large trade deals, across a wide range of sectors." },
  { q: 'How is my data kept secure?',
    a: 'We use bank-level SSL encryption and comply with international data protection standards including GDPR, ensuring your data is always protected.' },
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  const sectionRef  = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="w-full -mb-20 bg-white" style={{ overflow: 'clip' }}>

      {/* Top rule */}
      <div className="border-t border-gray-100" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

        {/* Section label row */}
        <div className="flex items-center gap-6 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600 mb-2">Got Questions?</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">FAQ</h2>
          </motion.div>
          <motion.div
            className="flex-1 h-px bg-gray-100 hidden lg:block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

          {/* ── Left: numbered question list ── */}
          <div className="lg:pr-14 pb-10 lg:pb-0">
            {FAQS.map((faq, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="w-full text-left group"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`relative flex items-start gap-5 py-6 border-b border-gray-100 last:border-0
                  transition-all duration-200 ${active === i ? 'pl-4' : 'pl-0 hover:pl-2'}`}>

                  {/* Active accent bar */}
                  {active === i && (
                    <motion.div
                      layoutId="faqAccent"
                      className="absolute left-0 top-4 bottom-4 w-0.5 bg-teal-500 rounded-r"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}

                  {/* Number */}
                  <span
                    className="shrink-0 font-black tabular-nums transition-colors duration-200 mt-0.5"
                    style={{
                      fontSize: '2.2rem',
                      lineHeight: 1,
                      color: active === i ? '#1C96BF' : '#e5e7eb',
                    }}
                  >
                    {['01','02','03','04','05','06'][i]}
                  </span>

                  {/* Question text */}
                  <span
                    className="text-sm lg:text-base font-bold leading-snug transition-colors duration-200"
                    style={{ color: active === i ? '#111827' : '#6b7280' }}
                  >
                    {faq.q}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* ── Right: answer panel ── */}
          <div className="lg:pl-14 pt-10 lg:pt-0 flex flex-col justify-center">

            {/* Large decorative question number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ghost number */}
                <p className="font-black leading-none text-gray-100 mb-6 select-none"
                  style={{ fontSize: 'clamp(64px, 8vw, 96px)' }}>
                  {['01','02','03','04','05','06'][active]}
                </p>

                {/* Question repeated */}
                <p className="text-xl lg:text-2xl font-black text-gray-900 leading-snug mb-5">
                  {FAQS[active].q}
                </p>

                {/* Answer */}
                <p className="text-gray-500 leading-relaxed text-base lg:text-lg">
                  {FAQS[active].a}
                </p>

                {/* Still have questions? */}
                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-400">Still have questions?</p>
                  <Link to="/contact">
                    <motion.span
                      className="inline-flex items-center gap-2 text-sm font-bold text-teal-600"
                      whileHover={{ gap: '12px' }}
                      transition={{ duration: 0.2 }}
                    >
                      Talk to our team
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
