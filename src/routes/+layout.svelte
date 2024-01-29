<script>
	import '../app.pcss';
</script>

<div class="flex min-h-dvh flex-col">
	<main class="flex-1 p-5">
		<slot />
	</main>
	<footer class="py-2 text-center">
		Made with <span class="text-red-500">&hearts;</span> by
		<a
			class="text-indigo-500 transition hover:text-indigo-300"
			href="https://github.com/IndraSaputraIdrus"
			target="__blank">Indra</a
		>
	</footer>
</div>
