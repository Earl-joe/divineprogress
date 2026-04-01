import type { Metadata } from "next";
import { curriculumHighlights, departments } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academics",
  description: `Departments, subjects, and curriculum at ${SITE.name}.`,
};

export default function AcademicsPage() {
  return (
    <>
      <Section className="pb-8 pt-12">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Academics
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Serious study, human pace
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Our departments and curriculum prepare learners for national
            assessments and global opportunities.
          </p>
        </MotionReveal>
      </Section>

      <Section className="bg-surface-elevated pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {departments.map((d, i) => (
            <MotionReveal key={d.name} delay={i * 0.05}>
              <Card className="h-full">
                <h2 className="text-xl font-bold text-foreground">{d.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {d.description}
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-primary">
                  Subjects offered
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-muted">
                  {d.subjects.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg bg-accent-soft/80 px-3 py-2 font-medium text-primary dark:bg-accent-soft/30"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section>
        <MotionReveal>
          <h2 className="text-2xl font-bold text-foreground">
            Curriculum overview
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            We blend the Nigerian secondary curriculum with enrichment in
            leadership, digital literacy, and research skills.
          </p>
        </MotionReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {curriculumHighlights.map((line, i) => (
            <MotionReveal key={line} delay={i * 0.05}>
              <Card hover={false} className="bg-accent-soft/50 dark:bg-accent-soft/20">
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  {line}
                </p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
