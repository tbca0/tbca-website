"use client";

import { useEffect, useRef, useState } from "react";

type HeroCounterProps = {
  target: number;
};

export function HeroCounter({ target }: HeroCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    if (typeof IntersectionObserver === "undefined") {
      done.current = true;
      queueMicrotask(() => setValue(target));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          obs.disconnect();
          const duration = 900;
          const start = performance.now();
          const from = 0;
          const step = (ts: number) => {
            const p = Math.min((ts - start) / duration, 1);
            setValue(Math.round(from + (target - from) * p));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
    </span>
  );
}
