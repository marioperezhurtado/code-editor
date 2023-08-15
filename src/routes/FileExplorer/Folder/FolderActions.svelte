<script lang="ts">
	import { rootFolder, notifications } from '../../stores';
	import { fileClipboard } from '../file_clipboard';
	import { deleteFolder, type TFolder } from '$lib/folder';
	import { copyFile } from '$lib/file';

	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import NewFile from '../File/NewFile.svelte';
	import NewFolder from './NewFolder.svelte';

	export let folder: TFolder;
	export let parentFolder: TFolder | null;
	export let isOpen: boolean;

	let confirmingDelete = false;
	let creatingFile = false;
	let creatingFolder = false;

	async function handlePasteFile() {
		if (!$fileClipboard) return;

		try {
			await copyFile($fileClipboard, folder);
			fileClipboard.paste();
			rootFolder.refresh();
		} catch (e) {
			console.error(e);
			notifications.add({
				title: `The file "${$fileClipboard.file.name}" could not be pasted`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
		isOpen = false;
	}

	function handleStartCreatingFile() {
		folder.expanded = true;
		creatingFile = true;
		isOpen = false;
	}

	function handleStartCreatingFolder() {
		folder.expanded = true;
		creatingFolder = true;
		isOpen = false;
	}

	async function handleDelete() {
		if (!parentFolder) return;

		try {
			await deleteFolder(parentFolder, folder);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
				title: `The folder "${folder.folder.name}" could not be deleted`,
				description: 'It may have been already deleted or moved.',
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

{#if creatingFile}
	<NewFile bind:isOpen={creatingFile} parentFolder={folder} />
{/if}
{#if creatingFolder}
	<NewFolder bind:isOpen={creatingFolder} parentFolder={folder} />
{/if}

{#if isOpen}
	<ContextMenu on:outclick={() => (isOpen = false)}>
		{#if $fileClipboard}
			<ContextMenuItem title="Paste" command="V" on:click={handlePasteFile} />
			<ContextMenuSeparator />
		{/if}

		<ContextMenuItem title="New file..." command="N" on:click={handleStartCreatingFile} />
		<ContextMenuItem title="New folder..." command="F" on:click={handleStartCreatingFolder} />

		{#if parentFolder}
			<ContextMenuSeparator />

			<ContextMenuItem
				title="Delete permanently"
				command="D"
				on:click={() => (confirmingDelete = true)}
			/>
		{/if}

		{#if confirmingDelete}
			<Modal
				on:confirm={handleDelete}
				on:cancel={() => (confirmingDelete = false)}
				title="Are you sure you want to delete '{folder.folder
					.name}' and all its contents permanently?"
				description="This action cannot be undone."
				cancelText="Cancel"
				confirmText="Delete"
			/>
		{/if}
	</ContextMenu>
{/if}
