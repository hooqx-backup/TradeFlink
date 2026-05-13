import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { num: 4.5,  suffix: 'T+', prefix: '$', label: 'Global Trade Finance Gap',  sub: 'Addressable market — the problem we exist to solve', decimals: 1 },
  { num: 70,   suffix: '+',  prefix: '',  label: 'Countries Served',           sub: 'Every major trade corridor, covered' },
  { num: 1000, suffix: '+',  prefix: '',  label: 'Businesses Funded',          sub: 'SMEs empowered to trade without limits' },
  { num: 2,    suffix: 'B+', prefix: '$', label: 'Invoices Financed',          sub: 'Capital deployed across global supply chains' },
];

function useCountUp(target, decimals = 0, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, decimals]);
  return val;
}

function StatRow({ stat, index, trigger }) {
  const val = useCountUp(stat.num, stat.decimals ?? 0, trigger);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative flex items-center gap-0 border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, x: -40 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'linear-gradient(to right, rgba(28,150,191,0.04), transparent)' }}
      />

      {/* Active left border */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-500 rounded-r"
        animate={{ scaleY: hovered ? 1 : 0 }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 0.25 }}
      />

      {/* Number */}
      <div className="relative w-56 lg:w-72 shrink-0 py-8 lg:py-10 pl-6 lg:pl-10">
        <span
          className="font-black leading-none tracking-tight tabular-nums"
          style={{
            fontSize: 'clamp(52px, 6vw, 88px)',
            color: hovered ? '#1C96BF' : '#111827',
            transition: 'color 0.3s',
          }}
        >
          {stat.prefix}{stat.decimals ? val.toFixed(stat.decimals) : Math.round(val).toLocaleString()}{stat.suffix}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-gray-100 shrink-0" />

      {/* Label */}
      <div className="px-8 lg:px-16 py-8">
        <p className="text-lg lg:text-xl font-black text-gray-900 mb-1">{stat.label}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{stat.sub}</p>
      </div>

      {/* Index number — far right */}
      <motion.span
        className="absolute right-6 lg:right-10 text-xs font-bold uppercase tracking-widest"
        animate={{ color: hovered ? '#1C96BF' : '#d1d5db' }}
        transition={{ duration: 0.3 }}
      >
        0{index + 1}
      </motion.span>
    </motion.div>
  );
}

export default function Stats() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="w-full bg-white" style={{ overflow: 'clip' }}>

      {/* Header strip */}
      <div className="border-b border-gray-100 px-6 sm:px-10 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            By The Numbers
          </motion.span>
          <motion.div
            className="h-px flex-1 mx-8 bg-gray-100"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.22em] text-teal-500"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            TradeFlink
          </motion.span>
        </div>
      </div>

      {/* Stat rows */}
      <div className="max-w-7xl mx-auto">
        {STATS.map((stat, i) => (
          <StatRow key={stat.label} stat={stat} index={i} trigger={inView} />
        ))}
      </div>

    </section>
  );
}
