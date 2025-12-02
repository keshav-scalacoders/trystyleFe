import apiClient from './client';
import type { TryOnStartResponse, TryOnProgressResponse } from './types';

export async function startTryOn(payload: unknown | FormData): Promise<TryOnStartResponse> {
  // if FormData, we need a multipart POST and possibly an Authorization header
  if (payload instanceof FormData) {
    const token = (apiClient as any).getToken ? (apiClient as any).getToken() : null;

    const res = await fetch('/api/try-on', {
      method: 'POST',
      body: payload,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Try-on failed');
    }

    return res.json();
  }

  return apiClient.fetch<TryOnStartResponse>('/try-on', {
    method: 'POST',
    json: payload,
  });
}

export async function getTryOnProgress(jobId: string): Promise<TryOnProgressResponse> {
  return apiClient.fetch<TryOnProgressResponse>(`/try-on/progress/${jobId}`);
}

export async function downloadResult(resultUrl: string): Promise<Blob> {
  // fetch raw blob (not JSON)
  const res = await fetch(resultUrl, { method: 'GET' });
  if (!res.ok) throw new Error('Could not download result');
  return await res.blob();
}
