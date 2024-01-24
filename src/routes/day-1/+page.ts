import type { PageLoad } from './$types';

type Child = {
	name: string;
	tally: number;
};

export const load: PageLoad = async ({ fetch }) => {
	async function getData(): Promise<Child[]> {
		const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		return res.json();
	}

	return {
		childs: await getData()
	};
};
