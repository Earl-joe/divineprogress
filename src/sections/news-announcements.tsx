import { newsItems } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";

export function NewsAnnouncements() {
  return (
    <Section className="bg-surface-elevated">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            News &amp; announcements
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Highlights from parents, learners, and
            partners.
          </p>
        </MotionReveal>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {newsItems.map((n, i) => (
          <MotionReveal key={n.id} delay={i * 0.05}>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {n.date}
              </p>
              <h3 className="mt-3 text-lg font-bold text-foreground">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {n.excerpt}
              </p>
            </Card>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
