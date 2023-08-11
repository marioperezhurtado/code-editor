<script lang="ts">
	export let title: string;
	export let command: string | null = null;
</script>

<li>
	<button on:click class="flex justify-between w-full px-2 py-1 rounded-sm hover:bg-dark-2">
		{title}
		{#if command}
			<span class="text-sm text-light-2">({command})</span>
		{/if}
	</button>
</li>
