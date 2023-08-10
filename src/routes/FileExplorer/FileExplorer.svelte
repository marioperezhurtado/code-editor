<script lang="ts">
	import Folder from './Folder.svelte';
	import { rootFolder, notifications } from '../stores';

	let isLoading = false;

	async function handleOpenFolder() {
		isLoading = true;
		try {
			await rootFolder.open();
		} catch (err) {
			notifications.add({
				title: 'The folder could not be opened',
				description: 'If the problem persists, try refreshing the page.',
				type: 'warning'
			});
		}
		isLoading = false;
	}
</script>

<aside class="h-screen p-2 overflow-y-auto border-r bg-dark-2 border-dark-3 min-w-[13rem] w-52">
	<h1 class="mb-3 text-xs">EXPLORER</h1>
	{#if $rootFolder}
		<Folder folder={$rootFolder} />
	{:else if isLoading}
		<p class="text-sm">Loading...</p>
	{:else}
		<p class="text-sm">No folder opened</p>
		<button
			on:click={handleOpenFolder}
			class="block w-full p-1 mt-3 text-sm rounded-sm bg-accent text-light"
		>
			Open folder
		</button>
	{/if}
</aside>
