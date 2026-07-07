import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger offset in seconds for sequenced reveals. */
  delay?: number;
  className?: string;
  /** Render element. Defaults to a div. */
  as?: 'div' | 'section' | 'li' | 'article';
}

export default function ScrollReveal({ children, delay = 0, className, as = 'div' }: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </MotionTag>
  );
}
