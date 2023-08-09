<script lang="ts">
	export let title: string;
	export let action: () => void;
</script>

<button
	on:click|stopPropagation={action}
	class="px-3 py-1.5 w-full text-left whitespace-nowrap hover:bg-dark-3 transition bg-dark-2"
>
	{title}
</button>
