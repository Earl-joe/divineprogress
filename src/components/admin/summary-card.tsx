"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">{title}</p>
        <span className="text-primary [&_svg]:h-5 [&_svg]:w-5" aria-hidden>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
    </motion.article>
  );
}
