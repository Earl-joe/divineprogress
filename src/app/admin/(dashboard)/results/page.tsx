"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import {
  RESULT_CLASS_FILTERS,
  studentMatchesResultFilter,
} from "@/lib/class-options";

type ApiStudent = {
  _id: string;
  studentName: string;
  class: string;
  parentName: string;
  parentEmail: string;
};

function ResultRowActions({
  studentId,
  onUploaded,
}: {
  studentId: string;
  onUploaded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-w-[220px] flex-col gap-2 lg:flex-row lg:items-center lg:justify-end">
      <input
        type="file"
        className="max-w-full text-xs file:mr-2 file:rounded-lg file:border-0 file:bg-accent-soft file:px-2 file:py-1"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setMsg("");
        }}
      />
      <Button
        type="button"
        className="shrink-0 rounded-lg px-3 py-1.5 text-xs"
        disabled={loading}
        onClick={async () => {
          if (!file) {
            setMsg("Choose a file");
            return;
          }
          setLoading(true);
          setMsg("");
          try {
            const fd = new FormData();
            fd.append("file", file);
            await apiRequest(`/admin/upload-file/${studentId}`, {
              method: "POST",
              body: fd,
            });
            setMsg("Sent");
            setFile(null);
            onUploaded();
          } catch (e) {
            setMsg(e instanceof Error ? e.message : "Failed");
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "…" : "Send file"}
      </Button>
      {msg ? <span className="text-xs text-muted">{msg}</span> : null}
    </div>
  );
}

export default function AdminResultsPage() {
  const [students, setStudents] = useState<ApiStudent[]>([]);
  const [classFilter, setClassFilter] = useState<string>("all");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const loadStudents = useCallback(async () => {
    try {
      const list = await apiRequest<ApiStudent[]>("/admin/students");
      setStudents(list);
    } catch {
      setStudents([]);
    }
  }, []);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  const filtered = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();
    return students.filter((s) => {
      if (!studentMatchesResultFilter(s.class, classFilter)) return false;
      if (!q) return true;
      const blob = `${s.studentName} ${s.parentName} ${s.parentEmail} ${s.class}`.toLowerCase();
      return blob.includes(q);
    });
  }, [appliedSearch, classFilter, students]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground">Share results</h2>
        <p className="mt-2 text-sm text-muted">
          Filter by class segment, search by name or email, then send a result file to each student.
          Files attach to that student&apos;s portal (same as{" "}
          <code className="text-xs">POST /api/admin/upload-file/:studentId</code>).
        </p>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <label className="block min-w-[200px] text-sm font-medium text-foreground">
            Category (class)
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            >
              {RESULT_CLASS_FILTERS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex min-w-[240px] flex-1 flex-col gap-2 sm:flex-row sm:items-end">
            <label className="block flex-1 text-sm font-medium text-foreground">
              Search
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setAppliedSearch(searchInput);
                  }
                }}
                placeholder="Name, parent email, or class…"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
              />
            </label>
            <Button
              type="button"
              className="shrink-0"
              onClick={() => setAppliedSearch(searchInput)}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm">
        <div className="border-b border-border px-4 py-3 text-sm text-muted">
          Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
          {students.length} students
        </div>
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 border-b border-border bg-accent-soft/80 backdrop-blur dark:bg-accent-soft/30">
              <tr className="text-muted">
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Parent email</th>
                <th className="px-4 py-3 text-right font-semibold">Send result file</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s._id} className="border-b border-border/70 align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{s.studentName}</td>
                  <td className="px-4 py-3 text-muted">{s.class}</td>
                  <td className="px-4 py-3 text-muted">{s.parentEmail}</td>
                  <td className="px-4 py-3">
                    <ResultRowActions studentId={s._id} onUploaded={() => void loadStudents()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-muted">No students match this filter.</p>
        ) : null}
      </section>
    </div>
  );
}
