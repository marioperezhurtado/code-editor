<script lang="ts">
	import { clickOutside } from '$lib/click_outside';

	export let isOpen = false;
</script>

<ul
	use:clickOutside
	on:outclick={() => (isOpen = false)}
	class="absolute flex flex-col w-56 p-2 text-sm rounded-sm shadow-md bg-dark-3"
>
	<slot />
</ul>
