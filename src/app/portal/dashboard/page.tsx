"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { portalNav, timetableRows } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { usePathname, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

type Announcement = {
  _id: string;
  title: string;
  content: string;
  date?: string;
  createdAt?: string;
};

type ResultFile = {
  _id: string;
  fileName: string;
  filePath: string;
};

type SchoolTimetable = {
  _id: string;
  title: string;
  fileName: string;
  filePath: string;
  createdAt?: string;
};

export default function PortalDashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("Student");
  const [cls, setCls] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [files, setFiles] = useState<ResultFile[]>([]);
  const [schoolTimetables, setSchoolTimetables] = useState<SchoolTimetable[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const n = localStorage.getItem("dpa_student_name");
    const c = localStorage.getItem("dpa_student_class");
    if (n) setName(n);
    if (c) setCls(c);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const a = await apiRequest<{ announcements: Announcement[] }>("/student/announcements", {
          auth: "student",
        });
        setAnnouncements(a.announcements || []);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Could not load data");
      }

      try {
        const r = await apiRequest<{ files: ResultFile[] }>("/student/results", {
          auth: "student",
        });
        setFiles(r.files || []);
      } catch {
        /* optional */
      }

      try {
        const t = await apiRequest<{ timetables: SchoolTimetable[] }>("/student/timetables", {
          auth: "student",
        });
        setSchoolTimetables(t.timetables || []);
      } catch {
        setSchoolTimetables([]);
      }
    };
    void load();
  }, []);

  const reloadResults = async () => {
    try {
      const r = await apiRequest<{ files: ResultFile[] }>("/student/results", {
        auth: "student",
      });
      setFiles(r.files || []);
    } catch {
      setFiles([]);
    }
  };

  const reloadTimetables = async () => {
    try {
      const t = await apiRequest<{ timetables: SchoolTimetable[] }>("/student/timetables", {
        auth: "student",
      });
      setSchoolTimetables(t.timetables || []);
    } catch {
      setSchoolTimetables([]);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-6">
      <aside className="lg:w-64 lg:flex-shrink-0">
        <div className="sticky top-24 space-y-2 rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Navigate
          </p>
          {portalNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-accent-soft text-primary"
                    : "text-muted hover:bg-accent-soft/60 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full justify-center text-xs"
            onClick={() => {
              localStorage.removeItem("dpa_student_token");
              localStorage.removeItem("dpa_student_name");
              localStorage.removeItem("dpa_student_class");
              router.push("/portal");
            }}
          >
            Sign out
          </Button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {name}</h1>
          <p className="mt-1 text-sm text-muted">
            {SITE.shortName}
            {cls ? ` · ${cls}` : ""}
          </p>
        </header>

        {err ? (
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {err}
          </p>
        ) : null}

        <section id="results">
          <h2 className="text-lg font-bold text-foreground">Results & files</h2>
          <p className="text-sm text-muted">Documents shared by the school office</p>
          <Card hover={false} className="mt-4 p-4">
            {files.length === 0 ? (
              <p className="text-sm text-muted">No files uploaded yet.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {files.map((f) => (
                  <li
                    key={f._id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2 last:border-0"
                  >
                    <a
                      href={f.filePath.startsWith("/") ? f.filePath : `/uploads/${f.filePath}`}
                      className="font-medium text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {f.fileName}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs text-rose-600 hover:text-rose-700"
                      onClick={() => {
                        if (
                          !confirm(
                            "Delete this file from your account? This cannot be undone. Contact the school if you need a copy again."
                          )
                        ) {
                          return;
                        }
                        void (async () => {
                          try {
                            await apiRequest(`/student/file/${f._id}`, {
                              method: "DELETE",
                              auth: "student",
                            });
                            await reloadResults();
                          } catch (e) {
                            alert(e instanceof Error ? e.message : "Could not delete");
                          }
                        })();
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <section id="timetable">
          <h2 className="text-lg font-bold text-foreground">Timetable</h2>
          <p className="text-sm text-muted">
            Official timetable files from the school office (same for all students).
          </p>
          <Card hover={false} className="mt-4 p-4">
            {schoolTimetables.length === 0 ? (
              <p className="text-sm text-muted">No school timetable uploaded yet.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {schoolTimetables.map((t) => (
                  <li
                    key={t._id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2 last:border-0"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">{t.title}</span>
                      <a
                        href={t.filePath.startsWith("/") ? t.filePath : `/uploads/${t.filePath}`}
                        className="ml-2 text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.fileName}
                      </a>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="shrink-0 text-xs text-rose-600 hover:text-rose-700"
                      onClick={() => {
                        if (
                          !confirm(
                            "Remove this timetable from your portal only? Other students still see it. This hides it for you."
                          )
                        ) {
                          return;
                        }
                        void (async () => {
                          try {
                            await apiRequest(`/student/timetable/${t._id}`, {
                              method: "DELETE",
                              auth: "student",
                            });
                            await reloadTimetables();
                          } catch (e) {
                            alert(e instanceof Error ? e.message : "Could not remove");
                          }
                        })();
                      }}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <h3 className="mt-8 text-base font-bold text-foreground">Sample weekly outline</h3>
          <p className="text-sm text-muted">Illustrative grid (not your official document)</p>
          <Card hover={false} className="mt-4 overflow-x-auto p-0">
            <table className="min-w-[720px] text-left text-xs sm:text-sm">
              <thead className="border-b border-border bg-accent-soft/50 dark:bg-accent-soft/20">
                <tr className="text-muted">
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Pd
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Mon
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Tue
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Wed
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Thu
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Fri
                  </th>
                </tr>
              </thead>
              <tbody>
                {timetableRows.map((row) => (
                  <tr key={row.period} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-semibold text-primary">{row.period}</td>
                    <td className="px-3 py-2 text-muted">{row.time}</td>
                    <td className="px-3 py-2">{row.mon}</td>
                    <td className="px-3 py-2">{row.tue}</td>
                    <td className="px-3 py-2">{row.wed}</td>
                    <td className="px-3 py-2">{row.thu}</td>
                    <td className="px-3 py-2">{row.fri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <section id="announcements">
          <h2 className="text-lg font-bold text-foreground">Announcements</h2>
          <p className="text-sm text-muted">From administration</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {announcements.slice(0, 6).map((n) => (
              <Card key={n._id} hover={false}>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {(n.date || n.createdAt) && new Date(n.date || n.createdAt!).toLocaleDateString()}
                </p>
                <h3 className="mt-2 font-bold text-foreground">{n.title}</h3>
                <p className="mt-2 text-sm text-muted">{n.content}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
