<script lang="ts">
	export let title: string;
</script>

<div class="space-y-3 border border-border p-4">
	<h1 class="text-xl font-semibold">{title}</h1>
	<p class="text-4xl font-normal text-indigo-500">
		<slot />
	</p>
</div>
