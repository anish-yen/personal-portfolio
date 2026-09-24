import SectionHeading from "./SectionHeading";
import { links } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading index="05" title="Contact" />

        <div className="rounded-2xl border border-border bg-surface shadow-sm px-6 py-14 text-center sm:px-14">
          <h3 className="mx-auto max-w-lg text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            Let&apos;s build something together.
          </h3>
          <p className="mx-auto mt-4 max-w-md text-balance text-muted">
            I&apos;m looking for SWE internships — reach out if you&apos;d like
            to chat.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {links.email}
            </a>
            <a
              href={links.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
