<script lang="ts">
	import { rootFolder, openFiles, } from '../stores';
	import { getFileExtension, getFileUrl } from '$lib/file';
	import WelcomeScreen from './WelcomeScreen.svelte';
	import EmptyScreen from './EmptyScreen.svelte';
	import Code from './Code.svelte';

    $: selectedFile = $openFiles.selectedFile;
	$: fileName = selectedFile?.file.file.name;
	$: fileExtension = getFileExtension(fileName ?? '');
	$: lineCount = selectedFile?.content?.split('\n').length ?? 0;

	const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
	const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

	$: isImage = IMAGE_EXTENSIONS.includes(fileExtension ?? '');
	$: isVideo = VIDEO_EXTENSIONS.includes(fileExtension ?? '');
</script>

<section class="flex-1 p-4 overflow-y-auto">
	{#if !$rootFolder}
		<WelcomeScreen />
	{:else if !selectedFile}
		<EmptyScreen />
	{:else if isImage}
		{#await getFileUrl(selectedFile.file) then imageUrl}
			<div class="flex items-center justify-center w-full h-full">
				<img src={imageUrl} alt={selectedFile.file.file.name} class="max-w-full max-h-full" />
			</div>
		{/await}
	{:else if isVideo}
		{#await getFileUrl(selectedFile.file) then videoUrl}
			<div class="flex items-center justify-center w-full h-full">
				<video src={videoUrl} controls class="max-w-full max-h-full">
					<track kind="captions" />
				</video>
			</div>
		{/await}
	{:else}
		<div class="flex h-full gap-6 text-sm">
			<p class="text-right text-dark-3">
				{#each Array.from({ length: lineCount }, (_, i) => i + 1) as line}
					{line}
					<br />
				{/each}
			</p>
			<Code />
		</div>
	{/if}
</section>

<style>
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: rgb(var(--dark-2));
		border-radius: 2px;
	}
</style>
