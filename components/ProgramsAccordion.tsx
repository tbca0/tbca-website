"use client";

import { useId, useState } from "react";

const items = [
  {
    title: "Cultural calendar",
    body: "Year-round events: national days, remembrance for Tagore & Nazrul, film screenings, and season-themed food & craft fairs that welcome all communities.",
  },
  {
    title: "Youth & families",
    body: "Children’s choir, storytelling, chess & quiz in Bengali, and mentorship so young members stay connected to roots while growing in Hyderabad.",
  },
  {
    title: "Outreach & partnership",
    body: "Joint programs with schools, housing societies, and fellow cultural bodies to share Bengal’s heritage respectfully with Telugu friends and neighbours.",
  },
] as const;

export function ProgramsAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const panelId = `${baseId}-panel-${i}`;
        const triggerId = `${baseId}-trigger-${i}`;
        const isOpen = openIndex === i;

        return (
          <article key={item.title} className={`acc-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="acc-trigger"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="acc-title">{item.title}</span>
              <span className="acc-icon" aria-hidden />
            </button>
            <div
              className="acc-panel"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              <p>{item.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
