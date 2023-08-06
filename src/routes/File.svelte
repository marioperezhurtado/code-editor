<script lang="ts">
	import { getFileIcon } from './data';

	export let name: string;
	$: icon = getFileIcon(name);
</script>

<button class="flex items-center gap-1">
	<img src="/icons/file/{icon}.svg" alt={icon} class="w-4 h-4" />
	<span class="overflow-hidden whitespace-nowrap text-ellipsis">
		{name}
	</span>
</button>
