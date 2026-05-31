"use client";

import { galleryItems } from "@/lib/gallery-data";
import { useCallback, useEffect, useRef, useState } from "react";

export function GallerySection() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLButtonElement>(".gallery-card.reveal");
    if (!nodes.length || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return undefined;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    }
  }, [lightboxSrc]);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gallery-card-wrap");
    const w = card?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (w + 20), behavior: "smooth" });
  }, []);

  return (
    <>
      <section className="section section--tint section--gallery" id="gallery" aria-labelledby="gallery-title">
        <div className="container">
          <div className="section-head">
            <h2 id="gallery-title" className="section-title">
              Gallery
            </h2>
            <p className="section-sub">
              Moments from our cultural programs and celebrations across Telangana.
            </p>
          </div>
        </div>

        <div className="gallery-carousel" aria-label="Image gallery">
          <button
            type="button"
            className="gallery-nav gallery-nav--prev"
            aria-label="Scroll gallery left"
            onClick={() => scrollByDir(-1)}
          />
          <button
            type="button"
            className="gallery-nav gallery-nav--next"
            aria-label="Scroll gallery right"
            onClick={() => scrollByDir(1)}
          />

          <div className="gallery-scroll-fade gallery-scroll-fade--left" aria-hidden />
          <div className="gallery-scroll-fade gallery-scroll-fade--right" aria-hidden />

          <div ref={scrollRef} className="gallery-scroll-shell" tabIndex={0}>
            <ul className="gallery-rail">
              {galleryItems.map((item, i) => (
                <li
                  key={item.src}
                  className="gallery-card-wrap"
                  style={{ "--gallery-i": i } as React.CSSProperties}
                >
                  <button
                    type="button"
                    className="gallery-card gallery-item reveal"
                    aria-label="View full size image"
                    onClick={() => setLightboxSrc(item.src)}
                  >
                    <span className="gallery-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt=""
                        width={480}
                        height={360}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="gallery-scroll-hint">
            <span className="gallery-scroll-hint-dot" aria-hidden />
            Scroll or swipe to explore
          </p>
        </div>
      </section>

      {lightboxSrc ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="lightbox-close" aria-label="Close" onClick={close}>
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-img" src={lightboxSrc} alt="Gallery image" />
        </div>
      ) : null}
    </>
  );
}
