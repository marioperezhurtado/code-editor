export function clickOutside(node: HTMLElement) {
	function handleClick(event: MouseEvent) {
		if (node && !node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	}

	document.addEventListener('click', handleClick, true);
	document.addEventListener('contextmenu', handleClick, true);
	document.addEventListener('keydown', handleKeydown, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('contextmenu', handleClick, true);
			document.removeEventListener('keydown', handleKeydown, true);
		}
	};
}
