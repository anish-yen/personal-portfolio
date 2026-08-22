import { profile, links } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-content">
        <p className="mb-5 animate-fade-up font-mono text-sm text-accent opacity-0 [animation-delay:0ms]">
          Hi, I&apos;m {profile.nickname} — welcome to my corner of the internet.
        </p>

        <h1 className="mb-6 animate-fade-up font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground opacity-0 [animation-delay:100ms] sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>

        <p className="mb-3 max-w-2xl animate-fade-up text-balance font-serif text-2xl italic text-foreground/90 opacity-0 [animation-delay:200ms] sm:text-3xl">
          {profile.tagline}
        </p>

        <p className="mb-10 max-w-xl animate-fade-up text-balance text-lg leading-relaxed text-muted opacity-0 [animation-delay:300ms]">
          {profile.subtagline}
        </p>

        <div className="flex animate-fade-up flex-wrap items-center gap-4 opacity-0 [animation-delay:400ms]">
          <a
            href={links.resume}
            download
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Download Resume
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-y-0.5"
            >
              <path d="M12 3v13m0 0-5-5m5 5 5-5M5 21h14" />
            </svg>
          </a>

          <a
            href={`mailto:${links.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>

          <div className="flex items-center gap-4 pl-2 text-muted">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubIcon />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
