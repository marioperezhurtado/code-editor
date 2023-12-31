<script lang="ts">
	import { getFileIcon, resolvePathToFile, type TFile } from '$lib/file';
	import { selectedFile, rootFolder, openFiles, draggedFile, notifications } from '../../stores';
    import { t } from '$lib/i18n/translations';
	import FileActions from './FileActions.svelte';
	import RenameFile from './RenameFile.svelte';

	export let file: TFile;
	$: icon = getFileIcon(file.file.name);

	let actionsOpen = false;
	let renaming = false;
	let path = file.file.name;

	$: if ($rootFolder?.folder) {
		resolvePathToFile($rootFolder, file).then((p) => {
			if (p) {
				path = `~/${$rootFolder?.folder.name}/${p.join('/')}`;
			}
		});
	}

	async function handleOpenFile() {
		try {
			await openFiles.open(file);
		} catch (e) {
			notifications.add({
                title: `${$t('files.openError.title')} '${file.file.name}'`,
                description: $t('files.openError.description'),
				type: 'error'
			});
		}
	}
</script>

{#if renaming}
	<RenameFile {file} bind:isOpen={renaming} />
{:else}
	<button
		on:click={handleOpenFile}
		on:dragstart={() => draggedFile.drag(file)}
		on:dragend={draggedFile.drop}
		on:contextmenu={() => (actionsOpen = !actionsOpen)}
		title={path}
		draggable="true"
		class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
		class:bg-dark-3={$selectedFile?.file === file}
	>
		<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
		<span class="overflow-hidden whitespace-nowrap text-ellipsis">
			{file.file.name}
		</span>
	</button>
{/if}

<FileActions {file} bind:isOpen={actionsOpen} bind:isRenaming={renaming} />
