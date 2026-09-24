import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/data";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading index="03" title="Projects" />

        <div className="space-y-6">
          {featured.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-medium text-foreground">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="max-w-2xl text-balance leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <RepoLink href={p.href} />
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-lg font-medium text-foreground">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <RepoLink href={p.href} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RepoLink({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="link-underline mt-5 inline-block text-sm text-accent"
    >
      View on GitHub &rarr;
    </a>
  );
}

function StatusBadge({ status }: { status: "in-progress" | "shipped" }) {
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        In progress
      </span>
    );
  }
  return null;
}
