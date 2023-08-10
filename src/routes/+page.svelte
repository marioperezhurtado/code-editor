<script lang="ts">
	import { rootFolder } from './stores';
	import FileExplorer from './FileExplorer/FileExplorer.svelte';
	import Tabs from './Tabs/Tabs.svelte';
	import Editor from './Editor/Editor.svelte';
	import StatusBar from './StatusBar/StatusBar.svelte';
	import Notifications from './Notifications.svelte';

	function handlePageUnload(e: BeforeUnloadEvent) {
		if ($rootFolder) {
			const confirmationMessage = 'Warning: Unsaved changes will be lost.';
			e.returnValue = confirmationMessage;
			return confirmationMessage;
		}
	}
</script>

<svelte:window on:contextmenu|preventDefault on:beforeunload|preventDefault={handlePageUnload} />

<main class="flex w-screen h-screen bg-dark text-light">
	<FileExplorer />
	<div class="flex flex-col w-full h-full">
		<Tabs />
		<Editor />
		<StatusBar />
	</div>
	<Notifications />
</main>
