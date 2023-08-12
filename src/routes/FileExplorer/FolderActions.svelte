<script lang="ts">
	import { rootFolder, notifications } from '../stores';
	import type { TFolder } from '$lib/folder';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let folder: TFolder;
	export let isOpen: boolean;

	let confirmingDelete = false;

	async function handleDelete() {
		if (!$rootFolder?.folder) return;

		try {
			await rootFolder.deleteFolder(folder);
		} catch (e) {
			notifications.add({
				title: `The folder "${folder.folder.name}" could not be deleted`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

<ContextMenu on:outclick={() => (isOpen = false)}>
	<ContextMenuItem title="Move to..." command="M" />

	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" />
	<ContextMenuItem
		title="Delete permanently"
		command="D"
		on:click={() => (confirmingDelete = true)}
	/>

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
