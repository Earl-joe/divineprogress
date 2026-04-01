import type { Metadata } from "next";
import {
  admissionRequirements,
  admissionSteps,
  feeRows,
} from "@/lib/data";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Apply to ${SITE.name}—requirements, process, and fees.`,
};

export default function AdmissionsPage() {
  return (
    <>
      <Section className="pb-8 pt-12">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Admissions
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Join our learning community
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A transparent, welcoming process designed to help your family make an
            informed decision—no surprises, just clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Speak with admissions</ButtonLink>
            <ButtonLink href="/portal" variant="outline">
              Returning students — portal
            </ButtonLink>
          </div>
        </MotionReveal>
      </Section>

      <Section className="bg-surface-elevated pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <MotionReveal>
            <h2 className="text-2xl font-bold text-foreground">
              Admission requirements
            </h2>
            <ul className="mt-6 space-y-3 text-muted">
              {admissionRequirements.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-1 text-primary">◆</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.06}>
            <Card hover={false} className="h-full border-primary/20">
              <h2 className="text-xl font-bold text-foreground">
                Indicative fees (UI only)
              </h2>
              <p className="mt-2 text-sm text-muted">
                Replace with live fee data from your bursary backend when
                connected.
              </p>
              <table className="mt-6 w-full text-sm">
                <tbody>
                  {feeRows.map((row) => (
                    <tr
                      key={row.item}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 text-muted">{row.item}</td>
                      <td className="py-3 text-right font-semibold text-foreground">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ButtonLink href="/contact" variant="outline" className="mt-6">
                Request detailed schedule
              </ButtonLink>
            </Card>
          </MotionReveal>
        </div>
      </Section>

      <Section>
        <MotionReveal>
          <h2 className="text-2xl font-bold text-foreground">
            Application process
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Four calm steps from first inquiry to first day of class.
          </p>
        </MotionReveal>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {admissionSteps.map((step, i) => (
            <MotionReveal key={step.step} delay={i * 0.05}>
              <Card className="relative overflow-hidden">
                <span className="text-5xl font-black text-accent-soft dark:text-primary/20">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </Card>
            </MotionReveal>
          ))}
        </ol>
        <MotionReveal className="mt-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Apply now — contact form</ButtonLink>
        </MotionReveal>
      </Section>
    </>
  );
}
