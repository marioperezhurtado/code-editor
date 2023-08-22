<script lang="ts">
	import { resolvePathToFile } from '$lib/file';
	import { rootFolder, type OpenFile } from '../stores';
    import { t } from '$lib/i18n/translations';
	import ContextMenu from '$lib/components/ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '$lib/components/ContextMenu/ContextMenuItem.svelte';
	import ContextMenuSeparator from '$lib/components/ContextMenu/ContextMenuSeparator.svelte';

	export let isOpen: boolean;
	export let openFile: OpenFile;
	export let onClose: () => void;
	export let onCloseAll: () => void;

	let paths: string[] = [];

	$: if ($rootFolder?.folder) {
		resolvePathToFile($rootFolder, openFile.file).then((p) => (paths = p));
	}

	async function handleCopyPath() {
		const absolutePath = `~/${$rootFolder?.folder.name}/${paths.join('/')}`;

		navigator.clipboard.writeText(absolutePath);
		isOpen = false;
	}
	async function handleCopyRelativePath() {
		const relativePath = paths.slice(-2).join('/');

		navigator.clipboard.writeText(relativePath);
		isOpen = false;
	}
</script>

{#if isOpen}
	<ContextMenu on:outclick={() => (isOpen = false)}>
		<ContextMenuItem
            title={$t('tabs.actions.close')}
			command="Ctrl + e"
			on:click={() => {
				onClose();
				isOpen = false;
			}}
		/>
		<ContextMenuItem
            title={$t('tabs.actions.closeAll')}
			command="Ctrl + q"
			on:click={() => {
				onCloseAll();
				isOpen = false;
			}}
		/>

		<ContextMenuSeparator />

		<ContextMenuItem title={$t('tabs.actions.copyPath')} on:click={handleCopyPath} />
		<ContextMenuItem title={$t('tabs.actions.copyRelativePath')} on:click={handleCopyRelativePath} />
	</ContextMenu>
{/if}
