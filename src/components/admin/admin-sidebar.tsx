"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import {
  IconBookMarked,
  IconCalendar,
  IconGraduationCap,
  IconLayoutDashboard,
  IconMail,
  IconMegaphone,
  IconSettings,
  IconUsersRound,
} from "@/components/ui/site-icons";

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const navItems: { href: string; label: string; icon: IconComp }[] = [
  { href: "/admin", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/admin/students", label: "Students", icon: IconGraduationCap },
  { href: "/admin/parents", label: "Parents", icon: IconUsersRound },
  { href: "/admin/results", label: "Results", icon: IconBookMarked },
  { href: "/admin/timetable", label: "Timetable", icon: IconCalendar },
  { href: "/admin/messages", label: "Announcements", icon: IconMegaphone },
  { href: "/admin/contact-messages", label: "Contact Inbox", icon: IconMail },
  { href: "/admin/settings", label: "Settings", icon: IconSettings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-border bg-surface-elevated/95 p-4 md:h-screen md:w-72 md:border-b-0 md:border-r md:p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {SITE.name}
        </p>
        <h2 className="mt-2 text-lg font-bold text-foreground">Admin Panel</h2>
      </div>

      <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-foreground hover:bg-accent-soft"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
