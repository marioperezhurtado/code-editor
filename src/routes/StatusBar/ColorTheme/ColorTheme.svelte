<script lang="ts">
	import { COLOR_THEMES, colorTheme } from '../../stores';
	import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
	import DropdownItem from '$lib/components/DropdownMenu/DropdownItem.svelte';
	import ColorThemeIcon from './ColorThemeIcon.svelte';

	$: if (typeof document !== 'undefined') {
		document.documentElement.className = $colorTheme ?? '';
	}
</script>

<DropdownMenu>
	<ColorThemeIcon slot="trigger" />
	<svelte:fragment slot="content">
		{#each COLOR_THEMES as theme}
			<DropdownItem action={() => colorTheme?.set(theme.code)}>
				{theme.title}
				{#if $colorTheme === theme.code}
					<div class="w-1 h-1 rounded-full bg-accent" />
				{/if}
			</DropdownItem>
		{/each}
	</svelte:fragment>
</DropdownMenu>
