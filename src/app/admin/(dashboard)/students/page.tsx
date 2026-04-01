"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import {
  RESULT_CLASS_FILTERS,
  STUDENT_CLASS_OPTIONS,
  studentMatchesResultFilter,
  type StudentClassOption,
} from "@/lib/class-options";

type ApiStudent = {
  _id: string;
  studentName: string;
  class: string;
  parentName: string;
  parentEmail: string;
  department?: string;
};

export default function AdminStudentsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [records, setRecords] = useState<ApiStudent[]>([]);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<{
    parentName: string;
    studentName: string;
    className: StudentClassOption;
    parentEmail: string;
    password: string;
  }>({
    parentName: "",
    studentName: "",
    className: STUDENT_CLASS_OPTIONS[0],
    parentEmail: "",
    password: "",
  });

  const loadStudents = async () => {
    try {
      const list = await apiRequest<ApiStudent[]>("/admin/students");
      setRecords(list);
      setLoadError("");
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load students");
    }
  };

  useEffect(() => {
    void loadStudents();
  }, []);

  const filtered = useMemo(
    () =>
      records.filter((student) => {
        if (!studentMatchesResultFilter(student.class, classFilter)) return false;
        const q = appliedSearch.trim().toLowerCase();
        if (!q) return true;
        const blob = `${student.studentName} ${student.class} ${student.parentName} ${student.parentEmail}`.toLowerCase();
        return blob.includes(q);
      }),
    [appliedSearch, classFilter, records]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Students</h2>
        <p className="text-sm text-muted">Classes follow the official list (Creche through SS3 streams).</p>
      </div>

      {loadError ? (
        <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {loadError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">Add Student</h3>
          <Button variant="outline" onClick={() => setShowAdd((v) => !v)}>
            {showAdd ? "Close" : "Open Add Section"}
          </Button>
        </div>

        {showAdd ? (
          <form
            className="grid gap-3 md:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await apiRequest("/admin/add-student", {
                  method: "POST",
                  body: JSON.stringify({
                    studentName: form.studentName,
                    parentName: form.parentName,
                    parentEmail: form.parentEmail,
                    class: form.className,
                    password: form.password,
                    department: "",
                  }),
                });
                setForm({
                  parentName: "",
                  studentName: "",
                  className: STUDENT_CLASS_OPTIONS[0],
                  parentEmail: "",
                  password: "",
                });
                setShowAdd(false);
                await loadStudents();
              } catch (err) {
                alert(err instanceof Error ? err.message : "Could not add student");
              }
            }}
          >
            <input
              required
              value={form.parentName}
              onChange={(e) => setForm((v) => ({ ...v, parentName: e.target.value }))}
              placeholder="Parent name"
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <input
              required
              value={form.studentName}
              onChange={(e) => setForm((v) => ({ ...v, studentName: e.target.value }))}
              placeholder="Student name"
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <label className="md:col-span-2 block text-sm font-medium text-foreground">
              Class
              <select
                required
                value={form.className}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    className: e.target.value as StudentClassOption,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
              >
                <optgroup label="Creche & Early years">
                  <option>Creche</option>
                  <option>Nursery 1</option>
                  <option>Nursery 2</option>
                  <option>Nursery 3</option>
                </optgroup>
                <optgroup label="Primary">
                  <option>Primary 1</option>
                  <option>Primary 2</option>
                  <option>Primary 3</option>
                  <option>Primary 4</option>
                  <option>Primary 5</option>
                </optgroup>
                <optgroup label="Junior secondary">
                  <option>JSS 1</option>
                  <option>JSS 2</option>
                  <option>JSS 3</option>
                </optgroup>
                <optgroup label="Senior secondary">
                  <option>SS1 Art</option>
                  <option>SS1 Commercial</option>
                  <option>SS1 Science</option>
                  <option>SS2 Art</option>
                  <option>SS2 Commercial</option>
                  <option>SS2 Science</option>
                  <option>SS3 Art</option>
                  <option>SS3 Commercial</option>
                  <option>SS3 Science</option>
                </optgroup>
              </select>
            </label>
            <input
              required
              type="email"
              value={form.parentEmail}
              onChange={(e) => setForm((v) => ({ ...v, parentEmail: e.target.value }))}
              placeholder="Parent email (student login ID)"
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm((v) => ({ ...v, password: e.target.value }))}
              placeholder="Set student password"
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <div className="md:col-span-2">
              <Button type="submit">Add Student</Button>
            </div>
          </form>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
          <label className="min-w-[200px] text-sm font-medium text-foreground">
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
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setAppliedSearch(searchInput);
                  }
                }}
                placeholder="Name, class, parent…"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 focus:ring-2"
              />
            </label>
            <Button type="button" className="shrink-0" onClick={() => setAppliedSearch(searchInput)}>
              Search
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Class</th>
                <th className="px-3 py-2 font-semibold">Parent</th>
                <th className="px-3 py-2 font-semibold">Parent Email</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student._id} className="border-b border-border/70">
                  <td className="px-3 py-3 font-medium text-foreground">{student.studentName}</td>
                  <td className="px-3 py-3 text-muted">{student.class}</td>
                  <td className="px-3 py-3 text-muted">{student.parentName}</td>
                  <td className="px-3 py-3 text-muted">{student.parentEmail}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="rounded-lg px-3 py-1.5 text-xs" type="button">
                        View
                      </Button>
                      <Button variant="outline" className="rounded-lg px-3 py-1.5 text-xs" type="button">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-lg px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700"
                        type="button"
                        onClick={async () => {
                          if (!confirm("Delete this student?")) return;
                          try {
                            await apiRequest(`/admin/delete-student/${student._id}`, {
                              method: "DELETE",
                            });
                            await loadStudents();
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
