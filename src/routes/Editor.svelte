<script lang="ts">
	import { selectedFile } from './stores';

	$: fileName = $selectedFile?.file.file.name;
	$: fileExtension = fileName?.slice(fileName.lastIndexOf('.') + 1);

	const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
	const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

	$: isImage = IMAGE_EXTENSIONS.includes(fileExtension ?? '');
	$: isVideo = VIDEO_EXTENSIONS.includes(fileExtension ?? '');

	const getFileUrl = async (file: FileSystemFileHandle) => {
		const fileResult = await file.getFile();
		return fileResult && URL.createObjectURL(fileResult);
	};
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
			<p class="whitespace-pre-wrap">{$selectedFile.content}</p>
		{/if}
	{:else}
		<p>No file selected</p>
	{/if}
</section>
