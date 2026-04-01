"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("dpa_student_token");
    if (!token) {
      router.replace("/portal");
      setOk(false);
      return;
    }
    setOk(true);
  }, [router]);

  if (ok === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted">
        Loading…
      </div>
    );
  }

  if (ok === false) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted">
        Redirecting…
      </div>
    );
  }

  return <>{children}</>;
}
