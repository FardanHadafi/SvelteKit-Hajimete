import { apiFetch } from '$lib/api/http';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = cookies.get('token');
	const question = await apiFetch(`/topics/${params.slug}/questions`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (question.finished) {
		throw redirect(303, `/topic/${params.slug}/result`);
	}

	return {
		question,
		slug: params.slug
	};
};

export const actions: Actions = {
	submitAnswer: async ({ params, request, cookies }) => {
		const token = cookies.get('token');
		const formData = await request.formData();
		const answer = formData.get('answer') as string;

		try {
			const result = await apiFetch(`/topics/${params.slug}/questions`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					event: 'SUBMIT_ANSWER',
					answer
				})
			});

			return { success: true, result };
		} catch (e) {
			return { success: false, error: (e as Error).message };
		}
	},
	skipQuestion: async ({ params, cookies }) => {
		const token = cookies.get('token');

		try {
			const result = await apiFetch(`/topics/${params.slug}/questions`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					event: 'DONT_KNOW',
					answer: ''
				})
			});

			return { success: true, result };
		} catch (e) {
			return { success: false, error: (e as Error).message };
		}
	}
};
