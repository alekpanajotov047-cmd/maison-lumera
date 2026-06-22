'use client';

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { fragrances } from '@/lib/data';
import { fadeUp, stagger } from '@/lib/motion';
import SectionMark from '@/components/SectionMark';

const pyramid = [
  { key: 'top', label: 'Връхни ноти', hint: 'Първото впечатление — мимолетно и ярко.' },
  { key: 'heart', label: 'Сърдечни ноти', hint: 'Душата — това, което остава през деня.' },
  { key: 'base', label: 'Базови ноти', hint: 'Споменът — топлина върху кожата вечерта.' },
] as const;

export default function Notes() {
  const [active, setActive] = useState(0);
  const f = fragrances[active];

  return (
    <section id="notes" className="relative bg-sand py-28 md:py-40 overflow-hidden">
      <SectionMark numeral="II" label="Ноти" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger()}
          className="text-center mb-20"
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-widest text-camel mb-4">
            Олфакторната пирамида
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif font-light text-4xl md:text-6xl tracking-tight max-w-3xl mx-auto leading-[1.05]">
            Ароматът се разгръща <span className="italic text-camel">в три действия</span>.
          </motion.h2>
        </motion.div>

        {/* Selector with sliding indicator */}
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-16">
            {fragrances.map((fr, i) => (
              <button
                key={fr.number}
                onClick={() => setActive(i)}
                className={`relative px-5 py-2.5 text-[11px] uppercase tracking-widest transition-colors duration-500 ease-luxe cursor-pointer ${
                  active === i ? 'text-espresso' : 'text-taupe hover:text-espresso/70'
                }`}
              >
                <span className="opacity-60 mr-2 font-serif italic">{fr.number}</span>
                {fr.name}
                {active === i && (
                  <motion.span
                    layoutId="notes-active-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-camel to-transparent"
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Pyramid */}
        <div className="grid md:grid-cols-3 gap-px bg-border/70 border border-border/70 rounded-sm overflow-hidden">
          {pyramid.map((row, i) => {
            const notes = f.notes[row.key];
            return (
              <motion.div
                key={`${f.number}-${row.key}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-cream p-8 md:p-10 flex flex-col min-h-[280px] group/card"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-camel">
                    {row.label}
                  </p>
                  <span className="font-serif italic text-taupe">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="font-serif italic text-taupe text-sm mb-8 leading-relaxed">
                  {row.hint}
                </p>
                <ul className="space-y-3 mt-auto">
                  {notes.map((n, ni) => (
                    <motion.li
                      key={n}
                      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.9,
                        delay: 0.25 + i * 0.12 + ni * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="font-serif text-2xl md:text-3xl leading-tight relative inline-block group/note cursor-default"
                    >
                      <span className="relative inline-block">
                        {n}
                        <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-camel/40 scale-x-0 origin-left transition-transform duration-700 ease-luxe group-hover/note:scale-x-100" />
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
