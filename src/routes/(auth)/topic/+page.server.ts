import { getTopics } from '$lib/api/topics';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { token } = await parent();
	const respnse = await getTopics(token);
	return { topics: respnse.data };
};
