<script lang="ts">
	import { openFiles } from '../stores';
	import type { TFile } from '$lib/file';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';

	export let file: TFile;
	export let isOpen: boolean;

	function handleClose() {
		openFiles.close(file);
	}
</script>

{#if isOpen}
	<ContextMenu on:outclick={() => (isOpen = false)}>
		<ContextMenuItem title="Close" command="Ctrl + W" on:click={handleClose} />
		<ContextMenuItem title="Close all" command="Ctrl + K W" />
	</ContextMenu>
{/if}
