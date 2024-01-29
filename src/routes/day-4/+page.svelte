<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from '$lib/day-4/Chart.svelte';
	import Love from '$lib/day-4/Love.svelte';
	import { extent } from 'd3';

	let heartRate: number[] = [];
	let currentHearRate: number[] = [];

	$: average = heartRate.length > 0 ? calculateAverageHeartRate(heartRate) : '?';
	$: total = heartRate.length;
	$: minMax = extent(heartRate);

	function calculateAverageHeartRate(heartRates: number[]) {
		// Menghitung jumlah semua heart rate
		const sum = heartRates.reduce((acc, curr) => acc + curr, 0);

		// Menghitung rata-rata
		const average = sum / heartRates.length;

		return average.toFixed(2);
	}

	async function getHeartRate() {
		// const newHeartRate = Math.floor(Math.random() * 70) + 50;
		const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
		const data = await res.json();
		const newHeartRate = data.heartRate;

		heartRate = [...heartRate, newHeartRate];

		if (currentHearRate.length > 15) {
			currentHearRate.shift();
		}

		currentHearRate = [...currentHearRate, newHeartRate];
	}

	onMount(() => {
		const interval = setInterval(() => getHeartRate(), 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="grid grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-5 lg:px-20">
	<div class="lg:col-span-2">
		<h1 class="mb-2 text-4xl font-semibold">Day - 4</h1>
		<p class="text-base text-muted-foreground">Heart Of Cristmas</p>
	</div>
	<div class="grid grid-cols-2 gap-5">
		<div class="rounded-lg border border-border p-5">
			<h2 class="mb-3 text-base font-semibold text-gray-400">Heart Rate</h2>
			<p>
				<span class="mr-1 text-4xl font-semibold text-indigo-500"
					>{currentHearRate[currentHearRate.length - 1] ?? '?'}</span
				>
				<span class="text-base italic text-muted">Bps</span>
			</p>
		</div>
		<div class="rounded-lg border border-border p-5">
			<h2 class="mb-3 text-base font-semibold text-gray-400">Average</h2>
			<p>
				<span class="mr-1 text-4xl font-semibold text-indigo-500">{average}</span>
			</p>
		</div>
		<div class="rounded-lg border border-border p-5">
			<h2 class="mb-3 text-base font-semibold text-gray-400">Minimum Heart Rate</h2>
			<p>
				<span class="mr-1 text-4xl font-semibold text-indigo-500">{minMax[0] ?? 0}</span>
				<span class="text-base italic text-muted">Bps</span>
			</p>
		</div>
		<div class="rounded-lg border border-border p-5">
			<h2 class="mb-3 text-base font-semibold text-gray-400">Maximum Heart Rate</h2>
			<p>
				<span class="mr-1 text-4xl font-semibold text-indigo-500">{minMax[1] ?? 0}</span>
				<span class="text-base italic text-muted">Bps</span>
			</p>
		</div>
		<div class="col-span-2 my-10 flex items-center justify-center">
			<Love />
		</div>
	</div>
	<div class="flex w-full flex-col justify-center gap-10 rounded-lg border border-border p-5">
		{#if currentHearRate.length > 0}
			<Chart data={currentHearRate} height={300} />
			<p class="text-center text-lg font-semibold">
				Total: <span class="text-indigo-500">{total}</span>
			</p>
		{:else}
			<div class="flex h-[300px] w-full items-center justify-center">Loading</div>
		{/if}
	</div>
</div>
