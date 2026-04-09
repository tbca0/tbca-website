"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type NavItem = { href: string; label: string; cta?: boolean };

const navLinks: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#programs", label: "Programs" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#join", label: "Join us", cta: true },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link className="brand" href="#top" aria-label="TBCA home" onClick={close}>
          <Image
            src="/tbca-logo.jpeg"
            alt="Telangana Bengali Cultural Association logo"
            width={56}
            height={56}
            className="brand-logo"
            priority
          />
          <span className="brand-text">
            <span className="brand-name">TBCA</span>
            <span className="brand-tag">Telangana Bengali Cultural Association</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav" aria-label="Primary">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={item.cta ? "nav-cta" : undefined}
                  onClick={close}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
