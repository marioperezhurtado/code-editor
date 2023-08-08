<script lang="ts">
	import type { TFile } from '$lib/file';
	import { rootFolder } from '../stores';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';

	export let file: TFile;
	export let isOpen: boolean;

	async function handleCut() {}
	async function handleCopy() {}
	async function handleDownload() {}
	async function handleRename() {}

	async function handleDelete() {
		if (!$rootFolder?.folder) return;

		await rootFolder.deleteFile(file);
		isOpen = false;
	}
</script>

<ContextMenu bind:isOpen>
	<ContextMenuItem title="Cut" command="X" action={handleCut} />
	<ContextMenuItem title="Copy" command="C" action={handleCopy} />

	<ContextMenuSeparator />
	<ContextMenuItem title="Download" action={handleDownload} />
	<ContextMenuSeparator />

	<ContextMenuItem title="Rename" command="R" action={handleRename} />
	<ContextMenuItem title="Delete permanently" command="D" action={handleDelete} />
</ContextMenu>
