"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/home-hero.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-blue-700/80 to-accent/75" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md rounded-3xl border border-white/30 bg-white/95 p-8 shadow-2xl backdrop-blur dark:border-border dark:bg-surface-elevated/95"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {SITE.name}
          </p>
          <h1 className="mt-2 text-center text-2xl font-bold text-foreground">
            Admin Registration
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            First admin only (backend enforces one admin account).
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("idle");
              setErrorMessage("");
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = String(data.get("name") ?? "");
              const email = String(data.get("email") ?? "");
              const password = String(data.get("password") ?? "");
              const confirm = String(data.get("confirm") ?? "");
              if (password !== confirm) {
                setStatus("error");
                setErrorMessage("Passwords do not match.");
                return;
              }
              try {
                const res = await apiRequest<{
                  token: string;
                  admin: { name: string; email: string };
                }>("/admin/register", {
                  method: "POST",
                  auth: "none",
                  body: JSON.stringify({ name, email, password }),
                });
                localStorage.setItem("dpa_admin_logged_in", "true");
                localStorage.setItem("dpa_admin_token", res.token);
                localStorage.setItem("dpa_admin_name", res.admin.name);
                localStorage.setItem("dpa_admin_email", res.admin.email);
                setStatus("success");
                router.push("/admin");
              } catch (err) {
                setStatus("error");
                setErrorMessage(err instanceof Error ? err.message : "Registration failed");
              }
            }}
          >
            <label className="block text-sm font-medium text-foreground">
              Name
              <input
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Admin full name"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="admin@divineprogressannex.edu.ng"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Enter password"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Confirm Password
              <input
                name="confirm"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Confirm password"
              />
            </label>

            {status === "success" ? (
              <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                Registration successful. Redirecting…
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              Register Admin
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Already registered?{" "}
            <Link href="/admin/login" className="font-semibold text-primary hover:underline">
              Go to login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
