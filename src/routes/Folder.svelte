<script lang="ts">
	import File from './File.svelte';
	import type { TFolder } from './data';

	export let folder: TFolder;
</script>

<button
	on:click={() => (folder.expanded = !folder.expanded)}
	title={folder.folder.name}
	class="flex items-center w-full text-sm transition rounded-sm hover:text-white hover:bg-neutral-700"
>
	<img
		src="/icons/right-angle.svg"
		alt={folder.expanded ? 'Shrink' : 'Expand'}
		class="w-5 h-5"
		class:rotate-90={folder.expanded}
	/>

	<img
		src="/icons/folder/folder{folder.expanded ? '-open' : ''}.svg"
		alt="folder"
		class="w-4 h-4 mr-2"
	/>
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{folder.folder.name}
	</span>
</button>

{#if folder.expanded}
	<ul class="pl-2 ml-2 text-sm border-l border-neutral-600">
		{#each folder.subfolders as subfolder}
			<li>
				<svelte:self folder={subfolder} />
			</li>
		{/each}
		{#each folder.subfiles as subfile}
			<li>
				<File file={subfile} />
			</li>
		{/each}
	</ul>
{/if}
