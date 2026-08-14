import { useEffect, useRef, useState } from 'react';

// A subtle ring that trails the pointer and grows over interactive elements.
// Only runs on fine pointers with motion allowed; native cursor stays everywhere else.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('cursor-none');

    const interactiveSel = 'a, button, [role="button"], .hover-card, [data-hover]';

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
      const el = e.target as Element | null;
      hovering.current = !!el?.closest?.(interactiveSel);
    };
    const onLeave = () => {
      visible.current = false;
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);

    let frame = 0;
    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      const scale = hovering.current ? 1.1 : 1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = hovering.current ? 'var(--accent)' : 'var(--muted)';
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      root.classList.remove('cursor-none');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 21,
        height: 21,
        borderRadius: '50%',
        border: '1.5px solid var(--muted)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
      }}
    />
  );
}
