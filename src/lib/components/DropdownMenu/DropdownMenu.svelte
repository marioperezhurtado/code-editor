<script lang="ts">
	import { clickOutside } from '$lib/click_outside';

	let isOpen = false;
</script>

<button
	use:clickOutside
	on:outclick|self={() => (isOpen = false)}
	on:click={() => (isOpen = !isOpen)}
	class="relative p-1 transition rounded-sm hover:bg-dark-2 hover:shadow-md"
	class:bg-dark-2={isOpen}
	class:shadow-md={isOpen}
>
	<slot name="trigger" />
	{#if isOpen}
		<div
			class="absolute right-0 flex flex-col gap-px overflow-hidden text-xs rounded-sm shadow-md bottom-9 bg-dark-3 text-light whitespace-nowrap"
		>
			<slot name="content" />
		</div>
	{/if}
</button>
