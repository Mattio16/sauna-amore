'use client';

import { useEffect, useRef, ReactNode } from 'react';

/** Parallax container: children (an absolutely-positioned img) drift as you scroll. */
export default function Parallax({
  speed = 0.08,
  zoom = 1.15,
  className = '',
  children,
}: {
  speed?: number;
  zoom?: number;
  className?: string;
  children: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const img = box.querySelector('img, video') as HTMLElement | null;
    if (!img) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tick = false;
    const run = () => {
      const r = box.getBoundingClientRect();
      const v = (r.top + r.height / 2 - innerHeight / 2) * speed;
      img.style.transform = `translateY(${v}px) scale(${zoom})`;
      tick = false;
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => removeEventListener('scroll', onScroll);
  }, [speed, zoom]);

  return (
    <div ref={boxRef} className={`overflow-hidden relative ${className}`}>
      {children}
    </div>
  );
}
