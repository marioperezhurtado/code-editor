<script lang="ts">
	import { getFileIcon, resolvePathToFile } from '$lib/file';
	import { rootFolder, openFiles, selectedFile, type OpenFile } from '../stores';
	import TabActions from './TabActions.svelte';

	export let openFile: OpenFile;
	export let onClose: () => void;
	export let onCloseAll: () => void;

	let path = openFile.file.file.name;

	$: if ($rootFolder?.folder) {
		resolvePathToFile($rootFolder, openFile.file).then((p) => {
			if (p) {
				path = `~/${$rootFolder?.folder.name}/${p.join('/')}`;
			}
		});
	}

	$: icon = getFileIcon(openFile.file.file.name ?? '');
	$: edited = openFile.content !== openFile.editedContent;

	let actionsOpen = false;
</script>

<li>
	<button
		on:click={() => openFiles.select(openFile.file)}
		on:contextmenu={() => (actionsOpen = !actionsOpen)}
		title={path}
		class="flex items-center gap-1 px-3 py-2 pr-2 border-r border-y border-y-transparent bg-dark border-dark-3"
		class:border-b-accent={$selectedFile?.file === openFile.file}
	>
		<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
		{#if edited}
			<span>⚫</span>
		{/if}
		<span class="overflow-hidden whitespace-nowrap text-ellipsis">
			{openFile.file.file.name}
		</span>
		<button on:click|stopPropagation={onClose} class="ml-1 transition rounded-full hover:bg-dark-3">
			<img src="/icons/close.svg" alt="close" class="w-4 h-4" />
		</button>
	</button>
</li>

<TabActions bind:isOpen={actionsOpen} {openFile} {onClose} {onCloseAll} />
