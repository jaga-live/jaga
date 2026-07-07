import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';

interface MetricCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

// Counts up from zero once the element scrolls into view. Honors reduced motion.
export default function MetricCounter({
  value,
  suffix = '',
  decimals = 0,
  durationMs = 1100,
  className,
}: MetricCounterProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-40px' });
  const [display, setDisplay] = useState(reduce ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, durationMs]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
