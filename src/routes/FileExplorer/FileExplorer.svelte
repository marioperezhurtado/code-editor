<script lang="ts">
	import Folder from './Folder.svelte';
	import { rootFolder } from '../stores';
</script>

<aside class="h-screen p-2 overflow-y-auto border-r bg-dark-2 border-dark-3 min-w-[13rem] w-52">
	<h1 class="mb-3 text-xs">EXPLORER</h1>
	{#if $rootFolder}
		<Folder folder={$rootFolder} />
	{:else}
		<p class="text-sm">No folder opened</p>
		<button
			on:click={rootFolder.open}
			class="block w-full p-1 mt-3 text-sm rounded-sm bg-accent text-light"
		>
			Open folder
		</button>
	{/if}
</aside>
