"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.article
      whileHover={
        hover
          ? { y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }
          : undefined
      }
      className={cn(
        "rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm shadow-black/5 transition-shadow dark:shadow-black/40",
        hover && "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
        className
      )}
    >
      {children}
    </motion.article>
  );
}
