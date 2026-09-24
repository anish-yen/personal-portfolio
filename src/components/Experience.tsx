import SectionHeading from "./SectionHeading";
import { experience, hackathons } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading index="02" title="Experience" />

        <div className="space-y-2">
          {experience.map((job) => (
            <div
              key={job.company}
              className="group grid gap-1 border-b border-border py-7 transition-colors sm:grid-cols-[1fr_2.5fr] sm:gap-8"
            >
              <div>
                <p className="font-display text-lg font-medium text-foreground">
                  {job.company}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {job.timeline}
                </p>
              </div>
              <div>
                <p className="mb-2 text-foreground/90">{job.role}</p>
                <ul className="space-y-1.5">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-5 text-xs uppercase tracking-wider text-muted">
            Hackathons
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {hackathons.map((h) => (
              <div
                key={h.event}
                className="rounded-2xl border border-border bg-surface shadow-sm p-5"
              >
                <p className="font-medium text-foreground">{h.project}</p>
                <p className="mt-1 text-sm text-muted">{h.event}</p>
                {h.note && (
                  <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">
                    {h.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
