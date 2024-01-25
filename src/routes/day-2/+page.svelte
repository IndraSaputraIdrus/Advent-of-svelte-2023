<script lang="ts">
	import neutral from '$lib/assets/neutral.jpeg';
	import sad from '$lib/assets/sad.jpeg';
	import happy from '$lib/assets/happy.jpeg';
	import veryHappy from '$lib/assets/very-happy.jpeg';
	import cookiesImages from '$lib/assets/cookies.png';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fly, fade } from 'svelte/transition';

	type Mood = 'neutral' | 'sad' | 'happy' | 'veryHappy';

	let cookies = 0;
	let mood: Mood = 'neutral';

	function handleClick(action: 'increment' | 'decrement' | 'reset') {
		if (action === 'increment') {
			cookies += 1;
		} else if (action === 'decrement') {
			cookies -= 1;
		} else {
			cookies = 0;
		}
	}

	$: {
		if (cookies > 0 && cookies <= 10) {
			mood = 'happy';
		} else if (cookies > 10) {
			mood = 'veryHappy';
		} else if (cookies < 0) {
			mood = 'sad';
		} else {
			mood = 'neutral';
		}
	}
</script>

<div class="absolute left-20 top-10 flex w-40 flex-wrap gap-1">
	{#each { length: cookies } as _}
		<img transition:fly={{ x: 100 }} class="size-7" src={cookiesImages} alt="cookies" />
	{/each}
</div>

<div class="absolute right-20 top-10 rounded border p-4">
	<h1 class="mb-3 text-lg font-semibold">list mood:</h1>
	<ul class="space-y-2">
		<ol>{'1. Neutral: cookies = 0'}</ol>
		<ol>{'2. Sad: cookies < 0'}</ol>
		<ol>{'3. Happy: cookies > 0'}</ol>
		<ol>{'4. Very Happy: cookies > 10'}</ol>
	</ul>
</div>

<div class="mx-auto flex max-w-lg flex-col items-center justify-center gap-5 pt-10">
	<div>
		<p class="mb-1 text-lg">Santa mood:</p>
		<div class="flex size-[300px] items-center justify-center border bg-white">
			{#if mood === 'neutral'}
				<img in:fade src={neutral} alt="neutral" />
			{:else if mood === 'sad'}
				<img in:fade src={sad} alt="sad" />
			{:else if mood === 'happy'}
				<img in:fade src={happy} alt="happy" />
			{:else if mood === 'veryHappy'}
				<img in:fade src={veryHappy} alt="very-happy" />
			{/if}
		</div>
	</div>
	<p class="text-xl">Cookies: {cookies}</p>
	<div class="text-center">
		<div>
			<Button on:click={() => handleClick('increment')} class="text-xl">+</Button>
			<Button on:click={() => handleClick('reset')} class="text-xl">Reset</Button>
			<Button on:click={() => handleClick('decrement')} class="text-xl">-</Button>
		</div>
	</div>
</div>
