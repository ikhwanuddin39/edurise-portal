import { headers } from "next/headers";

export async function serverFetch(endpoint: string, init?: RequestInit) {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${protocol}://${host}${path}`;

  const res = await fetch(url, {
    ...init,
  });

  if (!res.ok) {
    throw new Error(`Gagal memuat data dari ${url}: ${res.statusText}`);
  }

  return res.json();
}
