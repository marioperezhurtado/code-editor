<script lang="ts">
	import { rootFolder, openFiles, notifications } from '../../stores';
	import { fileClipboard } from '../file_clipboard';
	import { downloadFile, deleteFile, type TFile } from '$lib/file';
	import { t } from '$lib/i18n/translations';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let file: TFile;
	export let isOpen: boolean;
	export let isRenaming: boolean;

	let confirmingDelete = false;

	function handleClose() {
		confirmingDelete = false;
		isOpen = false;
	}

	function handleCopy() {
		fileClipboard.copy(file);
		isOpen = false;
	}

	function handleStartRenaming() {
		isRenaming = true;
		isOpen = false;
	}

	async function handleDelete() {
		try {
			openFiles.close(file);
			await deleteFile(file);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
                title: `${$t('files.actions.delete.error.title')} '${file.file.name}'`,
                description: $t('files.actions.delete.error.description'),
				type: 'error'
			});
		}
		isOpen = false;
	}

	async function handleDownload() {
		try {
			await downloadFile(file);
			notifications.add({
                title: `${$t('files.actions.download.success.title')} '${file.file.name}'`,
                description: $t('files.actions.download.success.description'),
				type: 'success'
			});
		} catch (e) {
			notifications.add({
                title: `${$t('files.actions.download.error.title')} '${file.file.name}'`,
                description: $t('files.actions.download.error.description'),
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

{#if isOpen}
	<ContextMenu on:outclick={handleClose}>
		<ContextMenuItem title={$t('files.actions.copy.title')} command="C" on:click={handleCopy} />

		<ContextMenuSeparator />
		<ContextMenuItem title={$t('files.actions.download.title')} on:click={handleDownload} />
		<ContextMenuSeparator />

		<ContextMenuItem
			title={$t('files.actions.rename.title')}
			command="R"
			on:click={handleStartRenaming}
		/>
		<ContextMenuItem
			title={$t('files.actions.delete.title')}
			command="D"
			on:click={() => (confirmingDelete = true)}
		/>

		{#if confirmingDelete}
			<Modal
				on:confirm={handleDelete}
				on:cancel={handleClose}
                title={`${$t('files.actions.delete.confirm.title')} '${file.file.name}'?`}
                description={$t('files.actions.delete.confirm.description')}
                cancelText={$t('files.actions.delete.confirm.cancel')}
                confirmText={$t('files.actions.delete.confirm.confirm')}
			/>
		{/if}
	</ContextMenu>
{/if}
