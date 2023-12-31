<script lang="ts">
	import { getFileIcon, writeToFile } from '$lib/file';
	import { openFiles, selectedFile, notifications, type OpenFile } from '../stores';
	import { shortcut } from '$lib/actions/shortcut';
	import { t } from '$lib/i18n/translations';
	import Modal from '$lib/components/Modal.svelte';
	import Tab from './Tab.svelte';
	import FilePath from './FilePath.svelte';
	import TabDropzone from './TabDropzone.svelte';
	import LogoIcon from './LogoIcon.svelte';

	$: icon = getFileIcon($selectedFile?.file.file.name ?? '');

	let filesToConfirm: OpenFile[] = [];

	function handleClose(file: OpenFile) {
		if (file?.editedContent === file?.content) {
			openFiles.close(file.file);
			return;
		}
		filesToConfirm = [...filesToConfirm, file];
	}

	function handleCloseOthers(file: OpenFile) {
		const otherFiles = $openFiles.files.filter((f) => f !== file);

		for (const file of otherFiles.slice().reverse()) {
			if (file.editedContent === file.content) {
				openFiles.close(file.file);
			} else {
				filesToConfirm = [...filesToConfirm, file];
			}
		}
	}

	function handleCloseAll() {
		for (const file of $openFiles.files.slice().reverse()) {
			if (file.editedContent === file.content) {
				openFiles.close(file.file);
			} else {
				filesToConfirm = [...filesToConfirm, file];
			}
		}
	}

	function handleReset(file: OpenFile) {
		openFiles.reset();
		openFiles.close(file.file);
		filesToConfirm = filesToConfirm.filter((f) => f !== file);
	}

	async function handleSave(file: OpenFile) {
		filesToConfirm = filesToConfirm.filter((f) => f !== file);
		if (file.editedContent === file.content) return;

		try {
			await writeToFile(file.file, file.editedContent);
			openFiles.save();
		} catch (e) {
			notifications.add({
				title: `${$t('tabs.saveChanges.error.title')} '${file.file.file.name}'"`,
				description: $t('tabs.saveChanges.error.description'),
				type: 'error'
			});
		}
	}
</script>

<span
	use:shortcut={{ control: true, key: 's' }}
	on:shortcut={() => $selectedFile && handleSave($selectedFile)}
/>
<span
	use:shortcut={{ control: true, key: 'e' }}
	on:shortcut={() => $selectedFile && handleClose($selectedFile)}
/>
<span use:shortcut={{ control: true, key: 'q' }} on:shortcut={handleCloseAll} />

{#if filesToConfirm.length > 0}
	<Modal
		title={`${$t('tabs.saveChanges.confirm.title')} '${filesToConfirm[0].file.file.name}'?`}
		description={$t('tabs.saveChanges.confirm.description')}
		cancelText={$t('tabs.saveChanges.confirm.cancel')}
		confirmText={$t('tabs.saveChanges.confirm.confirm')}
		on:cancel={() => handleReset(filesToConfirm[0])}
		on:confirm={() => {
			openFiles.close(filesToConfirm[0].file);
			handleSave(filesToConfirm[0]);
		}}
	/>
{/if}

<ul class="flex items-center text-sm border-b bg-dark-2 border-b-dark-3">
	{#if $selectedFile}
		{#each $openFiles.files as openFile}
			<Tab
				{openFile}
				onClose={() => handleClose(openFile)}
				onCloseAll={handleCloseAll}
				onCloseOthers={() => handleCloseOthers(openFile)}
			/>
		{/each}
	{:else}
		<li class="flex items-center gap-1 px-3 py-2 -mb-px border-r bg-dark border-dark-3">
			<LogoIcon />
			<span>Code Editor</span>
		</li>
	{/if}

	<TabDropzone />
</ul>
{#if $selectedFile}
	<FilePath {icon} />
{/if}
