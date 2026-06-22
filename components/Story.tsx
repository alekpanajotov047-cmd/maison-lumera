'use client';

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { fadeUp, stagger } from '@/lib/motion';
import SectionMark from '@/components/SectionMark';

type Stat = { value: number; suffix?: string; roman?: string; label: string };

const stats: Stat[] = [
  { value: 77, label: 'Години в Грас' },
  { value: 4, roman: 'IV', label: 'Композиции / год.' },
  { value: 400, label: 'Бутилки на партида' },
];

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22, mass: 1 });

  useEffect(() => {
    if (inView) mv.set(stat.value);
  }, [inView, mv, stat.value]);

  useEffect(() => {
    if (stat.roman) return;
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
  }, [spring, stat.roman]);

  if (stat.roman) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-4xl text-espresso italic font-light"
      >
        {stat.roman}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className="font-serif text-4xl text-espresso tabular-nums">
      0
    </span>
  );
}

function SpotlitImage() {
  // Cursor-following warm spotlight — only on the image
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 80, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 24, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${sx}% ${sy}%, rgba(232, 184, 107, 0.28), rgba(176, 137, 104, 0.12) 35%, transparent 65%)`;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative aspect-[4/5] overflow-hidden rounded-sm"
    >
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <Image
          src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1200&q=80"
          alt="Лавандулови поля и парфюмерийното ателие в Грас"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
      />
    </div>
  );
}

export default function Story() {
  return (
    <section id="maison" className="relative bg-cream py-28 md:py-40 overflow-hidden">
      <SectionMark numeral="III" label="Maison" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-6 relative">
          <SpotlitImage />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute -bottom-6 -right-4 md:-right-10 bg-cream/95 backdrop-blur-sm px-8 py-7 max-w-[20rem] border-l-2 border-camel"
          >
            <p className="text-[10px] uppercase tracking-widest text-camel mb-2">От 1948</p>
            <p className="font-serif italic text-lg leading-snug">
              Три поколения парфюмери над едни и същи цветни полета.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.15, 0.12)}
          className="md:col-span-6 space-y-8"
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-widest text-camel">
            Maison
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif font-light text-4xl md:text-6xl tracking-tight leading-[1.05]">
            Създадено бавно, в една <span className="italic text-camel">цветарска къща</span> над морето.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-taupe leading-relaxed max-w-lg">
            Maison Lumèra е основана през 1948 г. от Антоан Васьор — млад
            парфюмер, който се завръща в Грас след войната с малка тетрадка
            формули и отказ да бърза. Днес внучката му Елоди продължава тази
            практика, създавайки по четири аромата годишно в партиди,
            достатъчно малки, за да бъдат запомнени на ръка.
          </motion.p>
          <motion.p variants={fadeUp} className="text-taupe leading-relaxed max-w-lg">
            Отглеждаме собствен жасмин и стогодишна роза по склона под
            ателието. Всичко, което излиза от Lumèra, е докоснато от някой,
            който познава полето, от което идва.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="pt-6 border-t border-border max-w-md relative"
          >
            <div className="grid grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative px-1 ${i > 0 ? 'pl-6' : ''}`}
                >
                  {i > 0 && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originY: 0 }}
                      className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-camel/50 via-camel/20 to-transparent"
                    />
                  )}
                  <Counter stat={s} />
                  <p className="text-[10px] uppercase tracking-widest text-taupe mt-2 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
