<script lang="ts">
	import { selectedFile } from './stores';
	import { getFileExtension, getFileUrl } from '$lib/files';

	$: fileName = $selectedFile?.file.file.name;
	$: fileExtension = getFileExtension(fileName ?? '');

	const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
	const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

	$: isImage = IMAGE_EXTENSIONS.includes(fileExtension ?? '');
	$: isVideo = VIDEO_EXTENSIONS.includes(fileExtension ?? '');
</script>

<section class="w-full p-4 overflow-y-auto">
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
			<div
				class="h-full whitespace-pre-wrap outline-none"
				bind:innerText={$selectedFile.content}
				contenteditable
			/>
		{/if}
	{:else}
		<div class="mx-auto mt-32 w-fit">
			<h2 class="mb-5 text-xl font-bold text-white">
				Welcome to <span class="text-accent">Code Editor</span>
			</h2>
			<ul class="flex flex-col gap-2">
				<li>
					<button>
						Open folder
						<span class="text-sm text-light-2">(Ctrl + O)</span>
					</button>
				</li>
				<li>
					<button>
						Create file
						<span class="text-sm text-light-2">(Ctrl + N)</span>
					</button>
				</li>
				<li>
					<button>
						Search file
						<span class="text-sm text-light-2">(Ctrl + F)</span>
					</button>
				</li>
			</ul>
		</div>
	{/if}
</section>
