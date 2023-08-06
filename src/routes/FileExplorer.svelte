<script lang="ts">
	import Folder from './Folder.svelte';
	import type { TFolder } from './data';

	let rootFolder: TFolder | null = null;

	async function readSubfiles(dirHandle: FileSystemDirectoryHandle) {
		let subfiles: TFolder['subfiles'] = [];

		for await (const entry of dirHandle.values()) {
			if (entry.kind === 'directory') {
				subfiles.push({
					name: entry.name,
					kind: 'folder',
					expanded: false,
					subfiles: await readSubfiles(entry)
				});
			} else {
				subfiles.push({
					name: entry.name,
					kind: 'file',
					expanded: false,
					subfiles: []
				});
			}
		}

		// sort alphabetically
		subfiles.sort((a, b) => a.name.localeCompare(b.name));

		// sort folders before files
		subfiles.sort((a, b) => {
			if (a.kind === 'folder' && b.kind === 'file') return -1;
			if (a.kind === 'file' && b.kind === 'folder') return 1;
			return 0;
		});

		return subfiles;
	}

	async function openFolder() {
		const dirHandle = await window.showDirectoryPicker();

		rootFolder = {
			name: dirHandle.name,
			kind: 'folder',
			expanded: true,
			subfiles: await readSubfiles(dirHandle)
		};
	}
</script>

<aside class="w-56 h-screen p-2 border-r bg-neutral-800 border-neutral-600">
	<h1 class="mb-2 text-xs">EXPLORER</h1>
	{#if rootFolder}
		<Folder folder={rootFolder} />
	{:else}
		<p class="text-sm">No folder opened</p>
		<button
			on:click={openFolder}
			class="w-full p-1 mt-5 text-sm bg-purple-500 rounded-sm text-purple-50">Open folder</button
		>
	{/if}
</aside>
