"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function PortalLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/home-hero.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/80 to-accent/70" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-6xl items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md rounded-3xl border border-white/25 bg-white/95 p-8 shadow-2xl backdrop-blur dark:border-border dark:bg-surface-elevated/95"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {SITE.name}
          </p>
          <h1 className="mt-2 text-center text-2xl font-bold text-foreground">
            Student portal
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Sign in with d email and password given to your parent when they Registered 
            for now u have non. if u desprately wanna view ask EJ for an email and pswd
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              const form = e.currentTarget;
              const data = new FormData(form);
              const parentEmail = String(data.get("parentEmail") ?? "");
              const password = String(data.get("password") ?? "");

              try {
                const result = await apiRequest<{
                  token: string;
                  student: { studentName: string; parentEmail: string; class: string };
                }>("/student/login", {
                  method: "POST",
                  auth: "none",
                  body: JSON.stringify({ parentEmail, password }),
                });

                localStorage.setItem("dpa_student_token", result.token);
                localStorage.setItem("dpa_student_name", result.student.studentName);
                localStorage.setItem("dpa_student_class", result.student.class);
                router.push("/portal/dashboard");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Login failed");
              }
            }}
          >
            <label className="block text-sm font-medium text-foreground">
              Parent email
              <input
                name="parentEmail"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="parent@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-foreground">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
                placeholder="Student password"
              />
            </label>
            {error ? (
              <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            <Link href="/" className="font-semibold text-primary hover:underline">
              Return to website
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
