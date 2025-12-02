import api from './api-instance';

export interface LoginPayload {
	email: string;
	password: string;
}

export interface SignupPayload {
	name?: string;
	email: string;
	password: string;
}

export interface AuthResponse<User = any> {
	token: string;
	user?: User;
}

/**
 * Basic Auth API class using the shared axios instance (api-instance.ts)
 * - login/signup return { token, user }
 * - token can be persisted to localStorage (remember=true) or sessionStorage (remember=false)
 */
export class AuthAPI {
	async login(payload: LoginPayload, remember = true) {
		// const res = await api.post<AuthResponse>('/auth/login', payload);
        const demoData = {
            token: "sakjdhfkjasdfkjnaskjdbfkjbsdf",
            user: {
                id: "u1",
                name: "Demo User",
                email: payload.email,
            },
        };
        const res = { data: demoData
        }
		const { token, user } = res.data;

		if (token) this.setToken(token, remember);

		return { token, user } as AuthResponse;
	}

	async signup(payload: SignupPayload, remember = true) {
		const res = await api.post<AuthResponse>('/auth/signup', payload);
		const { token, user } = res.data;

		if (token) this.setToken(token, remember);

		return { token, user } as AuthResponse;
	}

	async logout() {
		// try to notify backend if route exists, but ignore errors
		try {
			await api.post('/auth/logout');
		} catch (err) {
			// ignore server errors on logout; we'll clear token locally regardless
		}
		this.clearToken();
	}

	async me<T = any>() {
		const res = await api.get<T>('/auth/me');
		return res.data as T;
	}

	setToken(token: string, remember = true) {
		// clear both first
		this.clearToken();
		if (remember) {
			localStorage.setItem('token', token);
		} else {
			sessionStorage.setItem('token', token);
		}
	}

	clearToken() {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');
	}
}

export default new AuthAPI();

