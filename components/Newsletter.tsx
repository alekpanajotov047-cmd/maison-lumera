'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUp, stagger } from '@/lib/motion';
import SectionMark from '@/components/SectionMark';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative bg-cream py-28 md:py-36 border-t border-border overflow-hidden">
      <SectionMark numeral="V" label="Писма" />
      {/* Ornament — hairline crosshair, drawn on view */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24 bg-gradient-to-r from-transparent via-camel/60 to-transparent"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger(0.1, 0.1)}
        className="max-w-3xl mx-auto px-6 md:px-10 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] uppercase tracking-widest text-camel mb-5 flex items-center justify-center gap-3"
        >
          <span aria-hidden className="font-serif italic text-base text-camel/70">✦</span>
          Писма от Maison
          <span aria-hidden className="font-serif italic text-base text-camel/70">✦</span>
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-serif font-light text-3xl md:text-5xl tracking-tight leading-[1.1]">
          Кратко писмо, четири пъти в годината, за това какво <span className="italic text-camel">цъфти в Грас</span>.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-taupe mt-6 max-w-xl mx-auto leading-relaxed">
          Абонатите получават ранен достъп до нови композиции и покана за
          ежегодното отваряне на ателието.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={onSubmit}
          className="mt-12 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Имейл адрес
          </label>
          <div className="relative flex-1">
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="вашият@имейл.bg"
              disabled={submitted}
              className="w-full bg-transparent outline-none px-1 py-3 text-espresso placeholder:text-taupe/60"
            />
            {/* Static baseline */}
            <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-espresso/25" />
            {/* Animated overlay — draws left-to-right on focus */}
            <motion.span
              aria-hidden
              initial={false}
              animate={{ scaleX: focused || email ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-camel"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="group relative text-[11px] uppercase tracking-widest border border-espresso px-6 py-3 overflow-hidden cursor-pointer disabled:cursor-not-allowed transition-colors duration-500 ease-luxe"
          >
            {/* Background sweep on hover */}
            <span
              aria-hidden
              className="absolute inset-0 bg-espresso translate-x-[-101%] group-hover:translate-x-0 group-disabled:translate-x-0 transition-transform duration-[700ms] ease-luxe"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={submitted ? 'done' : 'idle'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-flex items-center gap-2 text-espresso group-hover:text-cream group-disabled:text-cream transition-colors duration-500"
              >
                {submitted ? (
                  <>
                    <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        d="M3 10l4 4 10-10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-serif italic normal-case tracking-normal">Благодарим.</span>
                  </>
                ) : (
                  <>
                    Абонирай се
                    <svg viewBox="0 0 24 8" className="w-5 h-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0 4h22M18 1l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.form>

        <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-widest text-taupe/70 mt-6">
          Без маркетинг. Без проследяване. Отписване по всяко време.
        </motion.p>
      </motion.div>
    </section>
  );
}
