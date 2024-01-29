<div class="love" />

<style>
	@keyframes heart {
		0% {
			transform: rotate(-45deg) scale(1.07);
		}
		80% {
			transform: rotate(-45deg) scale(1);
		}
		100% {
			transform: rotate(-45deg) scale(0.8);
		}
	}

	.love {
		--size: 100px;
		--bg-color: #f20044;
		background-color: var(--bg-color);
		height: var(--size);
		width: var(--size);
		position: relative;
		transform: rotate(-45deg);
		animation: heart 600ms linear infinite;
		box-shadow: 10px 10px 90px var(--bg-color);
	}

	.love::before {
		content: '';
		position: absolute;
		background-color: var(--bg-color);
		height: var(--size);
		width: var(--size);
		top: -50%;
		border-radius: var(--size);
	}

	.love::after {
		content: '';
		position: absolute;
		background-color: var(--bg-color);
		height: var(--size);
		width: var(--size);
		right: -50%;
		border-radius: var(--size);
	}
</style>
