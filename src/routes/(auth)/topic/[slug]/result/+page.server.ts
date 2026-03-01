import { apiFetch } from '$lib/api/http';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = cookies.get('token');
	try {
		const result = await apiFetch(`/topics/${params.slug}/result`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return { result };
	} catch (e) {
		console.error('Error fetching topic result:', e);
		
		const message = (e as Error).message;
		if (message.includes('Topic not found')) {
			throw error(404, {
				message: `Topik "${params.slug}" tidak ditemukan. Jika ini adalah UUID, pastikan endpoint backend '/result' sudah mendukung pencarian berdasarkan ID atau isi kolom 'slug' di database Anda.`
			});
		}
		
		throw error(500, {
			message: message || 'Terjadi kesalahan saat memuat hasil belajar.'
		});
	}
};
