<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { notifications } from './stores';
</script>

<div class="fixed flex flex-col-reverse gap-4 bottom-10 right-4">
	{#each $notifications as notification (notification)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ x: 200 }}
			class="flex items-center w-full max-w-md gap-3 p-3 transition-all rounded-sm shadow-md bg-dark-2"
		>
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
		</div>
	{/each}
</div>
