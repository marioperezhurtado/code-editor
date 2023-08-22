<script lang="ts">
	import { clickOutside } from '$lib/actions/click_outside';
	import { getFolderIcon, createFolder } from '$lib/folder';
	import { rootFolder, notifications } from '../../stores';
    import { t } from '$lib/i18n/translations';
	import type { TFolder } from '$lib/folder';

	export let parentFolder: TFolder;
	export let isOpen: boolean;
	let foldername = '';
	$: icon = getFolderIcon(foldername);

	async function handleCreateFolder() {
		if (!foldername) {
			isOpen = false;
			return;
		}

		try {
			await createFolder(parentFolder, foldername);
			rootFolder.refresh();
		} catch (e) {
			notifications.add({
                title: $t('folders.actions.createFolder.error.title'),
                description: $t('folders.actions.createFolder.error.description'),
				type: 'error'
			});
		}
		isOpen = false;
	}
</script>

<div
	use:clickOutside
	on:outclick={handleCreateFolder}
	class="pl-2.5 ml-2 text-sm border-l border-dark-3 flex items-center w-full gap-1 py-0.5 rounded-sm pr-1.5"
>
	<img src="/icons/folder/{icon}.svg" alt={icon} class="w-4 h-4" />
	<form on:submit|preventDefault={handleCreateFolder}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			bind:value={foldername}
			class="w-full px-1 border rounded-sm outline-none border-light-2 bg-dark-3"
			autofocus
		/>
	</form>
</div>
