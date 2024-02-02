<script lang="ts">
	import type { PageData } from './$types';
	import Chart from '$lib/day-5/Chart.svelte';
	import Card from '$lib/day-5/Card.svelte';
	import { formatDate, filtered, filterDataByElf, getAverageTimeTaken } from '$lib/day-5';

	export let data: PageData;

	$: tasks = data.tasks;
	$: created = filtered(tasks, 'CREATED_TOY');
	$: wrapped = filtered(tasks, 'WRAPPED_PRESENT');

	$: minutesWrapped = wrapped.map((item) => item.minutesTaken);
	$: minutesCreated = created.map((item) => item.minutesTaken);
	$: fastestWrapped = Math.min(...minutesWrapped);
	$: slowestWrapped = Math.max(...minutesWrapped);
	$: fastestCreated = Math.min(...minutesCreated);
	$: slowestCreated = Math.max(...minutesCreated);

	$: averageTimeTakenWrapped = getAverageTimeTaken(wrapped);
	$: averageTimeTakenCreated = getAverageTimeTaken(created);

	$: taskByElf = filterDataByElf(tasks);
</script>

<div class="mx-auto max-w-3xl px-5">
	<div>
		<h1 class="mb-2 text-4xl font-semibold">Day - 5</h1>
		<p class="text-base text-muted-foreground">Present Progress</p>
	</div>
	<div class="my-10 grid gap-3 lg:grid-cols-2">
		<Card title="Created Toy">
			{created.length} <span class="text-sm text-muted-foreground">Toy</span>
		</Card>

		<Card title="Wrapped Toy">
			{wrapped.length} <span class="text-sm text-muted-foreground">Toy</span>
		</Card>

		<Card title="Fastest Created">
			{fastestCreated} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>

		<Card title="Slowest Created">
			{slowestCreated} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>

		<Card title="Fastest Wrapped">
			{fastestWrapped} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>

		<Card title="Slowest Wrapped">
			{slowestWrapped} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>

		<Card title="Average Time Wrapped">
			{averageTimeTakenWrapped} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>

		<Card title="Average Time Created">
			{averageTimeTakenCreated} <span class="text-sm text-muted-foreground">Minutes</span>
		</Card>
		<div class="border border-border p-4 lg:col-span-2">
			<h1 class="mb-4 text-2xl font-semibold">Event</h1>
			<ul class="h-96 space-y-1 overflow-y-auto text-base">
				{#each tasks as entry}
					<li>
						{#if entry.task === 'CREATED_TOY'}
							<span class="text-orange-500">{entry.elf}</span>
							<span class="text-pink-500">create</span>
							a toy at {formatDate(entry.date)}
						{/if}

						{#if entry.task === 'WRAPPED_PRESENT'}
							<span class="text-orange-500">{entry.elf}</span>
							<span class="text-teal-500">wrapped</span>
							a toy at {formatDate(entry.date)}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<div class="overflow-x-auto lg:col-span-2">
			<Chart data={taskByElf} />
		</div>
	</div>
</div>
