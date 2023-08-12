<script lang="ts">
	import { rootFolder, selectedFile, notifications } from '../../stores';
	import { downloadFile, deleteFile, type TFile } from '$lib/file';
	import type { TFolder } from '$lib/folder';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let file: TFile;
	export let parentFolder: TFolder;
	export let isOpen: boolean;
	export let isRenaming: boolean;

	let confirmingDelete = false;

	function handleStartRenaming() {
		isRenaming = true;
		isOpen = false;
	}

	async function handleDelete() {
		try {
			if ($selectedFile?.file === file.file) selectedFile.close();
			await deleteFile(parentFolder, file);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
				title: `The file "${file.file.name}" could not be deleted`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
		isOpen = false;
	}

	async function handleDownload() {
		try {
			await downloadFile(file.file);
			notifications.add({
				title: `The file "${file.file.name}" has been downloaded`,
				description: 'You can find it in your downloads folder.',
				type: 'success'
			});
		} catch (e) {
			notifications.add({
				title: `The file "${file.file.name}" could not be downloaded`,
				description: 'It may have been deleted or moved.',
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

{#if isOpen}
	<ContextMenu on:outclick={() => (isOpen = false)}>
		<ContextMenuItem title="Move to..." command="M" />

		<ContextMenuSeparator />
		<ContextMenuItem title="Download" on:click={handleDownload} />
		<ContextMenuSeparator />

		<ContextMenuItem title="Rename..." command="R" on:click={handleStartRenaming} />
		<ContextMenuItem
			title="Delete permanently"
			command="D"
			on:click={() => (confirmingDelete = true)}
		/>

		{#if confirmingDelete}
			<Modal
				on:confirm={handleDelete}
				on:cancel={() => (confirmingDelete = false)}
				title="Are you sure you want to delete '{file.file.name}' permanently?"
				description="This action cannot be undone."
				cancelText="Cancel"
				confirmText="Delete"
			/>
		{/if}
	</ContextMenu>
{/if}
