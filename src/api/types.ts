export interface LoginResponse {
  token: string;
  // optionally include user data (expand later)
  [key: string]: any;
}

export interface TryOnStartResponse {
  jobId: string;
}

export interface TryOnProgressResponse {
  status: 'pending' | 'processing' | 'completed' | 'failed' | string;
  progress?: number;
  resultUrl?: string;
  error?: string;
}
