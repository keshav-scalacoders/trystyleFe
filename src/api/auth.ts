import apiClient from './client';
import type { LoginResponse } from './types';

export async function login(data: { email: string; password: string }): Promise<LoginResponse> {
  const res = await apiClient.fetch<LoginResponse>('/auth/login', {
    method: 'POST',
    json: data,
  });

  if (res.token) {
    apiClient.setToken(res.token);
  }

  return res;
}

export function logout() {
  apiClient.setToken(null);
}

export async function me() {
  return apiClient.fetch('/auth/me');
}
