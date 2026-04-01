"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type CampusCultureSlide = {
  src: string;
  alt: string;
};

type CampusCultureSliderProps = {
  slides: CampusCultureSlide[];
  className?: string;
  /** Auto-advance interval in ms; set 0 to disable */
  intervalMs?: number;
};

export function CampusCultureSlider({
  slides,
  className,
  intervalMs = 7000,
}: CampusCultureSliderProps) {
  const [index, setIndex] = useState(0);
  const len = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (len <= 1 || intervalMs <= 0) return;
    const id = setInterval(() => go(1), intervalMs);
    return () => clearInterval(id);
  }, [go, len, intervalMs]);

  if (len === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-dashed border-border bg-muted text-sm text-muted sm:aspect-[16/11]",
          className
        )}
      >
        Add photos in About section slides.
      </div>
    );
  }

  const current = slides[index];

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-xl shadow-primary/10 sm:aspect-[16/11]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Campus and student life"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 to-transparent"
          aria-hidden
        />

        {len > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent sm:h-28" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 px-2 pb-3 pt-6 sm:gap-2 sm:pb-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
                aria-label="Previous photo"
              >
                <span aria-hidden className="text-lg leading-none">
                  ‹
                </span>
              </button>
              <div
                className="flex max-w-[min(100%,14rem)] flex-wrap items-center justify-center gap-1.5 sm:max-w-none"
                role="tablist"
                aria-label="Slide selection"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Photo ${i + 1} of ${len}`}
                    className={cn(
                      "pointer-events-auto h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      i === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/45 hover:bg-white/70"
                    )}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-10 sm:w-10"
                aria-label="Next photo"
              >
                <span aria-hidden className="text-lg leading-none">
                  ›
                </span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
