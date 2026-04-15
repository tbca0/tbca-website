"use client";

import { useEffect, useRef, useState } from "react";

export default function UpcomingEventVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay can be blocked by browser policies.
          });
          return;
        }

        video.pause();
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const detectOrientation = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      setIsPortrait(video.videoHeight >= video.videoWidth);
    };

    if (video.readyState >= 1) {
      detectOrientation();
    }

    video.addEventListener("loadedmetadata", detectOrientation);
    return () => {
      video.removeEventListener("loadedmetadata", detectOrientation);
    };
  }, []);

  return (
    <div className="upcoming-video-block">
      <div className={`upcoming-video-shell${isPortrait ? " is-portrait" : ""}`}>
        <div className="upcoming-video-pattern" aria-hidden>
            <span className="flower-ring flower-ring--outer" />
            <span className="flower-ring flower-ring--inner" />
            <span className="flower-rosette" />
        </div>
        <div className="upcoming-video-frame">
          <video
            ref={videoRef}
            className="upcoming-event-video"
            muted
            controls
            playsInline
            preload="metadata"
            src="/events/tbca-upcoming-event.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
