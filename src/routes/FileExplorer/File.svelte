<script lang="ts">
	import { getFileIcon, type TFile } from '$lib/file';
	import { selectedFile } from '../stores';
	import FileActions from './FileActions.svelte';

	export let file: TFile;
	$: icon = getFileIcon(file.file.name);

	let actionsOpen = false;
</script>

<button
	on:click={() => selectedFile.open(file)}
	on:contextmenu={() => (actionsOpen = !actionsOpen)}
	class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
	class:bg-dark-3={$selectedFile?.file === file}
>
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{file.file.name}
	</span>
</button>

{#if actionsOpen}
	<FileActions {file} bind:isOpen={actionsOpen} />
{/if}
