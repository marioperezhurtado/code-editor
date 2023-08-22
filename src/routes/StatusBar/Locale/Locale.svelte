<script lang="ts">
	import { LOCALES, locale } from '../user_config';
    import { locale as tlocale } from '$lib/i18n/translations';
	import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
	import DropdownItem from '$lib/components/DropdownMenu/DropdownItem.svelte';
	import LocaleIcon from './LocaleIcon.svelte';

    $: $tlocale = $locale
</script>

<DropdownMenu title="Language">
	<LocaleIcon slot="trigger" />
	<svelte:fragment slot="content">
		{#each LOCALES as l}
			<DropdownItem on:click={() => $locale = l.code}>
				{l.title}
				{#if $locale === l.code}
					<div class="w-1 h-1 rounded-full bg-accent" />
				{/if}
			</DropdownItem>
		{/each}
	</svelte:fragment>
</DropdownMenu>
