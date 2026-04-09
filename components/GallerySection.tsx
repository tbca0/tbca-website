"use client";

import { galleryItems } from "@/lib/gallery-data";
import { useCallback, useEffect, useRef, useState } from "react";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
    credit: string;
    alt: string;
  } | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setLightbox(null);
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
    const nodes = document.querySelectorAll<HTMLButtonElement>(".gallery-item.reveal");
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
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    }
  }, [lightbox]);

  return (
    <>
      <section className="section section--tint" id="gallery" aria-labelledby="gallery-title">
        <div className="container">
          <div className="section-head">
            <h2 id="gallery-title" className="section-title">
              Gallery
            </h2>
            <p className="section-sub">
              Scenes of Telangana &amp; Bengal that inspire our work. Images are from{" "}
              <a href="https://commons.wikimedia.org/" rel="noopener noreferrer" target="_blank">
                Wikimedia Commons
              </a>{" "}
              (free to reuse with credit—see footer).
            </p>
          </div>
          <ul className="gallery-grid" id="gallery-grid">
            {galleryItems.map((item) => (
              <li key={item.fullSrc}>
                <button
                  type="button"
                  className="gallery-item reveal"
                  onClick={() =>
                    setLightbox({
                      src: item.fullSrc,
                      caption: item.caption,
                      credit: item.credit,
                      alt: item.alt,
                    })
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumbSrc} alt={item.alt} width={480} height={360} loading="lazy" />
                  <span className="gallery-caption">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lightbox ? (
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
          <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} />
          <p className="lightbox-caption">{lightbox.caption}</p>
          <p className="lightbox-credit">{lightbox.credit}</p>
        </div>
      ) : null}
    </>
  );
}
