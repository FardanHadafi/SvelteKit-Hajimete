import { register } from '$lib/api/user.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		try {
			await register({ email, password });
			throw redirect(303, '/login');
		} catch (e) {
			return fail(400, {
				error: (e as Error).message
			});
		}
	}
};
