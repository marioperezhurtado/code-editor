<script lang="ts">
	import { scale } from 'svelte/transition';

	export let title: string;
	export let description: string;
	export let cancelText: string;
	export let confirmText: string;

	export let isOpen: boolean;
	export let onConfirm: () => void;
</script>

{#if isOpen}
	<div class="fixed top-0 left-0 w-screen h-screen cursor-pointer bg-dark/70" />

	<div
		in:scale
		class="fixed max-w-md p-4 -translate-x-1/2 rounded-sm shadow-md bottom-1/2 left-1/2 bg-dark-3"
	>
		<h1 class="mb-5 text-base">{title}</h1>
		<p>{description}</p>
		<div class="flex justify-end gap-2 mt-5 text-sm">
			<button
				on:click={() => (isOpen = false)}
				class="block px-3 py-1.5 rounded-sm shadow-md bg-dark-2"
			>
				{cancelText}
			</button>
			<button on:click={onConfirm} class="block px-3 py-1.5 rounded-sm shadow-md bg-accent">
				{confirmText}
			</button>
		</div>
	</div>
{/if}
