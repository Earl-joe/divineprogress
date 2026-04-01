"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";

export function EventsActivities() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <div className="relative h-full min-h-[280px] w-full origin-center scale-[0.92] sm:scale-[0.94]">
          <Image
            src="/learning-leaves-classroom.png"
            alt="Divine Progress School annex students at a formal school pageant with sashes and crowns"
            fill
            className="object-cover object-[50%_32%] sm:object-[50%_30%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white/92 dark:from-background/95 dark:via-background/90 dark:to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-sky-200/25 dark:from-primary/15 dark:to-accent/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <MotionReveal>
          <div className="rounded-2xl border border-slate-200/90 bg-white/85 px-6 py-8 shadow-sm backdrop-blur-md dark:border-border dark:bg-surface-elevated/90">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-800 dark:text-primary">
              Events &amp; activities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-950">
              Where learning leaves the classroom
            </h2>
            <p className="mt-4 text-base text-slate-700 dark:text-muted">
              Signature experiences designed to stretch talent, build teamwork,
              and create lasting memories.
            </p>
          </div>
        </MotionReveal>
      </div>

      <div className="relative z-10 mt-12 grid gap-6 md:grid-cols-3">
        {events.map((e, i) => (
          <MotionReveal key={e.id} delay={i * 0.07}>
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="border-slate-200/90 bg-white/92 shadow-md backdrop-blur-md dark:border-primary/20 dark:bg-surface-elevated/95">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-800 dark:text-accent">
                  {e.date}
                </p>
                <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-slate-950">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-muted">{e.time}</p>
                <p className="mt-1 text-sm font-medium text-blue-800 dark:text-primary">
                  {e.location}
                </p>
              </Card>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
