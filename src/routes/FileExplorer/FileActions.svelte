<script lang="ts">
	import { rootFolder, notifications } from '../stores';
	import { downloadFile, type TFile } from '$lib/file';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let file: TFile;
	export let isOpen: boolean;

	let confirmingDelete = false;

	async function handleDelete() {
		if (!$rootFolder?.folder) return;

		try {
			await rootFolder.deleteFile(file);
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

<ContextMenu bind:isOpen>
	<ContextMenuItem title="Cut" command="X" on:click={handleDelete} />
	<ContextMenuItem title="Copy" command="C" on:click={handleDelete} />

	<ContextMenuSeparator />
	<ContextMenuItem title="Download" on:click={handleDownload} />
	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" on:click={handleDelete} />
	<ContextMenuItem
		title="Delete permanently"
		command="D"
		on:click={() => (confirmingDelete = true)}
	/>
</ContextMenu>

<Modal
	isOpen={confirmingDelete}
	onConfirm={handleDelete}
	title="Are you sure you want to delete '{file.file.name}' permanently?"
	description="This action cannot be undone."
	cancelText="Cancel"
	confirmText="Delete"
/>
