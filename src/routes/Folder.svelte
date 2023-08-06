<script lang="ts">
	import File from './File.svelte';
	import type { TFolder } from './data';

	export let folder: TFolder;
</script>

<button
	on:click={() => (folder.expanded = !folder.expanded)}
	class="flex items-center w-full text-sm transition rounded-sm hover:text-white hover:bg-neutral-700"
>
	<img
		src="/icons/right-angle.svg"
		alt={folder.expanded ? 'Shrink' : 'Expand'}
		class="w-5 h-5"
		class:rotate-90={folder.expanded}
	/>
	<img src="/icons/folder/folder.svg" alt="folder" class="w-4 h-4 mr-2" />
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{folder.name}
	</span>
</button>

{#if folder.expanded}
	<ul class="pl-2 ml-2 text-sm border-l border-neutral-600">
		{#each folder.subfiles as subfile}
			<li>
				{#if subfile.kind === 'file'}
					<File name={subfile.name} />
				{:else}
					<svelte:self folder={subfile} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}
