<script lang="ts">
	import WelcomeScreen from './WelcomeScreen.svelte';
	import { selectedFile } from '../stores';
	import { getFileExtension, getFileUrl } from '$lib/file';

	$: fileName = $selectedFile?.file.file.name;
	$: fileExtension = getFileExtension(fileName ?? '');

	const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
	const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

	$: isImage = IMAGE_EXTENSIONS.includes(fileExtension ?? '');
	$: isVideo = VIDEO_EXTENSIONS.includes(fileExtension ?? '');
</script>

<section class="flex-1 p-4 overflow-y-auto">
	{#if $selectedFile}
		{#if isImage}
			{#await getFileUrl($selectedFile.file.file) then imageUrl}
				<div class="flex items-center justify-center w-full h-full">
					<img src={imageUrl} alt={$selectedFile.file.file.name} class="max-w-full max-h-full" />
				</div>
			{/await}
		{:else if isVideo}
			{#await getFileUrl($selectedFile.file.file) then videoUrl}
				<div class="flex items-center justify-center w-full h-full">
					<video src={videoUrl} controls class="max-w-full max-h-full">
						<track kind="captions" />
					</video>
				</div>
			{/await}
		{:else}
			<div class="flex gap-6 text-sm">
				<p class="text-right text-dark-3">
					{#each Array.from({ length: $selectedFile.content.split('\n').length }, (_, i) => i + 1) as line}
						{line}
						<br />
					{/each}
				</p>
				<p
					class="font-mono whitespace-pre-wrap outline-none"
					bind:innerText={$selectedFile.content}
					contenteditable
				/>
			</div>
		{/if}
	{:else}
		<WelcomeScreen />
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
