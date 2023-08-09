<script lang="ts">
	import { LANGUAGES, language } from '../../stores';
	import DropdownMenu from '$lib/components/DropdownMenu/DropdownMenu.svelte';
	import DropdownItem from '$lib/components/DropdownMenu/DropdownItem.svelte';
	import LanguageIcon from './LanguageIcon.svelte';
</script>

<DropdownMenu>
	<LanguageIcon slot="trigger" />
	<svelte:fragment slot="content">
		{#each LANGUAGES as lang}
			<DropdownItem title={lang.title} action={() => language.set(lang.code)} />
		{/each}
	</svelte:fragment>
</DropdownMenu>
