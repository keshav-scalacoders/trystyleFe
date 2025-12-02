export async function uploadModel(file: File, metadata?: Record<string, string | number>): Promise<{ url: string } | any> {
  const form = new FormData();
  form.append('image', file);
  if (metadata) {
    Object.entries(metadata).forEach(([k, v]) => form.append(k, String(v)));
  }

  // use credentials in case the server relies on cookies/sessions
  const res = await fetch('/api/upload-model', {
    method: 'POST',
    body: form,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Upload failed');
  }

  return await res.json();
}
