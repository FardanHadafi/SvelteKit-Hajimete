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

	console.log(`[Load] question.finished for ${params.slug}:`, question.finished);

	if (question.finished) {
		console.log(`[Load] Redirecting to result for ${params.slug}`);
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

		console.log(`Submitting answer for ${params.slug}: "${answer}"`);

		try {
			const result = await apiFetch(`/topics/${params.slug}/questions`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					event: 'SUBMIT_ANSWER',
					answer: answer || ''
				})
			});

			console.log('Submit result:', JSON.stringify(result));
			
			if (result.finished) {
				console.log(`[Action] Finished! Redirecting to result for ${params.slug}`);
				throw redirect(303, `/topic/${params.slug}/result`);
			}

			return { success: true, result };
		} catch (e) {
			console.error('Submit error:', (e as Error).message);
			return { success: false, error: (e as Error).message };
		}
	},
	skipQuestion: async ({ params, cookies }) => {
		const token = cookies.get('token');

		console.log(`Skipping question for ${params.slug}`);

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

			console.log('Skip result:', JSON.stringify(result));

			if (result.finished) {
				console.log(`[Action] Finished via Skip! Redirecting to result for ${params.slug}`);
				throw redirect(303, `/topic/${params.slug}/result`);
			}

			return { success: true, result };
		} catch (e) {
			console.error('Skip error:', (e as Error).message);
			return { success: false, error: (e as Error).message };
		}
	}
};
