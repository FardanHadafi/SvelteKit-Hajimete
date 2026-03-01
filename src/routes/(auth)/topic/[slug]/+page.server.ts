import { apiFetch } from '$lib/api/http';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = cookies.get('token');
	try {
		const topic = await apiFetch(`/topics/${params.slug}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return { topic };
	} catch (e) {
		console.error('Error fetching topic detail:', e);
		const message = (e as Error).message;
		
		if (message.includes('Topic not found')) {
			throw error(404, {
				message: `Topik "${params.slug}" tidak ditemukan. Pastikan kolom slug di database sudah terisi.`
			});
		}
		
		throw error(500, {
			message: message || 'Terjadi kesalahan saat memuat detail topik.'
		});
	}
};
