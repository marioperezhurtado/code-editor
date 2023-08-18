<script lang="ts">
	import { getFileIcon, writeToFile } from '$lib/file';
	import { openFiles, selectedFile, notifications, type OpenFile } from '../stores';
	import Modal from '$lib/components/Modal.svelte';
	import TabActions from './TabActions.svelte';

	export let openFile: OpenFile;

	$: icon = getFileIcon(openFile.file.file.name ?? '');
	$: edited = openFile.content !== openFile.editedContent;

	let showSaveModal = false;
	let actionsOpen = false;

	function handleSelect() {
		openFiles.select(openFile.file);
	}

	function handleClose() {
		if (edited) {
			showSaveModal = true;
			return;
		}
		openFiles.close(openFile.file);
	}

	function handleReset() {
		showSaveModal = false;
		openFiles.reset();
		openFiles.close(openFile.file);
	}

	async function handleSave() {
		if (!openFile.editedContent) return;

		try {
			showSaveModal = false;
			await writeToFile(openFile.file, openFile.editedContent);
			openFiles.save();
			openFiles.close(openFile.file);
		} catch (e) {
			notifications.add({
				title: `Could not save changes to '${openFile.file.file.name}'"`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
	}
</script>

<li>
	<button
		on:click={handleSelect}
		on:contextmenu={() => (actionsOpen = !actionsOpen)}
		class="flex items-center gap-1 px-3 py-2 pr-2 border-r border-y border-y-transparent bg-dark border-dark-3"
		class:border-b-accent={$selectedFile?.file === openFile.file}
	>
		<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
		{#if edited}
			<span>⚫</span>
		{/if}
		<span class="overflow-hidden whitespace-nowrap text-ellipsis">
			{openFile.file.file.name}
		</span>
		<button
			on:click|stopPropagation={handleClose}
			class="ml-1 transition rounded-full hover:bg-dark-3"
		>
			<img src="/icons/close.svg" alt="close" class="w-4 h-4" />
		</button>
	</button>
</li>

{#if showSaveModal}
	<Modal
		title="Save changes to file '{openFile.file.file.name}'?"
		description="Your changes will be lost if you don't save them"
		cancelText="Don't save"
		confirmText="Save changes"
		on:cancel={handleReset}
		on:confirm={handleSave}
	/>
{/if}

<TabActions file={openFile.file} bind:isOpen={actionsOpen} />
