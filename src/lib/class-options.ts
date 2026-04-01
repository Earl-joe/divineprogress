/**
 * Canonical class / stream list for Divine Progress School annex (frontend + filters).
 * Keep in sync with backend/constants/classOptions.js
 */
export const STUDENT_CLASS_OPTIONS = [
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Nursery 3",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS1 Art",
  "SS1 Commercial",
  "SS1 Science",
  "SS2 Art",
  "SS2 Commercial",
  "SS2 Science",
  "SS3 Art",
  "SS3 Commercial",
  "SS3 Science",
] as const;

export type StudentClassOption = (typeof STUDENT_CLASS_OPTIONS)[number];

/** Used on Results page to filter the full student list by segment. */
export const RESULT_CLASS_FILTERS = [
  { id: "all", label: "All classes" },
  { id: "creche", label: "Creche" },
  { id: "nursery", label: "Nursery 1–3" },
  { id: "primary", label: "Primary 1–5" },
  { id: "jss", label: "JSS 1–3" },
  { id: "ss1", label: "SS1 (Art / Commercial / Science)" },
  { id: "ss2", label: "SS2 (Art / Commercial / Science)" },
  { id: "ss3", label: "SS3 (Art / Commercial / Science)" },
] as const;

export function studentMatchesResultFilter(studentClass: string, filterId: string): boolean {
  const c = (studentClass || "").trim();
  if (filterId === "all") return true;
  if (filterId === "creche") return c === "Creche";
  if (filterId === "nursery") return /^Nursery\b/i.test(c);
  if (filterId === "primary") return /^Primary\b/i.test(c);
  if (filterId === "jss") return /^JSS\b/i.test(c);
  // Match "SS1", "SS1 Science", legacy short forms, etc.
  if (filterId === "ss1") return /^SS1\b/i.test(c);
  if (filterId === "ss2") return /^SS2\b/i.test(c);
  if (filterId === "ss3") return /^SS3\b/i.test(c);
  return true;
}
