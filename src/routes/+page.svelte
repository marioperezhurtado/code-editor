<script lang="ts">
	import { rootFolder, selectedFile } from './stores';
    import { t } from '$lib/i18n/translations';
	import FileExplorer from './FileExplorer/FileExplorer.svelte';
	import Tabs from './Tabs/Tabs.svelte';
	import Editor from './Editor/Editor.svelte';
	import StatusBar from './StatusBar/StatusBar.svelte';
	import Notifications from './Notifications/Notifications.svelte';

	function handlePageUnload(e: BeforeUnloadEvent) {
		if ($rootFolder) {
			const confirmationMessage = $t('unload')
			e.returnValue = confirmationMessage;
			return confirmationMessage;
		}
	}

	let title: string;

	$: if ($selectedFile) {
		const edited = $selectedFile.content !== $selectedFile.editedContent;
		title = `${edited ? '● ' : ''}${$selectedFile.file.file.name} - Code Editor`;
	} else {
		title = 'Code Editor';
	}
</script>

<svelte:window on:contextmenu|preventDefault on:beforeunload|preventDefault={handlePageUnload} />

<svelte:head>
	<title>{title}</title>
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
