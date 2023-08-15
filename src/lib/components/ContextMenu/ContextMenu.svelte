<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/click_outside';
</script>

<ul
	use:clickOutside
	on:outclick
	in:fade={{ delay: 0, duration: 150 }}
	class="absolute z-10 flex flex-col w-56 p-2 text-sm rounded-sm shadow-md bg-dark-3"
>
	<slot />
</ul>
