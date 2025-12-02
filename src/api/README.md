API helpers (client)
=====================

This folder contains lightweight fetch-based helpers to call the backend API and a few convenience functions used across the app.

Files
- client.ts — central API client: base URL, token management and a small fetch wrapper
- types.ts — shared response types used by the API helpers
- auth.ts — login/logout/me helpers
- tryOn.ts — startTryOn, getTryOnProgress, downloadResult
- uploads.ts — uploadModel helper

Usage examples

Login (new AuthAPI)
```ts
import AuthAPI from '@/api/auth.api';

const { token, user } = await AuthAPI.login({ email, password }, /* remember */ true);
// the AuthAPI will persist the token (localStorage/sessionStorage) depending on the second arg
```

Login (using zustand store)
```tsx
import { useAuthStore } from '@/lib/stores/auth-store';
import AuthAPI from '@/api/auth.api';

const { login } = useAuthStore();
// perform backend login and then update the store
const { token, user } = await AuthAPI.login({ email, password }, /* remember */ true);
login(token, user, /* remember */ true);
```

Start a try-on
```ts
import { startTryOn } from '@/api/tryOn';

const form = new FormData();
form.append('modelImage', modelFile);
form.append('clothingImage', clothingFile);
form.append('clothingType', 'Dress');

const { jobId } = await startTryOn(form);
```

Upload model image
```ts
import { uploadModel } from '@/api/uploads';

const data = await uploadModel(file, { height: 180 });
```

Notes
- The current dev environment uses Vite proxying /api -> http://localhost:5000, so the client can talk to the backend without CORS in development.
- The client API is intentionally small; swap to axios or another client if you want additional features (retries, interceptors, advanced timeouts) later.
