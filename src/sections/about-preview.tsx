import Link from "next/link";
import {
  CampusCultureSlider,
  type CampusCultureSlide,
} from "@/components/campus-culture-slider";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const campusCultureSlides: CampusCultureSlide[] = [
  {
    src: "/campus-culture.png",
    alt: "Divine Progress School annex students on a learning visit at a television studio",
  },
  {
    src: "/campus-culture-1.png",
    alt: "Students celebrating achievement with a school trophy on campus",
  },
];

export function AboutPreview() {
  return (
    <Section className="bg-surface-elevated">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14">
        <MotionReveal className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            About our school
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A calm campus culture with ambitious academics
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {SITE.name} combines rigorous teaching in Science, Arts,
            and Commercial pathways with leadership development, digital skills,
            and pastoral care. Our learners are known, challenged, and supported.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              Purpose-built labs, library, and creative studios for deep learning.
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              Houses, clubs, and service projects that build unity and character.
            </li>
            <li className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              Strong parent partnership through transparent reporting and events.
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about">Discover our story</ButtonLink>
            <Link
              href="/academics"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View academics →
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.08} className="relative min-w-0">
          <CampusCultureSlider slides={campusCultureSlides} />
        </MotionReveal>
      </div>
    </Section>
  );
}
