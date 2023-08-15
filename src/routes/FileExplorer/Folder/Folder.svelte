<script lang="ts">
	import { getFolderIcon, resolvePathToFolder, type TFolder } from '$lib/folder';
	import { rootFolder } from '../../stores';
	import File from '../File/File.svelte';
	import FolderActions from './FolderActions.svelte';

	export let folder: TFolder;
	export let parentFolder: TFolder | null = null;

	let actionsOpen = false;
	let path = `~/${folder.folder.name}`;

	$: if ($rootFolder?.folder) {
		resolvePathToFolder($rootFolder, folder).then((p) => {
			if (p.length > 0) {
				path = `~/${$rootFolder?.folder.name}/${p.join('/')}`;
			}
		});
	}
	$: icon = getFolderIcon(folder.folder.name);
</script>

<button
	on:click={() => (folder.expanded = !folder.expanded)}
	on:contextmenu={() => (actionsOpen = !actionsOpen)}
	title={path}
	class="flex items-center w-full text-sm transition rounded-sm hover:bg-dark-3"
>
	<img
		src="/icons/right-angle.svg"
		alt={folder.expanded ? 'Shrink' : 'Expand'}
		class="w-5 h-5"
		class:rotate-90={folder.expanded}
	/>
	<img
		src="/icons/folder/{icon}{folder.expanded ? '-open' : ''}.svg"
		alt="folder"
		class="w-4 h-4 mr-2"
	/>
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{folder.folder.name}
	</span>
</button>

<FolderActions {folder} {parentFolder} bind:isOpen={actionsOpen} />

{#if folder.expanded}
	<ul class="pl-1.5 ml-2 text-sm border-l border-dark-3">
		{#each folder.subfolders as subfolder}
			<li>
				<svelte:self bind:folder={subfolder} bind:parentFolder={folder} />
			</li>
		{/each}
		{#each folder.subfiles as subfile}
			<li>
				<File bind:file={subfile} />
			</li>
		{/each}
	</ul>
{/if}
