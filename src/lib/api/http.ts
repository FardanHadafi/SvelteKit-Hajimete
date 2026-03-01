import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function apiFetch(url: string, options: RequestInit) {
	const headers = {
		'Content-Type': 'application/json',
		...(options.headers || {})
	};

	const response = await fetch(`${PUBLIC_BACKEND_URL}${url}`, {
		...options,
		headers
	});

	let data;
	const text = await response.text();

	try {
		data = text ? JSON.parse(text) : {};
	} catch {
		data = { error: text || 'Invalid JSON response' };
	}

	if (!response.ok) {
		throw new Error(data.error ?? `API Error: ${response.status}`);
	}

	return data;
}
