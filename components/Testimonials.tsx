'use client';

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/data';
import SectionMark from '@/components/SectionMark';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Spotlight (in percentage, for radial-gradient)
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(540px circle at ${sx}% ${sy}%, rgba(201, 169, 97, 0.18), rgba(176, 137, 104, 0.08) 30%, transparent 65%)`;

  // Custom cursor (in pixels)
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const csx = useSpring(cx, { stiffness: 280, damping: 28, mass: 0.5 });
  const csy = useSpring(cy, { stiffness: 280, damping: 28, mass: 0.5 });
  const csxDot = useSpring(cx, { stiffness: 500, damping: 30, mass: 0.3 });
  const csyDot = useSpring(cy, { stiffness: 500, damping: 30, mass: 0.3 });

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % testimonials.length), 7500);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
    // Viewport coords for fixed-position custom cursor
    cx.set(e.clientX);
    cy.set(e.clientY);
  };

  const t = testimonials[i];

  return (
    <section
      id="journal"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => setCursorActive(false)}
      className="relative bg-espresso text-cream py-28 md:py-40 overflow-hidden md:cursor-none"
    >
      <SectionMark numeral="IV" label="Преса" tone="gold" />
      {/* Cursor-following spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Static ambient gradient */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 25% 30%, #C9A961 0%, transparent 55%), radial-gradient(circle at 75% 70%, #B08968 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Custom cursor — ring + dot, mix-blend-difference */}
      <motion.div
        aria-hidden
        style={{
          x: csx,
          y: csy,
          opacity: cursorActive ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        className="hidden md:block fixed pointer-events-none z-50 -ml-5 -mt-5 w-10 h-10 rounded-full border border-cream transition-opacity duration-300"
      />
      <motion.div
        aria-hidden
        style={{
          x: csxDot,
          y: csyDot,
          opacity: cursorActive ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        className="hidden md:block fixed pointer-events-none z-50 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cream transition-opacity duration-300"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-[11px] uppercase tracking-widest text-gold mb-10 text-center flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gold/40" />
          Преса · От уста на уста
          <span className="h-px w-8 bg-gold/40" />
        </motion.p>

        <div className="relative min-h-[280px] md:min-h-[320px] flex items-center justify-center">
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-12 md:-top-16 left-0 md:-left-4 font-serif italic font-light text-[10rem] md:text-[14rem] leading-none text-gold/15 select-none pointer-events-none"
          >
            “
          </motion.span>
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-20 md:-bottom-24 right-0 md:-right-4 font-serif italic font-light text-[10rem] md:text-[14rem] leading-none text-gold/15 select-none pointer-events-none"
          >
            ”
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              <p className="font-serif font-light text-3xl md:text-5xl leading-[1.15] tracking-tight italic">
                {t.quote}
              </p>
              <footer className="mt-12 text-[11px] uppercase tracking-widest text-cream/70 flex items-center justify-center gap-3">
                <span className="text-gold">— {t.author}</span>
                <span className="h-px w-6 bg-cream/30" />
                <span>{t.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Покажи отзив ${j + 1}`}
              className="group relative h-3 flex items-center cursor-pointer md:cursor-none"
            >
              <span
                className={`block h-px transition-[width,background-color] duration-700 ease-luxe ${
                  j === i ? 'w-12 bg-gold' : 'w-6 bg-cream/30 group-hover:bg-cream/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
