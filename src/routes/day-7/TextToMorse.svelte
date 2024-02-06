<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { convertToMorse, createBeep, sleep, startMorse, stopMorse } from '$lib/day-7';
	import { onMount } from 'svelte';

	let inputValue: string = '';
	let morseCode: string[] = [];

	let oscillator: OscillatorNode;
	let gainNode: GainNode;

	let started = false;

	const frequency = 600;
	const dotTime = 80;
	const dashTime = dotTime * 3;
	const symbolBreak = dotTime;
	const wordBreak = dotTime * 7;

	async function startDot() {
		startMorse(gainNode);
		await sleep(dotTime);
		stopMorse(gainNode);
	}

	async function startDash() {
		startMorse(gainNode);
		await sleep(dashTime);
		stopMorse(gainNode);
	}

	async function play() {
		started = true;
		for (const morse of morseResult) {
			if (!started) break;

			if (morse === '.') {
				await startDot();
			} else if (morse === '-') {
				await startDash();
			} else if (morse === ' ') {
				await sleep(wordBreak);
			}

			await sleep(symbolBreak);
		}
		started = false;
	}

	onMount(() => {
		const audio = createBeep(frequency);
		oscillator = audio.oscillator;
		gainNode = audio.gainNode;

		return {
			destroy() {
				oscillator.stop();
			}
		};
	});

	$: morseResult = convertToMorse(morseCode, inputValue);
</script>

<div class="my-5">
	<Input type="text" bind:value={inputValue} />
	{#if morseResult}
		<p class="my-5 text-center text-xl font-semibold tracking-widest">{morseResult}</p>
	{:else}
		<p class="my-5 text-center text-xl font-semibold tracking-widest text-muted">
			Please Insert Text
		</p>
	{/if}

	<div class="flex items-center justify-end gap-1.5">
		<Button disabled={started} on:click={async () => await play()}>play</Button>
		<Button disabled={!started} on:click={() => (started = false)}>Stop</Button>
	</div>
</div>
