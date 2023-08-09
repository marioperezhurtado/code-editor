<script>
	import NotificationsIcon from './NotificationsIcon.svelte';
	import Language from './Language/Language.svelte';
	import ColorTheme from './ColorTheme/ColorTheme.svelte';
</script>

<div class="flex items-center justify-end w-full gap-1 p-1 text-light-2">
	<Language />
	<ColorTheme />
	<button class="p-1 transition rounded-sm hover:bg-dark-2 hover:shadow-md">
		<NotificationsIcon />
	</button>
</div>
