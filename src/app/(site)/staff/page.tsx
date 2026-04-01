import type { Metadata } from "next";
import Image from "next/image";
import { staffMembers } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Staff directory",
  description: `Meet the team at ${SITE.name}.`,
};

export default function StaffPage() {
  return (
    <>
      <Section className="pb-8 pt-12">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our people
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Staff directory
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Experienced educators and specialists committed to seeing every learner
            thrive—academically, socially, and spiritually.
          </p>
        </MotionReveal>
      </Section>

      <Section className="bg-surface-elevated pt-0">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staffMembers.map((s, i) => (
            <MotionReveal key={s.id} delay={(i % 4) * 0.05}>
              <Card className="overflow-hidden p-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt=""
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-foreground">{s.name}</h2>
                  <p className="mt-1 text-sm font-medium text-primary">{s.role}</p>
                  <p className="mt-1 text-xs text-muted">{s.department}</p>
                </div>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
