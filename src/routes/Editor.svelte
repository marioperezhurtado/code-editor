<script lang="ts">
	import { selectedFile } from './stores';
</script>

<section class="p-4">
	{#if $selectedFile}
		<p class="whitespace-pre">{$selectedFile.content}</p>
	{:else}
		<p>No file selected</p>
	{/if}
</section>
