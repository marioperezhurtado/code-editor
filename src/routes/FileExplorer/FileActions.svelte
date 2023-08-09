<script lang="ts">
	import { rootFolder } from '../stores';
	import type { TFile } from '$lib/file';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';
	import DangerModal from '$lib/components/DangerModal.svelte';

	export let file: TFile;
	export let isOpen: boolean;

	let confirmingDelete = false;

	async function handleDelete() {
		if (!$rootFolder?.folder) return;

		await rootFolder.deleteFile(file);
		isOpen = false;
	}
</script>

<ContextMenu bind:isOpen>
	<ContextMenuItem title="Cut" command="X" action={handleDelete} />
	<ContextMenuItem title="Copy" command="C" action={handleDelete} />

	<ContextMenuSeparator />
	<ContextMenuItem title="Download" action={handleDelete} />
	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" action={handleDelete} />
	<ContextMenuItem
		title="Delete permanently"
		command="D"
		action={() => (confirmingDelete = true)}
	/>
</ContextMenu>

<DangerModal
	isOpen={confirmingDelete}
	onConfirm={handleDelete}
	title="Are you sure you want to delete '{file.file.name}' permanently?"
	description="This action cannot be undone."
	cancelText="Cancel"
	confirmText="Delete"
/>
