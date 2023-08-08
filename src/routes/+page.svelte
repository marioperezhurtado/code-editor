<script lang="ts">
	import FileExplorer from './FileExplorer/FileExplorer.svelte';
	import Editor from './Editor/Editor.svelte';
	import Tabs from './Tabs/Tabs.svelte';
</script>

<svelte:window on:contextmenu|preventDefault />

<main class="flex w-screen h-screen bg-dark text-light">
	<FileExplorer />
	<div class="flex flex-col w-full h-full">
		<Tabs />
		<Editor />
	</div>
</main>
