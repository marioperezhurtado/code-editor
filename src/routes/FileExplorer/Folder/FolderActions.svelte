<script lang="ts">
	import { rootFolder, notifications } from '../../stores';
	import { fileClipboard } from '../file_clipboard';
	import { deleteFolder, type TFolder } from '$lib/folder';
	import { copyFile } from '$lib/file';
	import { t } from '$lib/i18n/translations';

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
			notifications.add({
                title: `${$t('files.actions.copy.error.title')} '${$fileClipboard.file.name}'`,
                description: $t('files.actions.copy.error.description'),
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
				title: `${$t('folders.actions.delete.error.title')} '${folder.folder.name}'`,
				description: $t('folders.actions.delete.error.description'),
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
			<ContextMenuItem
				title={$t('folders.actions.paste.title')}
				command="V"
				on:click={handlePasteFile}
			/>
			<ContextMenuSeparator />
		{/if}

		<ContextMenuItem
			title={$t('folders.actions.createFile.title')}
			command="N"
			on:click={handleStartCreatingFile}
		/>
		<ContextMenuItem
			title={$t('folders.actions.createFolder.title')}
			command="F"
			on:click={handleStartCreatingFolder}
		/>

		{#if parentFolder}
			<ContextMenuSeparator />

			<ContextMenuItem
				title={$t('folders.actions.delete.title')}
				command="D"
				on:click={() => (confirmingDelete = true)}
			/>
		{/if}

		{#if confirmingDelete}
			<Modal
				on:confirm={handleDelete}
				on:cancel={() => (confirmingDelete = false)}
				title={`${$t('folders.actions.delete.confirm.title')} '${folder.folder.name}'?`}
				description={$t('folders.actions.delete.confirm.description')}
				cancelText={$t('folders.actions.delete.confirm.cancel')}
				confirmText={$t('folders.actions.delete.confirm.confirm')}
			/>
		{/if}
	</ContextMenu>
{/if}
