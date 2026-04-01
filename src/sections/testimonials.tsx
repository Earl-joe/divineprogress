import { testimonials } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";

export function Testimonials() {
  return (
    <Section className="bg-surface-elevated">
      <div className="mx-auto max-w-2xl text-center">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Voices from our community
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by families who value balance
          </h2>
        </MotionReveal>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <MotionReveal key={t.name} delay={i * 0.06}>
            <Card>
              <p className="text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">{t.name}</p>
              <p className="text-xs text-muted">{t.role}</p>
            </Card>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
