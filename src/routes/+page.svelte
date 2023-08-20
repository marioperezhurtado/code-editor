<script lang="ts">
	import { rootFolder, selectedFile } from './stores';
	import FileExplorer from './FileExplorer/FileExplorer.svelte';
	import Tabs from './Tabs/Tabs.svelte';
	import Editor from './Editor/Editor.svelte';
	import StatusBar from './StatusBar/StatusBar.svelte';
	import Notifications from './Notifications/Notifications.svelte';

	function handlePageUnload(e: BeforeUnloadEvent) {
		if ($rootFolder) {
			const confirmationMessage = 'Warning: Unsaved changes will be lost.';
			e.returnValue = confirmationMessage;
			return confirmationMessage;
		}
	}

	let title = 'Code Editor';

	$: if ($selectedFile) {
		title = `${$selectedFile.file.file.name} - Code Editor`;
	}
</script>

<svelte:window on:contextmenu|preventDefault on:beforeunload|preventDefault={handlePageUnload} />

<svelte:head>
	<title>{title}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
	/>
	<style>
		body {
			font-family: 'Roboto', sans-serif;
			margin: 0;
			padding: 0;
		}
	</style>
</svelte:head>

<main class="flex w-screen h-screen bg-dark text-light">
	<FileExplorer />
	<div class="flex flex-col w-full h-full">
		<Tabs />
		<Editor />
		<StatusBar />
	</div>
</main>

<Notifications />
