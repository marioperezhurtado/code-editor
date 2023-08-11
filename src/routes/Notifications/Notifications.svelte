<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { notifications } from '../stores';
	import Notification from './Notification.svelte';
</script>

<div class="fixed flex flex-col-reverse gap-4 bottom-10 right-4">
	{#each $notifications as notification (notification)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ x: 200 }}
			class="flex items-center w-full max-w-md gap-3 p-3 transition-all rounded-sm shadow-md bg-dark-2"
		>
			<Notification {notification} />
		</div>
	{/each}
</div>
