const API_KEY = '005504cfb7e5160f459c7987f1017218';
const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/';

// --- Global "requests in flight" counter, used by the loader overlay ---
let pending = 0;
const listeners = new Set<() => void>();

function setPending(delta: number) {
  pending += delta;
  listeners.forEach((listener) => listener());
}

export function subscribeToLoading(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPendingRequests() {
  return pending;
}

// --- Requests ---
export async function fetchTmdb<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'en-US' });
  Object.entries(params).forEach(([key, value]) => query.set(key, String(value)));

  setPending(1);
  try {
    const res = await fetch(`${API_URL}${endpoint}?${query}`);
    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    setPending(-1);
  }
}

// --- Helpers ---
export function imageUrl(path: string | null | undefined, size: 'w500' | 'original' = 'w500') {
  return path ? `${IMAGE_URL}${size}/${path}` : null;
}

export function formatVotes(count: number) {
  return `${(count / 1000).toFixed(1)}k`;
}

export function minToHours(minutes: number) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}
