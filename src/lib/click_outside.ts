export function clickOutside(node: HTMLElement) {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);
	document.addEventListener('contextmenu', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
			document.addEventListener('contextmenu', handleClick, true);
		}
	};
}
