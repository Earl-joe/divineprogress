"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110",
  outline:
    "border border-primary/40 bg-transparent text-primary hover:bg-accent-soft",
  ghost: "text-foreground hover:bg-accent-soft hover:text-primary",
} as const;

export type ButtonVariant = keyof typeof styles;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      <Link href={href} className={cn(base, styles[variant], className)}>
        {children}
      </Link>
    </motion.div>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  const fullWidth = /\bw-full\b/.test(className ?? "");
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={fullWidth ? "block w-full" : "inline-flex"}
    >
      <button
        className={cn(base, styles[variant], className)}
        type={props.type ?? "button"}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
