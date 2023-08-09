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
			<DropdownItem title={theme.title} action={() => colorTheme?.set(theme.code)} />
		{/each}
	</svelte:fragment>
</DropdownMenu>
