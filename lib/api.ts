import type { CanvasElement, Screen } from "@/type";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.error ??
        data?.errors?.[0]?.message ??
        `Request gagal (${res.status})`,
    );
  }
  return data as T;
}

export const api = {
  createScreen: (width: number, height: number) =>
    request<Screen>("/screens", {
      method: "POST",
      body: JSON.stringify({ width, height }),
    }),

  saveDraft: (id: string, elements: CanvasElement[]) =>
    request<Screen>(`/screens/${id}`, {
      method: "PUT",
      body: JSON.stringify({ elements }),
    }),

  publish: (id: string) =>
    request<{ screenId: string; version: number; publishedAt: string }>(
      `/screens/${id}/publish`,
      { method: "POST" },
    ),
};
