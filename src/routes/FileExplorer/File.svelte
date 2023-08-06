<script lang="ts">
	import { getFileIcon, type TFile } from './data';
	import { selectedFile } from '../stores';

	export let file: TFile;
	$: icon = getFileIcon(file.file.name);
</script>

<button
	on:click={() => selectedFile.open(file)}
	class="flex items-center w-full gap-1 px-1 py-0.5 rounded-sm"
	class:bg-neutral-700={$selectedFile?.file === file}
>
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{file.file.name}
	</span>
</button>
