<script lang="ts">
	import { getFileIcon, writeToFile } from '$lib/file';
	import { selectedFile, notifications } from '../stores';
	import Modal from '$lib/components/Modal.svelte';
	import FilePath from './FilePath.svelte';
	import GitHubIcon from './GitHubIcon.svelte';

	$: icon = getFileIcon($selectedFile?.file.file.name ?? '');
	$: edited = $selectedFile?.content !== $selectedFile?.editedContent;

	let showSaveModal = false;

	function handleCloseTab() {
		edited ? (showSaveModal = true) : selectedFile.close();
	}

	function handleResetChanges() {
		showSaveModal = false;
		selectedFile.reset();
		selectedFile.close();
	}

	async function handleSaveChanges() {
		if (!$selectedFile?.editedContent) return;

		try {
			showSaveModal = false;
			await writeToFile($selectedFile.file, $selectedFile.editedContent);
			selectedFile.save();
			selectedFile.close();
		} catch (e) {
			notifications.add({
				title: `Could not save changes to '${$selectedFile.file.file.name}'"`,
				description: 'Try again, or refresh the page.',
				type: 'error'
			});
		}
	}
</script>

<ul class="flex items-center text-sm border-b bg-dark-2 border-b-dark-3">
	{#if $selectedFile}
		<li class="flex items-center gap-1 px-3 py-2 pr-2 -mb-px border-r bg-dark border-dark-3">
			<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
			{#if edited}
				<span>⚫</span>
			{/if}
			<span class="overflow-hidden whitespace-nowrap text-ellipsis">
				{$selectedFile.file.file.name}
			</span>
			<button on:click={handleCloseTab} class="ml-1 transition rounded-full hover:bg-dark-3">
				<img src="/icons/close.svg" alt="close" class="w-4 h-4" />
			</button>
		</li>
	{:else}
		<li class="flex items-center gap-1 px-3 py-2 -mb-px border-r bg-dark border-dark-3">
			<span class="text-accent">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					width="16"
					height="16"
					xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<path
							d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
			</span>
			<span>Welcome!</span>
		</li>
	{/if}
	<li class="ml-auto">
		<GitHubIcon />
	</li>
</ul>
{#if $selectedFile}
	<FilePath {icon} />
{/if}

{#if showSaveModal}
	<Modal
		title="Save changes to file '{$selectedFile?.file.file.name}'?"
		description="Your changes will be lost if you don't save them"
		cancelText="Don't save"
		confirmText="Save changes"
		on:cancel={handleResetChanges}
		on:confirm={handleSaveChanges}
	/>
{/if}
