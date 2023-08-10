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

<ContextMenu bind:isOpen>
	<ContextMenuItem title="Move to..." command="M" action={handleDelete} />

	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" action={handleDelete} />
	<ContextMenuItem
		title="Delete permanently"
		command="D"
		action={() => (confirmingDelete = true)}
	/>
</ContextMenu>

<Modal
	isOpen={confirmingDelete}
	onConfirm={handleDelete}
	title="Are you sure you want to delete '{folder.folder.name}' and all its contents permanently?"
	description="This action cannot be undone."
	cancelText="Cancel"
	confirmText="Delete"
/>
