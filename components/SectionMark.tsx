'use client';

import { motion } from 'framer-motion';

type Props = {
  numeral: string;
  label: string;
  /** Color tone — defaults to camel; use 'gold' for dark sections. */
  tone?: 'camel' | 'gold';
};

export default function SectionMark({ numeral, label, tone = 'camel' }: Props) {
  const accent = tone === 'gold' ? 'text-gold' : 'text-camel';
  const muted = tone === 'gold' ? 'text-cream/55' : 'text-taupe/65';
  const line = tone === 'gold' ? 'bg-gold/40' : 'bg-camel/45';

  return (
    <div className="absolute top-6 md:top-10 left-6 md:left-10 z-20 pointer-events-none flex items-center gap-3 md:gap-4">
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif italic font-light text-base md:text-lg ${accent} leading-none`}
      >
        {numeral}
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className={`h-px w-6 md:w-10 ${line}`}
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`text-[10px] uppercase tracking-widest ${muted}`}
      >
        {label}
      </motion.span>
    </div>
  );
}
