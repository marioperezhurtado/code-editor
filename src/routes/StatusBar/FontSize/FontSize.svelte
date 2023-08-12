<script lang="ts">
	import { FONT_SIZES, fontSize } from '../user_config';
	import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
	import DropdownItem from '$lib/components/DropdownMenu/DropdownItem.svelte';
	import FontSizeIcon from './FontSizeIcon.svelte';

	$: if (typeof document !== 'undefined') {
		document.documentElement.style.fontSize = $fontSize;
	}
</script>

<DropdownMenu title="Font Size">
	<FontSizeIcon slot="trigger" />
	<svelte:fragment slot="content">
		{#each FONT_SIZES as size}
			<DropdownItem on:click={() => fontSize.set(size.code)}>
				{size.title}
				{#if $fontSize === size.code}
					<div class="w-1 h-1 rounded-full bg-accent" />
				{/if}
			</DropdownItem>
		{/each}
	</svelte:fragment>
</DropdownMenu>
