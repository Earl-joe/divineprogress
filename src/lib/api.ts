const DEFAULT_API_BASE = "/api";

export function getApiBase() {
  return process.env.NEXT_PUBLIC_API_BASE || DEFAULT_API_BASE;
}

export type ApiAuthMode = "admin" | "student" | "none";

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { auth?: ApiAuthMode } = {}
): Promise<T> {
  const { auth = "admin", ...rest } = options;
  const headers = new Headers(rest.headers);

  const isFormData =
    typeof FormData !== "undefined" && rest.body instanceof FormData;

  if (!isFormData && rest.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    if (auth === "admin") {
      const token = localStorage.getItem("dpa_admin_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } else if (auth === "student") {
      const token = localStorage.getItem("dpa_student_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const base = getApiBase().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${base}${p}`, {
    ...rest,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      (data && (data.message as string)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}
