<script lang="ts">
	import { selectedFile } from './stores';
	import { getFileIcon } from './FileExplorer/data';

	$: icon = getFileIcon($selectedFile?.file.file.name ?? '');
</script>

<ul class="flex items-center text-sm border-b bg-dark-2 border-b-dark-3">
	{#if $selectedFile}
		<li class="flex items-center gap-1 px-3 py-2 pr-2 -mb-px border-r bg-dark border-dark-3">
			<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
			<span class="overflow-hidden whitespace-nowrap text-ellipsis">
				{$selectedFile.file.file.name}
			</span>
			<button on:click={selectedFile.close} class="ml-1 transition rounded-full hover:bg-dark-3">
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
			<span class="overflow-hidden whitespace-nowrap text-ellipsis">Welcome!</span>
		</li>
	{/if}
</ul>
