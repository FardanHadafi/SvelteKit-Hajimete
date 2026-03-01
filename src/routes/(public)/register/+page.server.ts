import { register } from '$lib/api/user.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		try {
			await register({ email, password });
		} catch (e) {
			if (isRedirect(e)) throw e;
			return fail(400, {
				error: (e as Error).message
			});
		}

		throw redirect(303, '/login');
	}
};
