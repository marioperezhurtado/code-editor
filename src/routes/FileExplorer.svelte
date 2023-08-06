<script lang="ts">
	import Folder from './Folder.svelte';
	import { openFolder, type TFolder } from './data';

	let rootFolder: TFolder | null = null;

	async function handleOpenFolder() {
		rootFolder = await openFolder();
	}
</script>

<aside class="h-screen p-2 overflow-y-auto border-r w-52 bg-neutral-800 border-neutral-600">
	<h1 class="mb-3 text-xs">EXPLORER</h1>
	{#if rootFolder}
		<Folder folder={rootFolder} />
	{:else}
		<p class="text-sm">No folder opened</p>
		<button
			on:click={handleOpenFolder}
			class="block w-full p-1 mt-3 text-sm bg-purple-500 rounded-sm text-purple-50"
		>
			Open folder
		</button>
	{/if}
</aside>
