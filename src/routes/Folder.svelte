<script lang="ts">
	import File from './File.svelte';
	import type { File as TFile } from './data';

	export let expanded = false;
	export let name: string;
	export let files: TFile[];
</script>

<button
	on:click={() => (expanded = !expanded)}
	class="flex items-center text-sm w-full hover:text-white hover:bg-neutral-700 rounded-sm transition"
>
	<img
		src="/icons/right-angle.svg"
		alt={expanded ? 'Shrink' : 'Expand'}
		class="w-5 h-5"
		class:rotate-90={expanded}
	/>
	<img src="/icons/folder/folder.svg" alt="folder" class="w-4 h-4 mr-2" />
	{name}
</button>

{#if expanded}
	<ul class="ml-2 border-l pl-2 border-neutral-600 text-sm">
		{#each files as file}
			<li>
				{#if file.files}
					<svelte:self {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}
