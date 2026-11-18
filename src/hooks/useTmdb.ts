import { useEffect, useState, useSyncExternalStore } from 'react';
import { fetchTmdb, getPendingRequests, subscribeToLoading } from '../api/tmdb.ts';

interface State<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

// Fetch one TMDB endpoint; refetches when the endpoint or params change
export function useTmdb<T>(endpoint: string | null, params: Record<string, string | number> = {}): State<T> {
  const [state, setState] = useState<State<T>>({ data: null, error: null, loading: Boolean(endpoint) });
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!endpoint) return undefined;
    let cancelled = false;
    setState({ data: null, error: null, loading: true });
    fetchTmdb<T>(endpoint, JSON.parse(paramsKey))
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((error: Error) => !cancelled && setState({ data: null, error, loading: false }));
    return () => {
      cancelled = true;
    };
  }, [endpoint, paramsKey]);

  return state;
}

// True while any TMDB request is in flight
export function useIsLoading() {
  return useSyncExternalStore(subscribeToLoading, getPendingRequests) > 0;
}
