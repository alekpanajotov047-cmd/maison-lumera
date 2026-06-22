'use client';

import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const links = [
  { href: '#collection', label: 'Колекция' },
  { href: '#notes', label: 'Ноти' },
  { href: '#maison', label: 'Maison' },
  { href: '#journal', label: 'Дневник' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ease-luxe ${
        scrolled ? 'bg-cream/85 backdrop-blur-md border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="font-serif text-xl md:text-2xl tracking-tight cursor-pointer">
          Maison <span className="italic font-light">Lumèra</span>
        </a>

        <LayoutGroup>
          <nav
            onMouseLeave={() => setHovered(null)}
            className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-widest text-taupe"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className="relative px-4 py-2 hover:text-espresso transition-colors duration-300 cursor-pointer"
              >
                {l.label}
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-hover-underline"
                    className="absolute left-3 right-3 bottom-1 h-px bg-gradient-to-r from-transparent via-camel to-transparent"
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  />
                )}
              </a>
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest text-taupe">
          <button className="hidden md:inline hover:text-espresso transition-colors cursor-pointer">
            Профил
          </button>
          <button
            className="cursor-pointer hover:text-espresso transition-colors flex items-center gap-2"
            aria-label="Отвори торбата за пазаруване"
          >
            Торба <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-espresso text-cream text-[10px]">2</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
