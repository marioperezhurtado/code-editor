<script lang="ts">
	import { clickOutside } from '$lib/actions/click_outside';
	import { getFileIcon, renameFile, type TFile } from '$lib/file';
	import { rootFolder, notifications } from '../../stores';
    import { t } from '$lib/i18n/translations';

	export let file: TFile;
	export let isOpen: boolean;

	let newFilename = file.file.name;
	$: icon = getFileIcon(newFilename);

	async function handleRenameFile() {
		if (!newFilename || newFilename === file.file.name) {
			isOpen = false;
			return;
		}

		try {
			await renameFile(file, newFilename);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
                title: `${$t('files.rename.error.title')} '${file.file.name}'`,
                description: $t('files.rename.error.description'),
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

<div
	on:outclick={handleRenameFile}
	use:clickOutside
	class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
>
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<form on:submit|preventDefault={handleRenameFile}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			bind:value={newFilename}
			class="w-full px-1 border rounded-sm outline-none border-light-2 bg-dark-3"
			autofocus
		/>
	</form>
</div>
