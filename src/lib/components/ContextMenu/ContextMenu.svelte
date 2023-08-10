<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/click_outside';

	export let isOpen = false;
</script>

<ul
	use:clickOutside
	on:outclick={() => (isOpen = false)}
	in:fade={{ delay: 0, duration: 150 }}
	class="absolute flex flex-col w-56 p-2 text-sm rounded-sm shadow-md bg-dark-3"
>
	<slot />
</ul>
