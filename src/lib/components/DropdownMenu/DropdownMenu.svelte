<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/click_outside';

	let isOpen = false;

	export let title: string;
</script>

<button
	use:clickOutside
	on:outclick|self={() => (isOpen = false)}
	on:click={() => (isOpen = !isOpen)}
	aria-label={title}
	class="relative p-1 transition rounded-sm hover:bg-dark-2 hover:shadow-md"
	class:bg-dark-2={isOpen}
	class:shadow-md={isOpen}
>
	<slot name="trigger" />
	{#if isOpen}
		<!-- Triangle Indicator -->
		<div
			hidden={!isOpen}
			class="absolute bottom-7 right-1 w-0 h-0 border-l-[5px] border-l-transparent border-b-[8px] border-b-dark-2 border-r-[5px] border-r-transparent transition"
		/>

		<div
			in:fade={{ delay: 0, duration: 150 }}
			class="absolute right-0 flex flex-col gap-px overflow-hidden text-xs rounded-sm shadow-md bottom-10 bg-dark-3 text-light whitespace-nowrap"
		>
			<slot name="content" />
		</div>
	{/if}
</button>
