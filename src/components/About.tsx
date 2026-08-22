import SectionHeading from "./SectionHeading";
import { education, credentials, profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading index="01" title="About" />

        <div className="grid gap-12 sm:grid-cols-5">
          <div className="sm:col-span-3">
            <p className="text-balance text-lg leading-relaxed text-foreground/90">
              I&apos;m {profile.nickname}, a computer science student who likes
              building things end to end — from a Postgres schema to a
              production UI to the model in between. I gravitate toward
              product work that has real users, and I enjoy the parts of ML
              engineering that make a system actually usable: retrieval,
              serving, and the plumbing that connects a model to a product.
            </p>
            <p className="mt-4 text-balance text-lg leading-relaxed text-foreground/90">
              Outside of coursework, I compete in hackathons, contribute to
              security research, and look for excuses to ship something new
              over a weekend.
            </p>
          </div>

          <div className="space-y-6 sm:col-span-2">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted">
                Education
              </p>
              <p className="font-medium text-foreground">{education.school}</p>
              <p className="text-sm text-muted">{education.degree}</p>
              <p className="mt-2 text-sm text-muted">
                {education.timeline} · {education.honor}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">
                Credentials
              </p>
              <ul className="space-y-1.5">
                {credentials.map((c) => (
                  <li key={c} className="text-sm text-foreground/90">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
