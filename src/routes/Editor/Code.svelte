<script lang="ts">
	import { openFiles, selectedFile } from '../stores';
	import { getFileExtension } from '$lib/file';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	$: fileExtension = getFileExtension($selectedFile?.file.file.name ?? '');
	let highlighted = '';

	$: if ($selectedFile?.editedContent) {
		highlighted = hljs.highlight($selectedFile?.editedContent ?? '', {
			language: fileExtension
		}).value;
	}
</script>

<div class="relative w-full">
	{#if $openFiles.selectedFile !== null}
		<p
			class="block w-full min-h-full font-mono text-transparent whitespace-pre-wrap outline-none caret-white text-dark"
			bind:innerText={$openFiles.selectedFile.editedContent}
			contenteditable
		/>
	{/if}
	<p
		class="absolute top-0 left-0 block w-full min-h-full font-mono whitespace-pre-wrap pointer-events-none"
	>
		<!--eslint-disable-next-line svelte/no-at-html-tags-->
		{@html highlighted}
	</p>
</div>
