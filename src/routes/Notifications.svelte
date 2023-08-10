<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { notifications } from './stores';

	const DISPLAY_TIME = 8000;

	onMount(() => {
		const interval = setInterval(() => {
			if ($notifications.length > 0) {
				notifications.remove($notifications[0]);
			}
		}, DISPLAY_TIME);
		return () => clearInterval(interval);
	});
</script>

<div class="fixed flex flex-col-reverse gap-4 bottom-10 right-4">
	{#each $notifications as notification (notification)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ x: 200 }}
			class="p-3 transition-all rounded-sm shadow-md w-72 bg-dark-2"
		>
			<div class="flex items-start justify-between gap-4 mb-2">
				<h1 class="text-sm text-light">{notification.title}</h1>
				<button
					on:click={() => notifications.remove(notification)}
					class="transition rounded-full hover:bg-dark-3 min-w-fit"
				>
					<img src="/icons/close.svg" alt="close" class="w-4 h-4" />
				</button>
			</div>
			<p class="text-xs text-light-2">{notification.description}</p>
		</div>
	{/each}
</div>
