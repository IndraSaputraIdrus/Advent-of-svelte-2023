<script lang="ts">
	const links = [
		{ day: 1, title: 'Naughty or Nice' },
		{ day: 2, title: 'Merry Munch-o-Meter' },
		{ day: 3, title: 'Jingle Bell Balancer' },
		{ day: 4, title: 'Heart Of Christmas' },
		{ day: 5, title: 'Present Progress' },
		{ day: 6, title: 'Misteltoe Metronome' },
		{ day: 7, title: 'Morse Mischief' }
	];
</script>

<div class="mx-auto px-3 lg:max-w-2xl lg:px-5">
	<h1 class="mb-10 text-4xl font-semibold text-center">Advent of svelte 2023</h1>
	<div class="grid grid-cols-2 gap-2">
		{#each links as link}
			<a href="day-{link.day}" class="block">
				<div class="rounded border p-3 hover:bg-foreground/10 transition">
					<h1 class="text-xl font-semibold mb-1.5">Day {link.day}</h1>
					<p class="text-muted-foreground">{link.title}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
