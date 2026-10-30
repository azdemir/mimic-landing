"use client";

import { useEffect, useState } from "react";

const LINKS: Array<[string, string]> = [
  ["Loop", "#loop"],
  ["Demo", "#demo"],
  ["Engine", "#engine"],
  ["Stack", "#stack"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-paper/92 backdrop-blur-md border-b rule" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="font-display italic text-[22px] leading-none tracking-tight">
            mimic
            <sup className="ml-1.5 font-mono not-italic text-[10px] tracking-normal text-mute">v0.1</sup>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink2 transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#closing"
            className="bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
          >
            Get the build
          </a>
        </div>
      </div>
    </header>
  );
}
