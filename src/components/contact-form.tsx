"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

export function ContactForm() {
  const [notice, setNotice] = useState<"idle" | "sent">("idle");

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm md:p-8"
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
          id: `contact-${Date.now()}`,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          message: String(data.get("message") ?? ""),
          date: new Date().toISOString(),
        };

        try {
          await apiRequest("/contact/addmsg", {
            method: "POST",
            auth: "none",
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              message: payload.message,
            }),
          });
        } catch {
          // ignore
        }

        const raw = localStorage.getItem("dpa_contact_messages");
        const existing = raw ? (JSON.parse(raw) as typeof payload[]) : [];
        localStorage.setItem("dpa_contact_messages", JSON.stringify([payload, ...existing]));

        form.reset();
        setNotice("sent");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-foreground">
          Full name
          <input
            name="name"
            type="text"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 transition focus:ring-2"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 transition focus:ring-2"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-foreground">
        Phone (optional)
        <input
          name="phone"
          type="tel"
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 transition focus:ring-2"
          placeholder="+234 ..."
        />
      </label>
      <label className="block text-sm font-medium text-foreground">
        Message
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 transition focus:ring-2"
          placeholder="How can we help?"
        />
      </label>
      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
      {notice === "sent" ? (
        <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          Thank you—your message has been received. Our team will respond as soon
          as possible.
        </p>
      ) : null}
    </motion.form>
  );
}
