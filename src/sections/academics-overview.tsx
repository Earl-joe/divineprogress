import { departments } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export function AcademicsOverview() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Academics
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pathways that honour every learner’s strength
          </h2>
          <p className="mt-4 text-muted">
            Three vibrant departments, one shared commitment to scholarship,
            communication, and growth mindset.
          </p>
        </MotionReveal>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {departments.map((d, i) => (
          <MotionReveal key={d.name} delay={i * 0.06}>
            <Card className="flex h-full flex-col">
              <h3 className="text-xl font-bold text-foreground">{d.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {d.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
                Sample subjects
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {d.subjects.slice(0, 4).map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-primary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
          </MotionReveal>
        ))}
      </div>
      <MotionReveal className="mt-10 flex justify-center">
        <ButtonLink href="/academics" variant="outline">
          Explore full curriculum
        </ButtonLink>
      </MotionReveal>
    </Section>
  );
}
