<script lang="ts">
	import { rootFolder, notifications } from '../stores';
	import { shortcut } from '$lib/actions/shortcut';
	import { isBrowserSupported } from '$lib/file';
	import { t } from '$lib/i18n/translations';
	import Folder from './Folder/Folder.svelte';

	let isLoading = false;

	async function handleOpenFolder() {
		if (!isBrowserSupported()) {
			notifications.add({
				title: $t('explorer.openFolder.notSupported.title'),
				description: $t('explorer.openFolder.notSupported.description'),
				type: 'error'
			});
			return;
		}

		try {
			const dirHandle = await window.showDirectoryPicker();
			isLoading = true;
			await rootFolder.open(dirHandle);
		} catch (err) {
			notifications.add({
                title: $t('explorer.openFolder.error.title'),
                description: $t('explorer.openFolder.error.description'),
				type: 'warning'
			});
		}
		isLoading = false;
	}
</script>

<aside
	use:shortcut={{ control: true, key: 'o' }}
	on:shortcut={handleOpenFolder}
	class="h-screen p-2 overflow-y-auto border-r bg-dark-2 border-dark-3 min-w-[13rem] w-52"
>
	<h1 class="mb-3 text-xs uppercase">{$t('explorer.title')}</h1>
	{#if $rootFolder}
		<Folder folder={$rootFolder} />
	{:else if isLoading}
		<p class="text-sm">{$t('explorer.openFolder.loading')}</p>
	{:else}
		<p class="text-sm">{$t('explorer.noFolder')}</p>
		<button
			on:click={handleOpenFolder}
			class="block w-full p-1 mt-3 text-sm rounded-sm bg-accent text-light"
		>
			{$t('explorer.openFolder.title')}
		</button>
	{/if}
</aside>
