"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { SITE } from "@/lib/site";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
            Admin Login
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Sign in with your admin account (backend API).
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("idle");
              setErrorMessage("");
              const form = e.currentTarget;
              const data = new FormData(form);
              const email = String(data.get("email") ?? "");
              const password = String(data.get("password") ?? "");

              try {
                const result = await apiRequest<{
                  token: string;
                  admin: { id: string; name: string; email: string };
                }>("/admin/login", {
                  method: "POST",
                  auth: "none",
                  body: JSON.stringify({ email, password }),
                });

                localStorage.setItem("dpa_admin_logged_in", "true");
                localStorage.setItem("dpa_admin_token", result.token);
                localStorage.setItem("dpa_admin_name", result.admin.name);
                localStorage.setItem("dpa_admin_email", result.admin.email);
                setStatus("success");
                const nextPath = searchParams.get("next");
                router.push(nextPath || "/admin");
              } catch (err) {
                setStatus("error");
                setErrorMessage(err instanceof Error ? err.message : "Login failed");
              }
            }}
          >
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

            {status === "success" ? (
              <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                Login successful. Redirecting…
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {errorMessage || "Invalid credentials."}
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Need an admin account?{" "}
            <Link href="/admin/register" className="font-semibold text-primary hover:underline">
              Register (first admin only)
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen items-center justify-center bg-background">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
