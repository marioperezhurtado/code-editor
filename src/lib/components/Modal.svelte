<script lang="ts">
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let description: string;
	export let cancelText: string;
	export let confirmText: string;
</script>

<div class="fixed top-0 left-0 w-screen h-screen bg-dark/70 z-10" />

<div
	in:scale
	class="fixed z-20 max-w-md p-4 -translate-x-1/2 rounded-sm shadow-md bottom-1/2 left-1/2 bg-dark-3"
>
	<h1 class="mb-5 text-base">{title}</h1>
	<p class="text-sm">{description}</p>
	<div class="flex justify-end gap-2 mt-5 text-sm">
		<button
			on:click={() => dispatch('cancel')}
			class="block px-3 py-1.5 rounded-sm shadow-md bg-dark-2"
		>
			{cancelText}
		</button>
		<button
			on:click={() => dispatch('confirm')}
			class="block px-3 py-1.5 rounded-sm shadow-md bg-accent"
		>
			{confirmText}
		</button>
	</div>
</div>
