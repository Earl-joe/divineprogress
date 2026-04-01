"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("dpa_admin_token");
    if (!token) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      setAuth(false);
      return;
    }
    setAuth(true);
  }, [pathname, router]);

  if (auth === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted">
        Loading…
      </div>
    );
  }

  if (auth === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted">
        Redirecting to login…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background md:flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
