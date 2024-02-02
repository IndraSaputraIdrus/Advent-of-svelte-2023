import type { PageLoad } from './$types';
import type { Task } from '$lib/day-5';

export const load: PageLoad = async ({ fetch }) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-five.json';
	const res = await fetch(url);
	const data = (await res.json()) as Task[];
	return {
		tasks: data
	};
};
