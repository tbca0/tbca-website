"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const inaugurationHighlights = [
  "Opening ceremony and lamp lighting",
  "Cultural welcome by TBCA members",
  "Community introduction and volunteer meet",
  "Music, adda, blessings, and refreshments",
];

const inaugurationGallery = [
  "/gallery/inauguration/inauguration-day-00.jpg",
  "/gallery/inauguration/inauguration-day-01.jpg",
  "/gallery/inauguration/inauguration-day-02.jpg",
  "/gallery/inauguration/inauguration-day-03.jpg",
  "/gallery/inauguration/inauguration-day-04.jpg",
  "/gallery/inauguration/inauguration-day-05.jpg",
  "/gallery/inauguration/inauguration-day-06.jpg",
  "/gallery/inauguration/inauguration-day-07.jpg",
  "/gallery/inauguration/inauguration-day-08.jpg",
  "/gallery/inauguration/inauguration-day-9.jpg",
  "/gallery/inauguration/inauguration-day-10.jpg",
  "/gallery/inauguration/inauguration-day-11.jpg",
  "/gallery/inauguration/inauguration-day-12.jpg",
  "/gallery/inauguration/inauguration-day-13.jpg",
  "/gallery/inauguration/inauguration-day-14.jpg",
  "/gallery/inauguration/inauguration-day-15.jpg",
  "/gallery/inauguration/inauguration-day-16.jpg",
  "/gallery/inauguration/inauguration-day-17.jpg",
  "/gallery/inauguration/inauguration-day-18.jpg",
  "/gallery/inauguration/inauguration-day-19.jpg",
  "/gallery/inauguration/inauguration-day-20.jpg",
  "/gallery/inauguration/inauguration-day-21.jpg",
  "/gallery/inauguration/inauguration-day-22.jpg",
];

export function InaugurationSection() {
  const [showGallery, setShowGallery] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("gallery-open", showGallery);

    return () => {
      document.body.classList.remove("gallery-open");
    };
  }, [showGallery]);

  const totalSlides = inaugurationGallery.length;

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? totalSlides - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current === totalSlides - 1 ? 0 : current + 1));
  };

  return (
    <section
      id="inauguration"
      aria-labelledby="inauguration-title"
      className={`relative isolate overflow-hidden bg-[#fff8f1] py-20 sm:py-24 ${
        showGallery ? "gallery-active-section" : ""
      }`}
    >
      {!showGallery ? (
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-no-repeat opacity-[0.1]"
          style={{
            backgroundImage: "url('/gallery/durga/durga-mata-background.jpg')",
            backgroundPosition: "center 16%",
            backgroundSize: "min(900px, 88vw) auto",
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.24),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,247,237,0.97))]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="mb-4 w-fit rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-700 shadow-sm ring-1 ring-orange-200/70">
              Club inauguration day
            </p>

            <h2
              id="inauguration-title"
              className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              A grand beginning for Telangana Bengali Cultural Association
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A memorable inauguration where members, families, artists, and well-wishers came together to
              begin TBCA’s journey with culture, warmth, and community spirit.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/90 p-5 shadow-xl shadow-orange-100/80 ring-1 ring-orange-100 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                  Moment
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-950">
                  Grand launch
                </p>
              </div>

              <div className="rounded-3xl bg-white/90 p-5 shadow-xl shadow-orange-100/80 ring-1 ring-orange-100 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                  People
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-950">
                  Members & families
                </p>
              </div>

              <div className="rounded-3xl bg-white/90 p-5 shadow-xl shadow-orange-100/80 ring-1 ring-orange-100 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                  Theme
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-950">
                  Culture & unity
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {inaugurationHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white shadow-md shadow-orange-200">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowGallery((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-200 ${
                  showGallery
                    ? "bg-slate-950 text-white shadow-slate-300 hover:bg-slate-800"
                    : "bg-orange-500 text-white shadow-orange-200 hover:bg-orange-600"
                }`}
              >
                {showGallery ? "Close gallery" : "View gallery"}
                <span className={`transition-transform ${showGallery ? "rotate-180" : ""}`}>
                  {showGallery ? "↑" : "→"}
                </span>
              </button>

              <Link
                href="#join"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-800 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-orange-600"
              >
                Join TBCA
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-orange-300/50 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-blue-300/35 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[2.4rem] bg-white p-3 shadow-2xl shadow-slate-950/20 ring-1 ring-white/80">
              <Image
                src="/gallery/hero/tbca-hero-inauguration.jpg"
                alt="TBCA members at the club inauguration"
                width={1600}
                height={1050}
                className="h-[460px] w-full rounded-[1.9rem] object-cover object-center sm:h-[600px] lg:h-[690px]"
                priority={false}
              />

              <div className="absolute inset-3 rounded-[1.9rem] bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700 shadow-lg backdrop-blur">
                Grand opening
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/92 p-5 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
                  TBCA begins here
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-slate-950">
                  Culture · Community · Celebration
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  A proud start for families, artists, volunteers, and well-wishers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {showGallery ? (
          <div className="mx-auto mt-12 w-full max-w-4xl rounded-[2rem] bg-white p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-200/80 sm:p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-2 w-fit rounded-full bg-orange-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700 sm:text-xs">
                  Inauguration memories
                </p>
                <h3 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
                  Club opening gallery
                </h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
                  Follow the inauguration day in sequence — from welcome setup to the final community
                  photograph.
                </p>
              </div>

              <span className="mt-1 shrink-0 rounded-full bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-300/70 sm:px-4 sm:text-xs">
                {activeSlide + 1}/{totalSlides} Photos
              </span>
            </div>

            <div className="relative h-[270px] overflow-hidden rounded-[1.8rem] bg-white shadow-2xl shadow-slate-950/12 ring-1 ring-slate-200/80 sm:h-[360px] lg:h-[460px]">
              <Image
                src={inaugurationGallery[activeSlide]}
                alt={`TBCA inauguration photo ${activeSlide + 1}`}
                width={1600}
                height={1000}
                className="h-full w-full object-cover object-center"
                priority={activeSlide === 0}
              />

              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous inauguration photo"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white sm:left-6 sm:h-12 sm:w-12"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next inauguration photo"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-black text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white sm:right-6 sm:h-12 sm:w-12"
              >
                ›
              </button>

              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg backdrop-blur">
                  {activeSlide + 1}/{totalSlides}
                </span>

                <button
                  type="button"
                  onClick={() => setShowGallery(false)}
                  className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-lg backdrop-blur transition hover:bg-white"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
              {inaugurationGallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`relative h-16 min-w-24 snap-start overflow-hidden rounded-xl ring-offset-2 transition hover:-translate-y-0.5 sm:h-20 sm:min-w-28 ${
                    activeSlide === index
                      ? "ring-4 ring-orange-500"
                      : "ring-1 ring-slate-200 opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`Open inauguration photo ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt=""
                    width={220}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Use arrows or thumbnails to follow the event flow
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}