<script lang="ts">
	export let name: string;
	$: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<span class="flex items-center gap-1">
	<img src="/icons/file/{type}.svg" alt={type} class="w-4 h-4" />
	{name}</span
>
