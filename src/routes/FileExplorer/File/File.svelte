<script lang="ts">
	import { getFileIcon, resolvePathToFile, type TFile } from '$lib/file';
	import type { TFolder } from '$lib/folder';
	import { selectedFile, rootFolder, notifications } from '../../stores';
	import FileActions from './FileActions.svelte';
	import RenameFile from './RenameFile.svelte';

	export let file: TFile;
	export let parentFolder: TFolder;
	$: icon = getFileIcon(file.file.name);

	let actionsOpen = false;
	let renaming = false;
	let path = file.file.name;

	$: if ($rootFolder?.folder) {
		resolvePathToFile($rootFolder.folder, file.file).then((p) => {
			if (p) {
				path = `~/${$rootFolder?.folder.name}/${p.join('/')}`;
			}
		});
	}

	async function handleOpenFile() {
		try {
			await selectedFile.open(file);
		} catch (e) {
			notifications.add({
				title: `The file "${file.file.name}" could not be opened`,
				description: 'It may have been deleted or moved.',
				type: 'error'
			});
		}
	}
</script>

{#if renaming}
	<RenameFile {file} {parentFolder} bind:isOpen={renaming} />
{:else}
	<button
		on:click={handleOpenFile}
		on:contextmenu={() => (actionsOpen = !actionsOpen)}
		title={path}
		class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
		class:bg-dark-3={$selectedFile?.file === file}
	>
		<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
		<span class="overflow-hidden whitespace-nowrap text-ellipsis">
			{file.file.name}
		</span>
	</button>
{/if}

<FileActions {file} {parentFolder} bind:isOpen={actionsOpen} bind:isRenaming={renaming} />
