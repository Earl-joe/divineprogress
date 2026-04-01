"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export function CTASection() {
  return (
    <Section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary via-primary to-accent p-10 text-center shadow-2xl shadow-primary/25 md:p-14"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.28),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for the {SITE.name} experience?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Start your application or sign in to the student portal for
            timetables, results, and announcements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/admissions"
              className="bg-white text-primary shadow-lg hover:brightness-95"
            >
              Begin admission
            </ButtonLink>
            <ButtonLink
              href="/portal"
              variant="outline"
              className="border-white/60 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              Student portal
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
