'use client';

import { motion } from 'framer-motion';

const cols = [
  {
    title: 'Maison',
    links: ['Нашата история', 'Ателието', 'Устойчивост', 'Дневник'],
  },
  {
    title: 'Бутик',
    links: ['Колекцията', 'Комплект за откриване', 'Програма за пълнене', 'Подаръчни карти'],
  },
  {
    title: 'Обслужване',
    links: ['Доставка и връщане', 'Грижа за парфюма', 'Контакт', 'Дистрибутори'],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-serif font-light text-5xl md:text-7xl tracking-tight leading-none">
                Maison <br />
                <span className="italic text-camel">Lumèra</span>
              </h3>
              <p className="text-taupe mt-6 max-w-sm leading-relaxed text-[15px]">
                14 rue des Jasmins · 06130 Грас · Франция
                <br />
                Посещения в ателието след предварителна заявка, вторник — петък.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-[10px] uppercase tracking-widest text-camel mb-5">
                  {c.title}
                </p>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-taupe hover:text-espresso text-sm transition-colors duration-300 cursor-pointer"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] uppercase tracking-widest text-taupe">
          <p>© {new Date().getFullYear()} Maison Lumèra · Всички права запазени</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-espresso transition-colors cursor-pointer">
              Instagram
            </a>
            <a href="#" className="hover:text-espresso transition-colors cursor-pointer">
              Pinterest
            </a>
            <a href="#" className="hover:text-espresso transition-colors cursor-pointer">
              Поверителност
            </a>
            <a href="#" className="hover:text-espresso transition-colors cursor-pointer">
              Условия
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <p className="font-serif italic font-light text-[18vw] md:text-[14vw] leading-none text-espresso/[0.06] tracking-tighter select-none whitespace-nowrap text-center -mb-[3vw]">
          Lumèra · Lumèra · Lumèra
        </p>
      </div>
    </footer>
  );
}
