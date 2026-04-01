import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} in Kaduna.`,
};

export default function ContactPage() {
  return (
    <>
      <Section className="pb-8 pt-12">
        <MotionReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            We&rsquo;d love to hear from you
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Admissions questions, school visits, or general enquiries—reach our team
            using the details below or the form.
          </p>
        </MotionReveal>
      </Section>

      <Section className="bg-surface-elevated pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <MotionReveal>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold text-foreground">Visit &amp; mail</h2>
              <address className="mt-4 not-italic text-base leading-relaxed text-muted">
                {SITE.address}
              </address>
              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Phone</dt>
                  <dd className="text-muted">{SITE.phone}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Email</dt>
                  <dd className="text-muted">{SITE.email}</dd>
                </div>
              </dl>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Divine Progress School on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.140915252202!2d7.416248575717516!3d10.489555864418154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d35596af000d3%3A0x5bd73332e00ec2a6!2sDivine%20Progress%20School!5e0!3m2!1sen!2sng!4v1775078320720!5m2!1sen!2sng"
                className="h-[min(50vh,28rem)] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </MotionReveal>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
