import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Student Portal",
  description: `Sign in to the ${SITE.name} student portal.`,
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface-elevated/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="text-sm font-bold text-foreground hover:text-primary">
            Back to {SITE.shortName}
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted sm:inline">
              Student portal (preview)
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
