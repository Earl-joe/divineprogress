"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminMessages } from "@/lib/admin-data";
import { apiRequest } from "@/lib/api";

type AnnouncementRow = {
  _id: string;
  title: string;
  content: string;
  date?: string;
  createdAt?: string;
};

export default function AdminMessagesPage() {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<AnnouncementRow[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await apiRequest<{ announcements: AnnouncementRow[] }>("/admin/announcements");
      setRows(res.announcements || []);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load announcements");
      setRows(
        adminMessages.map((m) => ({
          _id: m.id,
          title: m.title,
          content: m.content,
          date: m.date,
        }))
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter((m) =>
        `${m.title} ${m.content}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query, rows]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Announcements</h2>
          <p className="text-sm text-muted">Stored on the admin document in MongoDB.</p>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </p>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <div className="mb-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-foreground">Add announcement</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
          />
          <Button
            type="button"
            onClick={async () => {
              if (!title.trim() || !content.trim()) return;
              try {
                await apiRequest("/admin/add-announcement", {
                  method: "POST",
                  body: JSON.stringify({ title: title.trim(), content: content.trim() }),
                });
                setTitle("");
                setContent("");
                await load();
              } catch (err) {
                alert(err instanceof Error ? err.message : "Failed to add");
              }
            }}
          >
            Add Announcement
          </Button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search announcements..."
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
        />

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-2 font-semibold">Title</th>
                <th className="px-3 py-2 font-semibold">Content Preview</th>
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((message) => {
                const d = message.date || message.createdAt;
                return (
                  <tr key={message._id} className="border-b border-border/70">
                    <td className="px-3 py-3 font-medium text-foreground">{message.title}</td>
                    <td className="px-3 py-3 text-muted">
                      {message.content.slice(0, 80)}
                      {message.content.length > 80 ? "..." : ""}
                    </td>
                    <td className="px-3 py-3 text-muted">
                      {d ? new Date(d).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="rounded-lg px-3 py-1.5 text-xs"
                          type="button"
                          onClick={() =>
                            alert("Edit UI can call PUT /api/admin/edit/:announcementId when you add a modal.")
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-lg px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700"
                          type="button"
                          onClick={async () => {
                            if (!confirm("Delete this announcement?")) return;
                            try {
                              await apiRequest(`/admin/delete/${message._id}`, {
                                method: "DELETE",
                              });
                              await load();
                            } catch (err) {
                              alert(err instanceof Error ? err.message : "Delete failed");
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
