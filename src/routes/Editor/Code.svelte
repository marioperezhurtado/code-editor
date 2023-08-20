<script lang="ts">
	import { openFiles, selectedFile } from '../stores';
	import { getFileExtension } from '$lib/file';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	$: fileExtension = getFileExtension($selectedFile?.file.file.name ?? '');
	let highlighted = '';
	let textarea: HTMLTextAreaElement;

	$: {
		highlighted = hljs.highlight($selectedFile?.editedContent ?? '', {
			language: fileExtension
		}).value;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!$selectedFile || !$openFiles.selectedFile) return;

		if (e.key === 'Tab') {
			e.preventDefault();

			// Get position of cursor
			const { selectionStart: start, selectionEnd: end } = textarea;
			const startText = $selectedFile.editedContent.slice(0, start);
			const endText = $selectedFile.editedContent.slice(end);
			const newTextValue = `${startText}\t${endText}`;

			// Insert tab and move cursor
			textarea.value = newTextValue;
			$openFiles.selectedFile.editedContent = newTextValue;
			textarea.selectionStart = textarea.selectionEnd = start + 1;
		}
	}
</script>

<div class="relative min-h-full flex-1">
	{#if $openFiles.selectedFile !== null}
		<textarea
			bind:this={textarea}
			bind:value={$openFiles.selectedFile.editedContent}
			on:keydown={handleKeyDown}
			contenteditable
			class="h-full w-full bg-transparent absolute top-0
            text-transparent caret-light outline-none overflow-clip 
            whitespace-pre-wrap break-all resize-none font-mono"
		/>
	{/if}
	<p class="font-mono whitespace-pre-wrap break-all">
			{@html highlighted}
	</p>
</div>
