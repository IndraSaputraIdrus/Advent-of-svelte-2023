<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import type { Task } from './index';

	type Data = [string, { tasks: Task[] }][];

	export let data: Data;

	function getElfes(tasks: Data) {
		return tasks.map(([name]) => name);
	}

	function groupTask(tasks: Data) {
		let group: { wrapped: number[]; created: number[] } = {
			wrapped: [],
			created: []
		};

		tasks.forEach(([_, elf]) => {
			const wrappedData = elf.tasks.filter((item) => item.task === 'WRAPPED_PRESENT').length;
			const createdData = elf.tasks.filter((item) => item.task === 'CREATED_TOY').length;

			group.created.push(createdData);
			group.wrapped.push(wrappedData);
		});

		return group;
	}

	$: tasks = data.sort();
	$: elfes = getElfes(tasks);
	$: elfData = groupTask(tasks);

	let loading = true;
	let chart: Chart<'bar', number[], string>;
	let ctx: HTMLCanvasElement;

	onMount(() => {
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: elfes,
				datasets: [
					{
						label: 'Present Wrapped',
						data: elfData.wrapped,
						borderWidth: 1
					},
					{
						label: 'Toys Created',
						data: elfData.created,
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});

		function resizeChart() {
			chart.resize();
		}

		window.addEventListener('resize', resizeChart);
		loading = false;

		return {
			destroy() {
				chart.destroy();
				window.removeEventListener('resize', resizeChart);
			}
		};
	});
</script>

<div class="rounded border p-5">
	<canvas bind:this={ctx}></canvas>
</div>
