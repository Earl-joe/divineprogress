"use client";

import { useEffect, useState } from "react";
import { SummaryCard } from "@/components/admin/summary-card";
import { Card } from "@/components/ui/card";
import {
  IconGraduationCap,
  IconUserSquare,
  IconUsersRound,
} from "@/components/ui/site-icons";
import { adminMessages } from "@/lib/admin-data";
import { apiRequest } from "@/lib/api";

type Stats = {
  totalStudents: number;
  totalParents: number;
  totalStaff: number;
};

type AnnouncementRow = {
  _id: string;
  title: string;
  content: string;
  date?: string;
  createdAt?: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const s = await apiRequest<Stats>("/admin/stats");
        setStats(s);
        setStatsError("");
      } catch (e) {
        setStatsError(e instanceof Error ? e.message : "Could not load stats");
        setStats(null);
      }

      try {
        const a = await apiRequest<{
          announcements: AnnouncementRow[];
        }>("/admin/announcements");
        setAnnouncements(a.announcements || []);
      } catch {
        setAnnouncements([]);
      }
    };
    void load();
  }, []);

  type RecentItem = {
    _id: string;
    title: string;
    content: string;
    date?: string;
    createdAt?: string;
  };

  const recent: RecentItem[] =
    announcements.length > 0
      ? announcements.slice(0, 4)
      : adminMessages.map((m) => ({
          _id: m.id,
          title: m.title,
          content: m.content,
          date: m.date,
        }));

  return (
    <div className="space-y-6">
      {statsError ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {statsError}
        </p>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Students"
          value={(stats?.totalStudents ?? "—").toString()}
          icon={<IconGraduationCap />}
        />
        <SummaryCard
          title="Total Parents"
          value={(stats?.totalParents ?? "—").toString()}
          icon={<IconUsersRound />}
        />
        <SummaryCard
          title="Total Staff"
          value={(stats?.totalStaff ?? "—").toString()}
          icon={<IconUserSquare />}
        />
      </section>

      <section>
        <Card hover={false} className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-lg font-bold text-foreground">Recent Announcements</h2>
            <p className="text-sm text-muted">Latest posts visible on the public site.</p>
          </div>
          <div className="divide-y divide-border">
            {recent.map((message) => {
              const d = message.date ?? message.createdAt;
              return (
                <article key={message._id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{message.title}</h3>
                      <p className="mt-1 text-sm text-muted">{message.content}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-primary">
                      {d ? new Date(d).toLocaleDateString() : ""}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
