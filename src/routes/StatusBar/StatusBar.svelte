<script>
	import { getFileLanguage } from '$lib/file';
	import { selectedFile } from '../stores';
	import FontSize from './FontSize/FontSize.svelte';
	import Locale from './Locale/Locale.svelte';
	import ColorTheme from './ColorTheme/ColorTheme.svelte';
</script>

<div class="flex items-center justify-end w-full gap-1 p-1 text-light-2">
	{#if $selectedFile}
		<span class="text-sm mr-auto ml-2">
			{getFileLanguage($selectedFile.file.file.name).name}
		</span>
	{/if}
	<FontSize />
	<Locale />
	<ColorTheme />
</div>
