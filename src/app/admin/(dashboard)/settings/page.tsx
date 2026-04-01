"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

export default function AdminSettingsPage() {
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dpa_admin_email");
    if (saved) setOldEmail(saved);
  }, []);

  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground">Account settings</h2>
      <p className="mt-2 text-sm text-muted">
        Updates your credentials via <code className="text-xs">PUT /api/admin/update-credentials</code>.
      </p>

      <form
        className="mt-6 max-w-lg space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setMessage("");
          setError("");
          try {
            await apiRequest("/admin/update-credentials", {
              method: "PUT",
              body: JSON.stringify({
                oldEmail,
                oldPassword,
                name: name || undefined,
                email: email || undefined,
                password: password || undefined,
              }),
            });
            if (name) localStorage.setItem("dpa_admin_name", name);
            if (email) localStorage.setItem("dpa_admin_email", email);
            setMessage("Profile updated successfully.");
            setPassword("");
            setOldPassword("");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Update failed");
          }
        }}
      >
        <label className="block text-sm font-medium text-foreground">
          Current email (verify)
          <input
            required
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            type="email"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            placeholder="Current login email"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          Current password (verify)
          <input
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          New name (optional)
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          New email (optional)
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-foreground">
          New password (optional)
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
        </label>

        {message ? (
          <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {error}
          </p>
        ) : null}

        <Button type="submit">Save changes</Button>
      </form>
    </section>
  );
}
