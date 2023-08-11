<script lang="ts">
	import { LANGUAGES, language } from '../../stores';
	import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
	import DropdownItem from '$lib/components/DropdownMenu/DropdownItem.svelte';
	import LanguageIcon from './LanguageIcon.svelte';
</script>

<DropdownMenu title="Language">
	<LanguageIcon slot="trigger" />
	<svelte:fragment slot="content">
		{#each LANGUAGES as lang}
			<DropdownItem on:click={() => language.set(lang.code)}>
				{lang.title}
				{#if $language === lang.code}
					<div class="w-1 h-1 rounded-full bg-accent" />
				{/if}
			</DropdownItem>
		{/each}
	</svelte:fragment>
</DropdownMenu>
