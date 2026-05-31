"use client";

import { useEffect, useState } from "react";

type Festival = {
  id: string;
  date: string;
  dateTime: string;
  title: string;
  description: string;
  tag: string;
  images: string[];
};

type EachFestivalGalleryProps = {
  festival: Festival;
};


export function EachFestivalGallery({ festival }: EachFestivalGalleryProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [festival.id]);

  if (!festival.images.length) return null;

  const totalSlides = festival.images.length;
  const safeActiveSlide = Math.min(activeSlide, totalSlides - 1);
  const activeImage = festival.images[safeActiveSlide];

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? totalSlides - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === totalSlides - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-200/80 sm:p-5">

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 w-fit rounded-full bg-orange-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700 sm:text-xs">
            Festival memories
          </p>

          <h3 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
            {festival.title} Gallery
          </h3>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
            {festival.description}
          </p>
        </div>

        <span className="mt-1 shrink-0 rounded-full bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-300/70 sm:px-4 sm:text-xs">
          {safeActiveSlide + 1}/{totalSlides} Photos
        </span>
      </div>

      <div className="relative h-[270px] overflow-hidden rounded-[1.8rem] bg-white shadow-2xl shadow-slate-950/12 ring-1 ring-slate-200/80 sm:h-[360px] lg:h-[460px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt={`${festival.title} community gathering photo ${safeActiveSlide + 1}`}
          className="h-full w-full object-cover object-center"
          loading={safeActiveSlide === 0 ? "eager" : "lazy"}
        />

        <button
          type="button"
          onClick={goToPrevious}
          aria-label={`Previous ${festival.title} photo`}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white sm:left-6 sm:h-12 sm:w-12"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label={`Next ${festival.title} photo`}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white sm:right-6 sm:h-12 sm:w-12"
        >
          ›
        </button>

        <span className="absolute bottom-4 right-4 shrink-0 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-lg backdrop-blur">
          {safeActiveSlide + 1}/{totalSlides}
        </span>
      </div>

      <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {festival.images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`relative h-14 min-w-20 snap-start overflow-hidden rounded-xl bg-white ring-offset-2 transition hover:-translate-y-0.5 sm:h-16 sm:min-w-24 ${
              safeActiveSlide === index
                ? "ring-4 ring-orange-500"
                : "ring-1 ring-slate-200 opacity-75 hover:opacity-100"
            }`}
            aria-label={`Open ${festival.title} photo ${index + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />

            <span className="absolute bottom-1 right-1 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
              {index + 1}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        Use arrows or thumbnails to view the event flow
      </p>
    </div>
  );
}
