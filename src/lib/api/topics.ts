import { apiFetch } from './http';

export async function getTopics(token: string) {
	return apiFetch('/topics', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}
