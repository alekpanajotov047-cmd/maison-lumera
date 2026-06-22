'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-camel via-gold to-camel z-[60] pointer-events-none"
    />
  );
}
