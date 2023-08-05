<script lang="ts">
	import Folder from './Folder.svelte';
	import { files } from './data';
</script>

<aside class="h-screen w-56 bg-neutral-800 p-2">
	<h1 class="text-xs mb-2">EXPLORER</h1>
	<Folder name="src" {files} expanded />
</aside>
