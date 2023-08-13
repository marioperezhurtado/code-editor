<script lang="ts">
	import { clickOutside } from '$lib/click_outside';
	import { getFileIcon, renameFile, type TFile } from '$lib/file';
	import type { TFolder } from '$lib/folder';
	import { rootFolder, notifications } from '../../stores';

	export let file: TFile;
	export let parentFolder: TFolder;
	export let isOpen: boolean;

	let newFilename = file.name;
	$: icon = getFileIcon(newFilename);

	async function handleRenameFile() {
		if (!newFilename || newFilename === file.name) {
			isOpen = false;
			return;
		}

		try {
			await renameFile(parentFolder, file, newFilename);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
				title: `The file "${file.name}" could not be renamed`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

<div
	on:outclick={handleRenameFile}
	use:clickOutside
	class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
>
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<form on:submit|preventDefault={handleRenameFile}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			bind:value={newFilename}
			class="w-full px-1 border rounded-sm outline-none border-light-2 bg-dark-3"
			autofocus
		/>
	</form>
</div>
