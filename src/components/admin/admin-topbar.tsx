"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconChevronDown } from "@/components/ui/site-icons";

export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin User");

  useEffect(() => {
    const savedName = localStorage.getItem("dpa_admin_name");
    if (savedName) setAdminName(savedName);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Admin Dashboard
          </p>
          <h1 className="text-lg font-bold text-foreground">Welcome, {adminName}</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40"
            >
              Profile
              <IconChevronDown className="h-4 w-4 opacity-70" />
            </button>

            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-surface-elevated p-2 shadow-xl"
                >
                  <Link
                    href="/admin/settings"
                    className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent-soft"
                  >
                    Account settings
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-full justify-center rounded-lg py-2"
                    onClick={() => {
                      localStorage.removeItem("dpa_admin_logged_in");
                      localStorage.removeItem("dpa_admin_token");
                      localStorage.removeItem("dpa_admin_name");
                      router.push("/admin/login");
                    }}
                  >
                    Logout
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
