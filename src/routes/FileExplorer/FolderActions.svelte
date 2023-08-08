<script lang="ts">
	import { rootFolder } from '../stores';
	import type { TFolder } from '$lib/folder';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';

	export let folder: TFolder;
	export let isOpen: boolean;

	async function handleDelete() {
		if (!$rootFolder?.folder) return;

		await rootFolder.deleteFolder(folder);
		isOpen = false;
	}
</script>

<ContextMenu bind:isOpen>
	<ContextMenuItem title="Move to..." command="M" action={handleDelete} />

	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" action={handleDelete} />
	<ContextMenuItem title="Delete permanently" command="D" action={handleDelete} />
</ContextMenu>
