"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

type Child = {
  studentId: string;
  studentName: string;
  class: string;
};

type ParentRow = {
  parentEmail: string;
  parentName: string;
  children: Child[];
};

export default function AdminParentsPage() {
  const [parents, setParents] = useState<ParentRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiRequest<{ parents: ParentRow[] }>("/admin/parents");
        setParents(res.parents || []);
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load parents");
        setParents([]);
      }
    };
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Parents</h2>
        <p className="text-sm text-muted">
          Built from student records: parents are grouped by <strong>parent email</strong>. Multiple
          students with the same email appear as one parent with several children.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-3 py-2 font-semibold">Parent name</th>
              <th className="px-3 py-2 font-semibold">Email</th>
              <th className="px-3 py-2 font-semibold">Children</th>
              <th className="px-3 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <tr key={parent.parentEmail} className="border-b border-border/70">
                <td className="px-3 py-3 font-medium text-foreground">{parent.parentName}</td>
                <td className="px-3 py-3 text-muted">{parent.parentEmail}</td>
                <td className="px-3 py-3 text-muted">
                  <ul className="list-inside list-disc space-y-1">
                    {parent.children.map((c) => (
                      <li key={String(c.studentId)}>
                        {c.studentName} <span className="text-xs">({c.class})</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-3">
                  <Button variant="outline" className="rounded-lg px-3 py-1.5 text-xs" type="button">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parents.length === 0 && !error ? (
          <p className="py-6 text-center text-sm text-muted">No students (and therefore no parents) yet.</p>
        ) : null}
      </div>
    </div>
  );
}
