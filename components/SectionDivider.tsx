'use client';

import { motion } from 'framer-motion';

type Props = {
  /** Glyph in the middle. @default '✦' */
  glyph?: string;
  /** Background tint of the surrounding band. */
  tone?: 'cream' | 'sand' | 'espresso' | 'tobacco';
};

export default function SectionDivider({ glyph = '✦', tone = 'cream' }: Props) {
  const isDark = tone === 'espresso' || tone === 'tobacco';
  const tobaccoStyle = tone === 'tobacco' ? { background: '#2D2520' } : undefined;
  const bg =
    tone === 'cream'
      ? 'bg-cream'
      : tone === 'sand'
      ? 'bg-sand'
      : tone === 'espresso'
      ? 'bg-espresso'
      : ''; // tobacco handled via inline style
  const lineColor = isDark ? 'via-gold/40' : 'via-camel/50';
  const glyphColor = isDark ? 'text-gold/70' : 'text-camel/70';

  return (
    <div className={`relative w-full ${bg} py-10 md:py-14`} style={tobaccoStyle}>
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-center gap-5 md:gap-7">
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 1 }}
          className={`h-px flex-1 bg-gradient-to-l from-transparent ${lineColor} to-transparent`}
        />
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`font-serif italic text-lg md:text-xl ${glyphColor} select-none`}
        >
          {glyph}
        </motion.span>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className={`h-px flex-1 bg-gradient-to-r from-transparent ${lineColor} to-transparent`}
        />
      </div>
    </div>
  );
}
