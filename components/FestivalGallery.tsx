"use client";

import { useEffect, useState } from "react";
import UpcomingEventVideo from "@/components/UpcomingEventVideo";
import { RevealArticle } from "@/components/Reveal";
import { EachFestivalGallery } from "@/components/EachFestivalGallery";

type Festival = {
  id: string;
  date: string;
  dateTime: string;
  title: string;
  description: string;
  tag: string;
  images: string[];
};

const pohelaBoishakhImages = [
      "/gallery/pohela-boishakh/pohela-boishakh-01.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-02.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-03.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-04.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-05.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-06.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-07.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-08.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-9.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-10.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-11.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-12.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-13.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-14.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-15.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-16.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-17.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-18.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-19.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-20.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-21.jpg",
      "/gallery/pohela-boishakh/pohela-boishakh-22.jpg",
];

const festivals: Festival[] = [
  {
    id: "pohela-boishakh",
    date: "Apr 2026",
    dateTime: "2026-04",
    title: "Pohela Boishakh",
    description: "Pohela Boishakh community gathering.",
    tag: "Community",
    images: pohelaBoishakhImages,
  },
  {
  id: "durga-puja",
  date: "Oct 2026",
  dateTime: "2026-10",
  title: "Durga Puja",
  description: "Durga Puja celebration, cultural programs, anjali, dhak, prasad, and community gathering.",
  tag: "Upcoming Event",
  images: [],
},
];

export function FestivalGallery() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  useEffect(() => {
    document.body.classList.toggle("gallery-open", selectedFestival !== null);

    return () => {
      document.body.classList.remove("gallery-open");
    };
  }, [selectedFestival]);

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className={`relative isolate overflow-hidden py-20 ${selectedFestival ? "gallery-active-section" : ""}`}
    >
      {!selectedFestival ? (
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-no-repeat opacity-[0.09]"
          style={{
            backgroundImage: "url('/gallery/durga/durga-mata-background.jpg')",
            backgroundPosition: "center top",
            backgroundSize: "min(760px, 78vw) auto",
          }}
          aria-hidden="true"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#f8f6fb]/98 via-[#f8f6fb]/96 to-[#f8f6fb]/98" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 w-fit rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
            Upcoming celebrations
          </p>

          <h2
            id="events-title"
            className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
          >
            Upcoming highlights
          </h2>

        </div>

        <UpcomingEventVideo />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {festivals.map((festival) => {
            const isActive = selectedFestival?.id === festival.id;
            const hasImages = festival.images.length > 0;

            return (
              <button
                key={festival.id}
                type="button"
                disabled={!hasImages}
                onClick={() => {
                  if (!hasImages) return;

                  setSelectedFestival((currentFestival) =>
                    currentFestival?.id === festival.id ? null : festival
                  );
                }}
                className={`group block h-full w-full rounded-[2rem] text-left transition-all duration-300 ${
                  hasImages
                    ? "cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-200"
                    : "cursor-default"
                }`}
              >
                <RevealArticle
                  className={`is-visible relative h-full overflow-hidden rounded-[2rem] bg-white/90 p-8 shadow-lg shadow-slate-950/5 ring-1 ring-white/70 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                    isActive && hasImages
                      ? "ring-2 ring-orange-400 shadow-2xl shadow-orange-200/60"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <time
                      dateTime={festival.dateTime}
                      className="text-sm font-bold text-blue-700"
                    >
                      {festival.date}
                    </time>

                    <h3 className="mt-6 text-xl font-bold text-slate-950">
                      {festival.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {festival.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-600">
                        {festival.tag}
                      </span>

                      {hasImages ? (
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            isActive
                              ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                              : "bg-slate-100 text-slate-500 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200"
                          }`}
                        >
                          {isActive ? "Close gallery" : "View gallery"}

                          <span
                            className={`text-sm transition-transform duration-300 ${
                              isActive ? "rotate-180" : "group-hover:translate-x-1"
                            }`}
                          >
                            {isActive ? "↑" : "→"}
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </RevealArticle>
              </button>
            );
          })}
        </div>

        {selectedFestival && selectedFestival.images.length > 0 ? (
          <EachFestivalGallery festival={selectedFestival} />
        ) : null}
      </div>
    </section>
  );
}
