import { me } from '$lib/api/user';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(303, '/login');
	}

	try {
		const user = await me(token);
		return { user };
	} catch {
		cookies.delete('token', { path: '/' });
		throw redirect(303, 'login');
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('token', { path: '/' });
		throw redirect(303, '/login');
	}
};
