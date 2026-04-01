import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `History, mission, and leadership at ${SITE.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8 pt-12">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            About
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our story &amp; purpose
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {SITE.name} was founded to offer families in Kaduna and beyond a
            secondary school where academic ambition and moral formation walk
            together.
          </p>
        </MotionReveal>
      </Section>

      <Section className="bg-surface-elevated pt-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MotionReveal>
            <h2 className="text-2xl font-bold text-foreground">School history</h2>
            <p className="mt-4 text-muted leading-relaxed">
              From a small cohort of pioneers to a thriving community of learners
              and educators, our journey has been marked by steady investment in
              facilities, faculty development, and learner well-being. Each
              decade strengthened our reputation for disciplined study, creative
              expression, and service to the wider city.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Today we continue to expand STEM access, digital learning, and
              careers guidance—equipping students not only for examinations, but
              for life beyond the school gates.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.06}>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              <Image
                src="/about-school-history.png"
                alt="Students in uniform leaving a broadcast facility after a learning visit, with notebooks and transmitters equipment visible"
                width={900}
                height={600}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </MotionReveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <MotionReveal>
            <div className="h-full rounded-2xl border border-border bg-surface-elevated p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary">Mission</h2>
              <p className="mt-3 text-muted leading-relaxed">
                To cultivate knowledgeable, ethical, and resilient young people
                through outstanding teaching, mentoring, and a nurturing school
                culture anchored in Nigerian and universal values.
              </p>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.05}>
            <div className="h-full rounded-2xl border border-border bg-surface-elevated p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary">Vision</h2>
              <p className="mt-3 text-muted leading-relaxed">
                To be a leading secondary school recognised across West Africa for
                holistic education—where every learner discovers their gifts and
                steps confidently into higher education and meaningful service.
              </p>
            </div>
          </MotionReveal>
        </div>
      </Section>

      <Section className="bg-surface-elevated">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <MotionReveal>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              <Image
                src="/principal.png"
                alt="Rev. Dr. Samuel Garba, Principal"
                width={900}
                height={600}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.06}>
            <h2 className="text-2xl font-bold text-foreground">
              Principal&rsquo;s message
            </h2>
            <p className="mt-4 italic text-lg text-foreground/90 leading-relaxed">
              &ldquo;Education is not only about grades—it is about shaping
              character, awakening curiosity, and building community. At{" "}
              {SITE.name}, we walk closely with each student, celebrating
              progress and addressing challenges with honesty and care.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold text-primary">
              — Mr principal, cant remeber his name 
            </p>
          </MotionReveal>
        </div>
      </Section>
    </>
  );
}
