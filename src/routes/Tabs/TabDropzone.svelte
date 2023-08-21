<script lang="ts">
	import { openFiles, draggedFile } from '../stores';

	let dragHover = false;

	function handleDragLeave(e: DragEvent) {
		if (e.relatedTarget === null && $draggedFile !== null) {
            const tabIndex = $openFiles.files.length - 1;
			openFiles.move($draggedFile, tabIndex);
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
