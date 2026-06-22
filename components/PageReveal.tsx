'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageReveal() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // If user has already navigated and revealed before this session, skip
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('lumera-revealed')) {
      setHidden(true);
      return;
    }
    const t = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem('lumera-revealed', '1');
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="reveal"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[10px] uppercase tracking-widest text-camel mb-5"
            >
              Maison · Grasse
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="font-serif font-light text-5xl md:text-7xl tracking-tight"
            >
              Maison <span className="italic text-camel">Lumèra</span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="h-px w-32 mx-auto mt-8 bg-gradient-to-r from-transparent via-camel to-transparent origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
