"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

function useRevealOnScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return undefined;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

export function RevealLi({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRevealOnScroll<HTMLLIElement>();
  return (
    <li ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </li>
  );
}

export function RevealArticle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return undefined;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </article>
  );
}
