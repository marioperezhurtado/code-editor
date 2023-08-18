<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/click_outside';

	let menu: HTMLUListElement;
	let pos = { x: 0, y: 0 };
	let browser = { width: 0, height: 0 };

	function handleOpen({ clientX, clientY }: MouseEvent) {
		pos = { x: clientX, y: clientY };
		browser = { width: window.innerWidth, height: window.innerHeight };
		const { width, height } = menu.getBoundingClientRect();

		if (browser.height - pos.y < height) {
			pos.y -= height;
		}
		if (browser.width - pos.x < width) {
			pos.x -= width;
		}
	}
</script>

<svelte:window on:contextmenu|once={handleOpen} />

<ul
	bind:this={menu}
	use:clickOutside
	on:outclick
	in:fade={{ delay: 0, duration: 150 }}
	class="fixed z-10 flex flex-col w-56 p-2 text-sm rounded-sm shadow-md bg-dark-3"
	style="position: absolute; top:{pos.y}px; left:{pos.x}px"
>
	<slot />
</ul>
