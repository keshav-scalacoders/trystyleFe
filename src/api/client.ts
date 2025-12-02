/*
 * Lightweight fetch-based API client for the frontend.
 * - centralizes base URL
 * - token management (in-memory), helper to set/remove token
 * - JSON error handling
 */

export type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  json?: unknown;
  useCredentials?: boolean; // if true, use 'credentials: include' instead of token header
  signal?: AbortSignal;
};

const DEFAULT_BASE = '/api';

let baseUrl = DEFAULT_BASE;
let token: string | null = null;

export function configureApi(opts: { base?: string } = {}) {
  if (opts.base) baseUrl = opts.base;
}

export function setToken(tk: string | null) {
  token = tk;
}

export function getToken() {
  return token;
}

async function parseJsonOrText(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiFetch<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { json, useCredentials, signal, ...init } = opts;

  const headers: Record<string, string> = {};

  if (!useCredentials && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: init.method ?? (json ? 'POST' : 'GET'),
    body: json !== undefined ? JSON.stringify(json) : undefined,
    headers: Object.keys(headers).length ? headers : undefined,
    credentials: useCredentials ? 'include' : undefined,
    signal,
    ...init,
  });

  if (!res.ok) {
    const body = await parseJsonOrText(res);
    const err = new Error(typeof body === 'string' ? body || res.statusText : (body?.message ?? res.statusText));
    // attach status and raw body for caller inspection
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }

  // Empty response
  if (res.status === 204) return undefined as unknown as T;

  const parsed = await parseJsonOrText(res);
  return parsed as T;
}

export default {
  configureApi,
  setToken,
  getToken,
  fetch: apiFetch,
};
