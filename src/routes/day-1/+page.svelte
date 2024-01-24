<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	export let data: PageData;

	let pageSize = 10;
	let pageNumber = 1;
	let sorting = '';
	let childs = data.childs.map((item, index) => ({ id: index, ...item }));

	let errors: Record<string, unknown> = {};

	function handleSubmit(event: Event) {
		errors = {};

		const el = event.target as HTMLFormElement;
		const formData = new FormData(el);
		const name = formData.get('name') as string;
		const tally = Number(formData.get('tally'));

		const exist = childs.find((child) => child.name.toLowerCase() === name.toLowerCase());

		if (!name) {
			errors.name = 'This field is required';
		} else if (exist) {
			errors.name = `Name ${name} already exist`;
		}

		if (!tally) {
			errors.tally = 'This field is required';
		}

		if (!errors.name && !errors.tally) {
			childs = [{ id: Math.ceil(Math.random() * 100), name, tally }, ...childs];

			el.reset();
		}
	}

	async function handleEdit(event: Event) {
		const el = event.target as HTMLButtonElement;
		const id = Number(el.dataset.id);
		const action = el.dataset.action as string;
		const index = childs.findIndex((child) => child.id === id);

		if (action === 'increment') {
			childs[index].tally += 1;
		} else if (action === 'decrement') {
			childs[index].tally -= 1;
		} else {
			childs[index].tally = 0;
		}
	}

	function handleSortingStatus() {
		if (sorting === '') {
			sorting = 'status';
		} else if (sorting === 'status') {
			sorting = 'status-reverse';
		} else {
			sorting = '';
		}
	}

	$: startIndex = (pageNumber - 1) * pageSize;
	$: endIndex = startIndex + pageSize;
	$: pagination = Math.ceil(childs.length / pageSize);
	$: filtered = childs
		.map((child) => {
			const status = child.tally < 0 ? 'Naughty' : 'Nice';
			return {
				...child,
				status
			};
		})
		.sort((a, b) => {
			if (sorting === 'status') {
				if (a.status === 'Naughty' && b.status === 'Nice') {
					return -1;
				} else if (a.status === 'Nice' && b.status === 'Naughty') {
					return 1;
				}
			} else if (sorting === 'status-reverse') {
				if (a.status === 'Naughty' && b.status === 'Nice') {
					return 1;
				} else if (a.status === 'Nice' && b.status === 'Naughty') {
					return -1;
				}
			}
			return 0;
		})
		.slice(startIndex, endIndex);
</script>

<h1 class="mb-3 text-3xl font-semibold">Day - 1</h1>

<div class="rounded border p-5">
	<h2 class="mb-5 text-lg">Naughty Or Nice</h2>

	<div class="flex flex-col-reverse items-start gap-5 md:flex-row-reverse">
		<div class="w-full rounded border p-5 md:w-1/3">
			<h2 class="mb-3 text-2xl font-semibold">Enter new child</h2>
			<form on:submit|preventDefault={handleSubmit} class="space-y-3">
				<div class="space-y-1">
					<Label for="name" class="text-muted-foreground">Name</Label>
					<Input name="name" id="name" type="text" placeholder="e.g. Harry" />
					{#if errors.name}
						<span class="text-xs italic text-pink-400">{errors.name}</span>
					{/if}
				</div>
				<div class="space-y-1">
					<Label for="tally" class="text-muted-foreground">Tally</Label>
					<Input name="tally" id="tally" type="number" placeholder="e.g. -12" />
					{#if errors.tally}
						<span class="text-xs italic text-pink-400">{errors.tally}</span>
					{/if}
				</div>
				<Button type="submit" class="block w-full">Submit</Button>
			</form>
		</div>

		<div class="w-full md:w-2/3">
			<Table.Root class="border">
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-2/5">Name</Table.Head>
						<Table.Head class="w-1/5">Tally</Table.Head>
						<Table.Head class="w-1/5"
							><button class="cursor-pointer hover:underline" on:click={handleSortingStatus}
								>Status</button
							></Table.Head
						>
						<Table.Head class="w-1/5">Action</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each filtered as child}
						<Table.Row>
							<Table.Cell>{child.name}</Table.Cell>
							<Table.Cell class={child.status === 'Nice' ? 'text-green-500' : 'text-red-500'}
								>{child.tally}</Table.Cell
							>
							<Table.Cell>
								<span
									class={cn(
										'rounded px-2 py-1 text-sm font-semibold',
										child.status === 'Nice'
											? 'bg-green-300 text-green-700'
											: 'bg-red-300 text-red-700'
									)}
								>
									{child.status}
								</span>
							</Table.Cell>
							<Table.Cell class="flex gap-2">
								<button
									on:click={handleEdit}
									data-id={child.id}
									data-action="increment"
									class="rounded border px-2.5 py-1 text-sm transition hover:bg-white hover:text-black active:scale-105"
									>+</button
								>
								<button
									on:click={handleEdit}
									data-id={child.id}
									data-action="reset"
									class="rounded border px-3 py-1 text-sm transition hover:bg-white hover:text-black active:scale-105"
									>reset</button
								>
								<button
									on:click={handleEdit}
									data-id={child.id}
									data-action="decrement"
									class="rounded border px-2.5 py-1 text-sm transition hover:bg-white hover:text-black active:scale-105"
									>-</button
								></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<div class="mt-5 flex items-center justify-center gap-1">
				{#each { length: pagination } as _, index}
					<button
						class={cn(
							'size-8 border text-sm',
							index + 1 === pageNumber ? 'bg-white text-black' : ''
						)}
						on:click={() => (pageNumber = index + 1)}>{index + 1}</button
					>
				{/each}
			</div>
		</div>
	</div>
</div>
