"use client";

import { useEffect, useState } from "react";
import { navLinks, profile, links } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.nickname}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={links.resume}
          download
          className="hidden rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-block"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
