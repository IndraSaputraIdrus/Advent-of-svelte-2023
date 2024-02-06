<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onDestroy } from 'svelte';
	import drum from '$lib/assets/civil-drum-2_120bpm.mp3';
	import { browser } from '$app/environment';
	import { formatTime } from '$lib/day-6';

	let audio: HTMLAudioElement;

	let beats = 0;
	let time = 0;
	let started = false;
	let interval: number;

	$: bpm = beats / (time / 60) || 0;

	function stopTimer() {
		if (browser) {
			started = false;
			window.clearInterval(interval);
			time = 0;
			beats = 0;
		}
	}

	function reset() {
		beats = 0;
	}

	function addBeats() {
		audio.load();
		audio.play();
		beats++;
	}

	function startTimer() {
		if (browser) {
			stopTimer();
			started = true;
			interval = window.setInterval(() => {
				time++;
			}, 1000);
		}
	}

	if (browser) {
		audio = new Audio();
		audio.src = drum;
	}

	onDestroy(() => {
		stopTimer();
	});
</script>

<div class="mx-auto max-w-2xl space-y-10 px-5">
	<div>
		<h1 class="mb-2 text-4xl font-semibold">Day - 6</h1>
		<p class="text-base text-muted-foreground">Misteltoe Metronome</p>
	</div>
	<div class="grid grid-cols-2 items-center justify-center gap-2 text-center">
		<div class="col-span-1 col-start-1 row-start-1">
			<p
				class="rounded border border-indigo-500 py-10 text-3xl uppercase tracking-widest text-indigo-500"
			>
				Beats: {beats}
			</p>
		</div>

		<div class="col-span-2 col-start-1 row-start-2">
			<p
				class="rounded border border-indigo-500 py-10 text-3xl uppercase tracking-widest text-indigo-500"
			>
				Bpm: {bpm === Infinity ? 0 : bpm.toFixed()}
			</p>
		</div>

		<div class="col-span-1 col-start-2 row-start-1">
			<p
				class="rounded border border-indigo-500 py-10 text-3xl uppercase tracking-widest text-indigo-500"
			>
				Time: {formatTime(time)}
			</p>
		</div>
	</div>
	<div class="grid grid-cols-3 gap-3">
		<Button disabled={started} on:click={startTimer}>Start</Button>
		<Button disabled={!started} on:click={stopTimer}>Stop</Button>
		<Button disabled={beats < 1} on:click={reset}>Reset</Button>
		<div class="col-span-3 h-[200px]">
			<Button
				class="h-full w-full text-5xl uppercase tracking-widest transition focus:ring focus:ring-gray-500 active:scale-95"
				disabled={!started}
				on:click={addBeats}>Beats</Button
			>
		</div>
	</div>
</div>
