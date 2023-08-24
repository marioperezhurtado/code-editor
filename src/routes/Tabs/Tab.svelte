<script lang="ts">
	import { getFileIcon, resolvePathToFile } from '$lib/file';
	import { rootFolder, openFiles, selectedFile, draggedFile, type OpenFile } from '../stores';
	import TabActions from './TabActions.svelte';

	export let openFile: OpenFile;
	export let onClose: () => void;
	export let onCloseAll: () => void;
	export let onCloseOthers: () => void;

	let actionsOpen = false;
	let path = openFile.file.file.name;
	let dragHover = false;

	$: if ($rootFolder?.folder) {
		resolvePathToFile($rootFolder, openFile.file).then((p) => {
			if (p) {
				path = `~/${$rootFolder?.folder.name}/${p.join('/')}`;
			}
		});
	}

	function handleDragLeave(e: DragEvent) {
		if (e.relatedTarget === null && $draggedFile !== null) {
			const tabIndex = $openFiles.files.findIndex((f) => f.file === openFile.file);
			openFiles.move($draggedFile, tabIndex);
		}
		dragHover = false;
	}

	$: icon = getFileIcon(openFile.file.file.name ?? '');
	$: edited = openFile.content !== openFile.editedContent;
	$: selected = $selectedFile?.file === openFile.file;
</script>

<li>
	<button
		on:mousedown={() => openFiles.select(openFile.file)}
		on:dragstart={() => draggedFile.drag(openFile.file)}
		on:dragend={draggedFile.drop}
		on:dragenter={() => (dragHover = $draggedFile !== openFile.file)}
		on:dragleave={handleDragLeave}
		on:contextmenu={() => (actionsOpen = !actionsOpen)}
		title={path}
		draggable="true"
		class="-mb-px flex items-center gap-1.5 px-3 py-2 pr-2 border-r
        border-t-accent border-dark-3 border-b"
		class:border-t={selected}
		class:border-b-transparent={selected}
		class:bg-dark={selected}
		class:bg-dark-3={dragHover}
	>
		<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" draggable="false" />
		{#if edited}
			<span>●</span>
		{/if}
		<span class="overflow-hidden whitespace-nowrap text-ellipsis" class:italic={edited}>
			{openFile.file.file.name}
		</span>
		<button on:click|stopPropagation={onClose} class="ml-1 transition rounded-full hover:bg-dark-3">
			<img src="/icons/close.svg" alt="close" class="w-4 h-4" />
		</button>
	</button>
</li>

<TabActions bind:isOpen={actionsOpen} {openFile} {onClose} {onCloseAll} {onCloseOthers} />
