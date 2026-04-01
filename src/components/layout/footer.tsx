import Link from "next/link";
import { SITE } from "@/lib/site";

const quick = [
  { href: "/about", label: "Our Story" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/portal", label: "Student Portal" },
];

const social = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "X" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-foreground">{SITE.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              A premium secondary school experience rooted in Nigerian values and
              global standards—preparing learners to lead with integrity.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {quick.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="text-sm text-muted transition hover:text-primary"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Contact
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-muted">
              {SITE.address}
            </address>
            <p className="mt-3 text-sm text-muted">
              <span className="font-medium text-foreground">Phone:</span>{" "}
              {SITE.phone}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-foreground">Email:</span>{" "}
              {SITE.email}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {social.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted transition hover:border-primary/40 hover:text-primary"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
