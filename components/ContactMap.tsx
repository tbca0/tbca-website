"use client";

import { useCallback, useState } from "react";

/** DR A S Rao Nagar / Officers Colony — Sri Sai Mitra Marvel area (~500062) */
const MAP_LAT = 17.4801;
const MAP_LON = 78.5485;
const MAP_BBOX = `${MAP_LON - 0.0075},${MAP_LAT - 0.0045},${MAP_LON + 0.0075},${MAP_LAT + 0.0045}`;
const MAP_MARKER = `${MAP_LAT},${MAP_LON}`;

const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(MAP_BBOX)}&layer=mapnik&marker=${encodeURIComponent(MAP_MARKER)}`;

const MAP_OPEN_URL = `https://www.openstreetmap.org/?mlat=${MAP_LAT}&mlon=${MAP_LON}#map=17/${MAP_LAT}/${MAP_LON}`;

export function ContactMap() {
  const [interactive, setInteractive] = useState(false);

  const lock = useCallback(() => setInteractive(false), []);
  const unlock = useCallback(() => setInteractive(true), []);

  return (
    <div className="map-wrap map-wrap--embed" aria-label="TBCA location map">
      <div className="map-frame">
        <iframe
          title="TBCA — DR A S Rao Nagar, Secunderabad"
          className="map-iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={MAP_SRC}
          style={{ pointerEvents: interactive ? "auto" : "none" }}
        />
        {!interactive ? (
          <button type="button" className="map-activate" onClick={unlock}>
            Click or tap to use the map
          </button>
        ) : (
          <div className="map-toolbar">
            <button type="button" className="map-deactivate" onClick={lock}>
              Exit map / scroll page
            </button>
          </div>
        )}
      </div>
      <p className="map-caption">
        Approximate location (Officers Colony, DR A S Rao Nagar).{" "}
        <a href={MAP_OPEN_URL} rel="noopener noreferrer" target="_blank">
          Open full map
        </a>
        {" · "}
        Map data ©{" "}
        <a href="https://www.openstreetmap.org/" rel="noopener noreferrer" target="_blank">
          OpenStreetMap
        </a>{" "}
        contributors
      </p>
    </div>
  );
}
