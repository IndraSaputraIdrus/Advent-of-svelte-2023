<script lang="ts">
	import type { PageData } from './$types';
	import type { Task, TaskType } from './+page';
  import Chart from "./Chart.svelte"

	export let data: PageData;

	function filtered(tasks: Task[], field: TaskType) {
		return tasks.filter((task) => task.task === field);
	}

	function filterDataByElf(tasks: Task[]) {
		let elfData: Record<string, { tasks: Task[] }> = {};
		tasks.forEach((task) => {
			if (!elfData[task.elf]) {
				elfData[task.elf] = { tasks: [] };
			}

			elfData[task.elf].tasks.push(task);
		});

		return Object.entries(elfData);
	}

	$: tasks = data.tasks;
	$: created = filtered(tasks, 'CREATED_TOY').length;
	$: wrapped = filtered(tasks, 'WRAPPED_PRESENT').length;
	$: taskByElf = filterDataByElf(tasks);
</script>

  <div class="max-w-3xl mx-auto px-5">
<div>
	<h1 class="mb-2 text-4xl font-semibold">Day - 5</h1>
	<p class="text-base text-muted-foreground">Present Progress</p>
</div>
<div class="my-10">
	<h1>Created Toy: {created}</h1>
	<h1>Wrapped Toy: {wrapped}</h1>

  <Chart data={taskByElf}/>
</div>
</div>
