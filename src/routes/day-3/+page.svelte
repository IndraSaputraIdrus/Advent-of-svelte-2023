<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { Progress } from '$lib/components/ui/progress';
	import type { PageData } from './$types';
	import type { Presents } from './+page';

	export let data: PageData;
	let gifts: Presents[] = [];
	let weight = 0;

	async function addToSleigh(event: Event) {
		const element = event.target as HTMLButtonElement;
		const index = Number(element.dataset.index);

		if (weight + data.presents[index].weight > 100) {
			let message = 'Sorry, the weight exceeds the maximum weight limit for the sleigh.';
			return toast(message);
		}

		gifts = [data.presents[index], ...gifts];
		weight += data.presents[index].weight;
		const newData = data.presents.filter((_, indexData) => indexData !== index);
		data.presents = newData;
	}

	async function removeFromSleigh(event: Event) {
		const element = event.target as HTMLButtonElement;
		const index = Number(element.dataset.index);
		data.presents = [gifts[index], ...data.presents];
		weight -= data.presents[index].weight;
		const newData = gifts.filter((_, indexData) => indexData !== index);
		gifts = newData;
	}

	$: total = gifts.length;
</script>

<div>
	<h2 class="mb-5 text-xl font-semibold">Day # 3 - Jingle Bell Balancer</h2>
	<hr class="mb-5" />
	<div class="flex flex-col items-start gap-5 lg:flex-row-reverse">
		<div class="grid w-full grid-cols-2 gap-3 pb-5 lg:w-1/2">
			<Card.Root class="col-span-1 border-indigo-500 bg-indigo-900 text-indigo-300">
				<Card.Header>
					<Card.Title class="text-2xl">Total Gift</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>{total} Gift</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="col-span-1 border-teal-500 bg-teal-900 text-teal-200">
				<Card.Header>
					<Card.Title class="text-2xl">Weight</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<p>{weight.toFixed(2)} kg / 100 kg</p>
					<Progress value={weight} max={100} class="h-2 bg-teal-600" />
				</Card.Content>
			</Card.Root>

			<div class="col-span-2">
				<h1 class="mb-2 text-lg">List gift on sleigh</h1>
				<Table.Root class="border">
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-1/3">Name</Table.Head>
							<Table.Head class="w-1/3">Weight</Table.Head>
							<Table.Head class="w-1/3 text-right">Action</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if gifts.length > 0}
							{#each gifts as list, index}
								<Table.Row>
									<Table.Cell class="font-medium">{list.name}</Table.Cell>
									<Table.Cell>{list.weight} kg</Table.Cell>
									<Table.Cell class="text-right"
										><Button on:click={removeFromSleigh} data-index={index} variant="destructive"
											>Remove</Button
										></Table.Cell
									>
								</Table.Row>
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell colspan={3} class="text-center font-medium"
									>No present avaliable</Table.Cell
								>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
		<div class="w-full lg:w-1/2">
			<h1 class="mb-2 text-lg">List Gift</h1>
			<Table.Root class="border ">
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-1/3">Name</Table.Head>
						<Table.Head class="w-1/3">Weight</Table.Head>
						<Table.Head class="w-1/3 text-right">Action</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.presents as list, index}
						<Table.Row>
							<Table.Cell class="font-medium">{list.name}</Table.Cell>
							<Table.Cell>{list.weight} kg</Table.Cell>
							<Table.Cell class="text-right"
								><Button data-index={index} on:click={addToSleigh}>Select</Button></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</div>
<Toaster />
