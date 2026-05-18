import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Shield, Mail, Phone, ChevronDown } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ── Constants ──────────────────────────────────────────────────── */
const SUBJECTS = [
  'General Inquiry', 'Product Demo', 'Invoice Financing',
  'Supply Chain Finance', 'Export Factoring', 'Partnership', 'Support',
];

const CONFETTI = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  color: ['#1C96BF', '#0ea5e9', '#2dd4bf', '#f59e0b', '#ec4899', '#a78bfa'][i % 6],
  angle: (i / 22) * 360,
  dist: 55 + (i % 5) * 22,
}));

/* ── White input ────────────────────────────────────────────────── */
function WhiteInput({ label, type = 'text', name, value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </label>
      <motion.div
        className="relative overflow-hidden rounded-xl border bg-white"
        animate={{
          borderColor: focused ? 'rgba(28,150,191,0.7)' : 'rgba(0,0,0,0.12)',
          boxShadow: focused
            ? '0 0 0 3px rgba(28,150,191,0.12), 0 2px 12px rgba(28,150,191,0.08)'
            : '0 1px 3px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.2 }}
      >
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required} placeholder={placeholder}
          className="relative w-full bg-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </motion.div>
    </div>
  );
}

/* ── White textarea ─────────────────────────────────────────────── */
function WhiteTextarea({ label, name, value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </label>
      <motion.div
        className="relative overflow-hidden rounded-xl border bg-white"
        animate={{
          borderColor: focused ? 'rgba(28,150,191,0.7)' : 'rgba(0,0,0,0.12)',
          boxShadow: focused
            ? '0 0 0 3px rgba(28,150,191,0.12)'
            : '0 1px 3px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required} rows={4} placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none"
          style={{ fontFamily: 'inherit' }}
        />
      </motion.div>
    </div>
  );
}

/* ── White select ───────────────────────────────────────────────── */
function WhiteSelect({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </label>
      <motion.div
        className="relative overflow-hidden rounded-xl border bg-white"
        animate={{
          borderColor: focused ? 'rgba(28,150,191,0.7)' : 'rgba(0,0,0,0.12)',
          boxShadow: focused
            ? '0 0 0 3px rgba(28,150,191,0.12)'
            : '0 1px 3px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.2 }}
      >
        <select
          name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer pr-10"
          style={{ color: value ? '#1e293b' : '#94a3b8', fontFamily: 'inherit' }}
        >
          <option value="" disabled style={{ background: '#fff', color: '#94a3b8' }}>Select a topic…</option>
          {SUBJECTS.map(s => (
            <option key={s} value={s} style={{ background: '#fff', color: '#1e293b' }}>{s}</option>
          ))}
        </select>
        <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </motion.div>
    </div>
  );
}

/* ── Success state ──────────────────────────────────────────────── */
function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-10 px-6 relative min-h-80"
    >
      {CONFETTI.map(c => (
        <motion.div
          key={c.id}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 7, height: 7, background: c.color, top: '40%', left: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((c.angle * Math.PI) / 180) * c.dist,
            y: Math.sin((c.angle * Math.PI) / 180) * c.dist,
            opacity: 0, scale: 0,
          }}
          transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.12 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full mb-6"
        style={{ background: 'linear-gradient(135deg, #1C96BF, #2dd4bf)' }}
      >
        <CheckCircle2 size={36} className="text-white" />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.65, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle, rgba(28,150,191,0.4) 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-2xl font-black text-slate-800 mb-2"
      >
        Message Sent!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8"
      >
        Our specialists will get back to you within 24 hours. No bots — real people, real answers.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="relative overflow-hidden rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20"
        style={{ background: 'linear-gradient(135deg, #1C96BF, #0ea5e9)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
          animate={{ x: ['-100%', '150%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
        />
        <span className="relative">Send Another</span>
      </motion.button>
    </motion.div>
  );
}

/* ── Stagger variants ───────────────────────────────────────────── */
const formStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const fieldVariant = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Main Modal ─────────────────────────────────────────────────── */
export default function ContactModal({ open, onClose }) {
  const [form,      setForm]      = useState({ name: '', email: '', subject: '', message: '' });
  const [sending,   setSending]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
        setSending(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const text = [
      `Hello TradeFlink,`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      form.subject ? `*Subject:* ${form.subject}` : null,
      ``,
      `*Message:*`,
      form.message,
    ].filter(l => l !== null).join('\n');

    const url = `https://wa.me/917003634890?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          {/* Backdrop — page visible through it */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ── Panel ── */}
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22)]"
            style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(48px) saturate(180%)' }}
            initial={{ opacity: 0, scale: 0.88, y: 36, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)' }}
            exit={{ opacity: 0,   scale: 0.88, y: 36,  filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 290, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle top border gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(28,150,191,0.6), rgba(20,184,166,0.5), transparent)' }}
            />

            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(108deg, transparent 28%, rgba(255,255,255,0.55) 50%, transparent 72%)' }}
              animate={{ x: ['-100%', '150%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 7 }}
            />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white/70 text-slate-500 backdrop-blur-xl shadow-sm"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.95)', color: '#0f172a' }}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.18 }}
            >
              <X size={15} />
            </motion.button>

            {/* ── Inner grid ── */}
            <div className="relative z-10 grid sm:grid-cols-[252px_1fr]">

              {/* ── LEFT PANEL ── */}
              <div
                className="relative flex flex-col justify-between gap-8 overflow-hidden border-b border-black/6 p-8 sm:border-b-0 sm:border-r"
                style={{ background: 'linear-gradient(150deg, #0c1e3a 0%, #0e3a5c 55%, #0a2d4a 100%)' }}
              >
                {/* Ambient orb */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: 320, height: 320, top: -120, left: -100,
                    background: 'radial-gradient(circle, rgba(28,150,191,0.35) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: 200, height: 200, bottom: -80, right: -60,
                    background: 'radial-gradient(circle, rgba(45,212,191,0.2) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />

                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/12 px-3 py-1.5"
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-teal-400"
                      animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-teal-400">TradeFlink</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[1.6rem] font-black leading-[1.1] tracking-tight text-white"
                  >
                    Get in<br />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(90deg, #1C96BF, #2dd4bf)' }}
                    >
                      touch
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2 text-[13px] leading-relaxed text-white/50"
                  >
                    Our team across 6 global offices is ready to help.
                  </motion.p>

                  <motion.div
                    className="mt-6 space-y-2"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } } }}
                  >
                    {[
                      { emoji: '⚡', label: 'Response within 24h' },
                      { emoji: '🔒', label: '100% Confidential' },
                      { emoji: '🌍', label: '6 Global Offices' },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.07] px-3.5 py-2.5"
                        whileHover={{ borderColor: 'rgba(45,212,191,0.35)', x: 4, transition: { duration: 0.2 } }}
                      >
                        <span className="text-sm leading-none">{item.emoji}</span>
                        <span className="text-[12px] font-medium text-white/60">{item.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  className="relative space-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {[
                    { Icon: Mail,         text: 'info@tradeflink.com',  href: 'mailto:info@tradeflink.com' },
                    { Icon: Phone,        text: '+91 70036 34890',       href: 'tel:+917003634890' },
                    { Icon: WhatsAppIcon, text: 'Chat on WhatsApp',      href: 'https://wa.me/917003634890?text=Hello%20TradeFlink%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.', color: '#25D366' },
                  ].map(({ Icon, text, href, color }) => (
                    <motion.a
                      key={text}
                      href={href}
                      target={href.startsWith('https') ? '_blank' : undefined}
                      rel={href.startsWith('https') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2.5 text-white/45 no-underline"
                      whileHover={{ color: color ?? 'rgba(45,212,191,1)', x: 5 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8">
                        <Icon size={12} />
                      </div>
                      <span className="text-[12px] font-medium">{text}</span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT FORM PANEL ── */}
              <div className="p-7 sm:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessState
                      key="success"
                      onReset={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', subject: '', message: '' });
                      }}
                    />
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      variants={formStagger}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                      className="space-y-4"
                    >
                      <motion.p
                        variants={fieldVariant}
                        className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1"
                      >
                        Send a Message
                      </motion.p>

                      <motion.div variants={fieldVariant} className="grid grid-cols-2 gap-3">
                        <WhiteInput
                          label="Full Name" name="name" value={form.name}
                          onChange={handleChange} required placeholder="Sarah Johnson"
                        />
                        <WhiteInput
                          label="Email" type="email" name="email" value={form.email}
                          onChange={handleChange} required placeholder="sarah@co.com"
                        />
                      </motion.div>

                      <motion.div variants={fieldVariant}>
                        <WhiteSelect
                          label="Subject" name="subject" value={form.subject}
                          onChange={handleChange}
                        />
                      </motion.div>

                      <motion.div variants={fieldVariant}>
                        <WhiteTextarea
                          label="Message" name="message" value={form.message}
                          onChange={handleChange} required placeholder="Tell us how we can help…"
                        />
                      </motion.div>

                      <motion.div
                        variants={fieldVariant}
                        className="flex items-center justify-between gap-4 pt-1"
                      >
                        <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <Shield size={10} className="text-teal-500 shrink-0" />
                          Secure & confidential
                        </p>

                        <motion.button
                          type="submit"
                          disabled={sending}
                          className="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-bold text-white shadow-lg shadow-cyan-500/25"
                          style={{ background: sending ? 'rgba(28,150,191,0.5)' : 'linear-gradient(135deg, #1C96BF, #0ea5e9)' }}
                          whileHover={!sending ? { scale: 1.05, boxShadow: '0 14px 36px rgba(28,150,191,0.45)' } : {}}
                          whileTap={!sending ? { scale: 0.94 } : {}}
                          transition={{ duration: 0.18 }}
                        >
                          {!sending && (
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
                              animate={{ x: ['-100%', '150%'] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
                            />
                          )}
                          {sending ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              />
                              <span className="relative">Sending…</span>
                            </>
                          ) : (
                            <>
                              <Send size={13} className="relative shrink-0" />
                              <span className="relative">Send Message</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
