"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { IconMoon, IconSun } from "@/components/ui/site-icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary",
        className
      )}
    >
      <span className="flex items-center justify-center [&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]" aria-hidden>
        {mounted ? isDark ? <IconSun /> : <IconMoon /> : <IconSun className="opacity-40" />}
      </span>
    </motion.button>
  );
}
