"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[85vh] overflow-hidden">
      <Image
        src="/home-hero.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-background/55 to-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur"
        >
          Kaduna · Nigeria
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Welcome to {SITE.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
        >
          {SITE.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <ButtonLink
            href="/admissions"
            className="bg-white text-primary shadow-xl shadow-black/20 hover:brightness-95"
          >
            Apply Now
          </ButtonLink>
          <ButtonLink
            href="/portal"
            variant="outline"
            className="border-white/60 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            Student Portal
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
