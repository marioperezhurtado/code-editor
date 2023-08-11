<script lang="ts">
	import { onMount } from 'svelte';
	import { notifications } from '../stores';

	export let notification: (typeof $notifications)[number];

	onMount(() => {
		setTimeout(() => {
			notifications.remove(notification);
		}, 8000);
	});
</script>

<img src="/icons/{notification.type}.svg" alt={notification.type} class="w-6 h-6" />
<div>
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
