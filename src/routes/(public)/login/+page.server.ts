import { login } from '$lib/api/user.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		try {
			const result = await login({ email, password });

			if (!result?.accessToken) {
				return fail(400, { error: 'Invalid login response' });
			}

			cookies.set('token', result.accessToken, {
				httpOnly: true,
				path: '/',
				sameSite: 'lax'
			});
			console.log('Login successful, token set to cookie');
			console.log('LOGIN RESULT:', result);
		} catch (e) {
			if (isRedirect(e)) throw e;
			return fail(400, {
				error: (e as Error).message
			});
		}

		throw redirect(303, '/topic');
	}
};
