<script lang="ts">
	import { clickOutside } from '$lib/click_outside';
	import { getFileIcon, createFile } from '$lib/file';
	import type { TFolder } from '$lib/folder';
	import { rootFolder, notifications } from '../../stores';

	export let parentFolder: TFolder;
	export let isOpen: boolean;
	let filename = '';
	$: icon = getFileIcon(filename);

	async function handleCreateFile() {
		if (!filename) {
			isOpen = false;
			return;
		}

		try {
			await createFile(parentFolder, filename);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
				title: `The file could not be created`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

<div
	use:clickOutside
	on:outclick={handleCreateFile}
	class="pl-2.5 ml-2 text-sm border-l border-dark-3 flex items-center w-full gap-1 py-0.5 rounded-sm pr-1.5"
>
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<form on:submit|preventDefault={handleCreateFile}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			bind:value={filename}
			class="w-full px-1 border rounded-sm outline-none border-light-2 bg-dark-3"
			autofocus
		/>
	</form>
</div>
