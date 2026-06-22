'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { fragrances } from '@/lib/data';
import { fadeUp, stagger } from '@/lib/motion';
import { Tilt3D } from '@/components/ui/3d-card';
import SectionMark from '@/components/SectionMark';

function GhostNumber({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const numerals = ['01', '02', '03', '04'];

  return (
    <motion.span
      ref={ref}
      aria-hidden
      style={{ y }}
      className="pointer-events-none absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 font-serif italic font-light leading-none text-espresso/[0.045] select-none whitespace-nowrap"
    >
      <span className="text-[20vw] md:text-[14vw] tracking-tighter">
        {numerals[index] ?? String(index + 1).padStart(2, '0')}
      </span>
    </motion.span>
  );
}

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: fragrances.map((f, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `Maison Lumèra — ${f.name}`,
      description: f.subtitle,
      brand: { '@type': 'Brand', name: 'Maison Lumèra' },
      category: f.family,
      offers: {
        '@type': 'Offer',
        price: f.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    },
  })),
};

export default function Collection() {
  return (
    <section id="collection" className="relative bg-cream py-28 md:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <SectionMark numeral="I" label="Колекцията" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.1, 0.12)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-widest text-camel mb-4"
            >
              Колекцията · IV композиции
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-light text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-2xl"
            >
              Четири бутилки, <span className="italic text-camel">четири часа</span> от деня.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-taupe max-w-sm leading-relaxed text-[15px]"
          >
            Всеки аромат е създаден от майстор-парфюмера Елоди Васьор в
            ограничени партиди от по 400 бутилки годишно.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
          {fragrances.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="relative"
            >
              {/* Ghost number — sits behind the card, scrolls at different rate */}
              <GhostNumber index={i} />

              <Tilt3D
                maxTilt={22}
                hoverScale={1.05}
                perspective={900}
                wrapperClassName="h-full relative z-10"
                className="group cursor-pointer h-full"
              >
                <article>
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand rounded-sm">
                    <div style={{ transform: 'translateZ(80px)' }} className="absolute inset-0">
                      <Image
                        src={f.image}
                        alt={`${f.name} парфюмна бутилка`}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.08]"
                      />
                    </div>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `linear-gradient(180deg, transparent 40%, ${f.accent}55 100%)`,
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-cream/90 mix-blend-difference"
                      style={{ transform: 'translateZ(120px)' }}
                    >
                      {f.number}
                    </div>

                    {/* Family chip — fades in on hover */}
                    <div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-luxe"
                      style={{ transform: 'translateZ(140px)' }}
                    >
                      <span className="bg-cream/95 backdrop-blur-sm text-espresso text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm font-serif italic normal-case">
                        {f.family}
                      </span>
                    </div>

                    <div
                      className="absolute bottom-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-luxe"
                      style={{ transform: 'translateZ(160px)' }}
                    >
                      <span className="bg-cream text-espresso text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        Виж
                      </span>
                    </div>
                  </div>

                  <div
                    className="pt-6 flex items-start justify-between gap-4"
                    style={{ transform: 'translateZ(60px)' }}
                  >
                    <div>
                      <h3 className="font-serif text-2xl leading-tight">{f.name}</h3>
                      <p className="text-sm text-taupe mt-1.5 leading-snug italic">
                        {f.subtitle}
                      </p>
                      {/* Always-visible family caption — subtle */}
                      <p className="text-[10px] uppercase tracking-widest text-camel/80 mt-3 font-serif italic normal-case">
                        {f.family}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-lg">€{f.price}</p>
                      <p className="text-[10px] uppercase tracking-widest text-taupe mt-1">
                        {f.volume}
                      </p>
                    </div>
                  </div>
                </article>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
