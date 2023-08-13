<script lang="ts">
	import { selectedFile, rootFolder } from '../stores';
	import { resolvePathToFile } from '$lib/file';

	export let icon: string;

	let filePath: Array<string> = [];

	$: {
		if ($selectedFile && $rootFolder) {
			resolvePathToFile($rootFolder, $selectedFile.file).then((path) => {
				filePath = [$rootFolder?.folder.name ?? 'root', ...path];
			});
		}
	}
</script>

{#if filePath.length > 0}
	<div class="flex items-center gap-0.5 px-3 py-1 text-xs text-[#a3a3a3]">
		{#each filePath as path, i}
			{#if i < filePath.length - 1}
				<span>{path}</span>
				<img src="/icons/right-angle.svg" alt="right-angle" class="w-4 h-4" />
			{:else}
				<img src="/icons/file/{icon}.svg" alt={icon} class="w-3.5 h-3.5" />
				<span>{path}</span>
			{/if}
		{/each}
	</div>
{/if}
