<script lang="ts">
	import * as d3 from 'd3';

	export let data: number[];
	export let width = 640;
	export let height = 400;
	export let marginTop = 20;
	export let marginRight = 20;
	export let marginBottom = 30;
	export let marginLeft = 40;

	let gx: SVGGElement;
	let gy: SVGGElement;

	$: rates = data;

	$: x = d3
		.scaleLinear()
		.domain([0, rates.length - 1])
		.range([marginLeft, width - marginRight]);

	$: y = d3
		.scaleLinear()
		.domain(minMax)
		.range([height - marginBottom, marginTop]);

	$: minMax = d3.extent(rates) as number[];
	$: xAxis = d3.axisBottom(x);
	$: yAxis = d3.axisLeft(y);
	$: d3.select(gx).call(xAxis);
	$: d3.select(gy).call(yAxis);
	$: line = d3.line((_, index) => x(index), y);
</script>

<div bind:clientWidth={width}>
	<svg {width} {height}>
		<g bind:this={gx} transform="translate(0,{height - marginBottom})" />
		<g bind:this={gy} transform="translate({marginLeft},0)" />
		<path
			class="stroke-[#10A6FF]"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			d={line(rates)}
		/>
		{#if rates.length > 1}
			<g fill="currentColor" stroke="currentColor" stroke-width="1.5">
				{#each data as datum, i (i)}
					<!--
            <text
              class="text-indigo-500"
              stroke-width="1"
              dx={5}
              dy={-5}
              y={y(datum)}
              x={x(i)}>{datum}</text
            >
          -->
					<circle class="fill-red-[#F8F8F8] stroke-red-[#F8F8F8]" cx={x(i)} cy={y(datum)} r="2.5" />
				{/each}
			</g>
		{/if}
	</svg>
</div>
