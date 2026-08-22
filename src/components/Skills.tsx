import SectionHeading from "./SectionHeading";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading index="04" title="Skills" />

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="mb-3 text-xs uppercase tracking-wider text-muted">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
