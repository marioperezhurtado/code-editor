<script lang="ts">
	import FileExplorer from './FileExplorer/FileExplorer.svelte';
	import Editor from './Editor.svelte';
	import Tabs from './Tabs.svelte';
</script>

<main class="flex w-screen h-screen bg-dark text-light">
	<FileExplorer />
	<div class="w-full">
		<Tabs />
		<Editor />
	</div>
</main>
