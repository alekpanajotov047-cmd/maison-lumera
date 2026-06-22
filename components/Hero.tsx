'use client';

import { motion } from 'framer-motion';
import SmoothScrollHero from '@/components/ui/smooth-scroll-hero';
import { wordReveal } from '@/lib/motion';

const headlineWords = ['Тих', 'език', 'на', 'светлината'];

export default function Hero() {
  return (
    <SmoothScrollHero
      scrollHeight={1200}
      desktopVideo="/hero.mp4"
      mobileVideo="/hero.mp4"
      initialClipPercentage={10}
      finalClipPercentage={90}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="absolute inset-x-0 -top-32 -bottom-32 bg-gradient-to-r from-black/55 via-black/25 to-black/25 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[11px] uppercase tracking-widest text-cream/80 mb-6"
            >
              Висша парфюмерия · Грас · Основана 1948
            </motion.p>

            <h1 className="font-serif font-light leading-[0.95] tracking-tight text-cream text-[clamp(2.8rem,9vw,9rem)]">
              {headlineWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.18em]"
                >
                  <motion.span
                    initial="hidden"
                    animate="show"
                    variants={wordReveal}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className={`inline-block ${
                      i === 1 ? 'italic font-normal text-gold' : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-4 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="font-serif text-base md:text-lg text-cream/85 italic max-w-sm leading-relaxed"
            >
              Четири аромата. Всеки от тях създаден бавно, на ръка, в стара
              цветарска къща над Лазурния бряг.
            </motion.p>

            <motion.a
              href="#collection"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-widest text-cream cursor-pointer"
            >
              <span className="relative">
                Открийте колекцията
                <span className="absolute left-0 right-0 -bottom-1 h-px bg-cream/40 group-hover:bg-cream transition-colors" />
              </span>
              <span className="w-10 h-px bg-cream/40 group-hover:w-16 group-hover:bg-cream transition-all duration-500 ease-luxe" />
            </motion.a>
          </div>
        </div>
      </div>
    </SmoothScrollHero>
  );
}
