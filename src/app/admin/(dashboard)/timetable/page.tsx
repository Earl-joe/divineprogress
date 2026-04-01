"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

type TimetableEntry = {
  _id: string;
  title: string;
  fileName: string;
  filePath: string;
  createdAt?: string;
};

export default function AdminTimetablePage() {
  const [items, setItems] = useState<TimetableEntry[]>([]);
  const [title, setTitle] = useState("School timetable");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await apiRequest<{ timetables: TimetableEntry[] }>("/admin/timetables");
      setItems(res.timetables || []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">School timetable</h2>
        <p className="text-sm text-muted">
          Upload a timetable file (PDF, image, etc.). It is stored once and shown to{" "}
          <strong>all students</strong> on their portal — similar to announcements.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
        <p className="text-sm font-medium text-foreground">Upload new timetable</p>
        <div className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block flex-1 text-sm font-medium text-foreground">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
          </label>
          <label className="block flex-1 text-sm font-medium text-foreground">
            File
            <input
              type="file"
              className="mt-2 w-full text-sm"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <Button
            type="button"
            onClick={async () => {
              if (!file) {
                setStatus("Choose a file first.");
                return;
              }
              setStatus("");
              try {
                const fd = new FormData();
                fd.append("file", file);
                fd.append("title", title.trim() || "School timetable");
                await apiRequest("/admin/upload-timetable", {
                  method: "POST",
                  body: fd,
                });
                setFile(null);
                setStatus("Uploaded. All students can now download it from their portal.");
                await load();
              } catch (e) {
                setStatus(e instanceof Error ? e.message : "Upload failed");
              }
            }}
          >
            Upload for all students
          </Button>
        </div>
        {status ? (
          <p className="mt-3 text-sm text-muted">{status}</p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <h3 className="text-base font-semibold text-foreground">Uploaded timetables</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {items.length === 0 ? (
            <li className="text-muted">No timetables uploaded yet.</li>
          ) : (
            items.map((t) => (
              <li
                key={t._id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 py-2 last:border-0"
              >
                <span className="font-medium text-foreground">{t.title}</span>
                <a
                  href={t.filePath.startsWith("/") ? t.filePath : `/uploads/${t.filePath}`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.fileName}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
