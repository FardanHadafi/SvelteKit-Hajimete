import type { LoginRequest, RegisterRequest } from '$lib/types/user';
import { apiFetch } from './http';

export async function register(payload: RegisterRequest) {
	return apiFetch('/register', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export async function login(payload: LoginRequest) {
	return apiFetch('/login', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export async function me(token: string) {
	return apiFetch('/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
