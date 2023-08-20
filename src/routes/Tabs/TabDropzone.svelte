<script lang="ts">
	import { openFiles } from '../stores';

	let dragHover = false;

	function handleDragLeave(e: DragEvent) {
		if (e.relatedTarget === null) {
			openFiles.move($openFiles.files.length - 1);
		}
		dragHover = false;
	}
</script>

<li
	on:dragenter={() => (dragHover = true)}
	on:dragleave={handleDragLeave}
	class="flex-grow h-full transition"
	class:bg-dark-3={dragHover}
/>
