type ShortcutParams = {
	alt?: boolean;
	shift?: boolean;
	control?: boolean;
	key: string;
};

export function shortcut(node: HTMLElement, params: ShortcutParams) {
	let handler: (e: KeyboardEvent) => void;

	function removeHandler() {
		window.removeEventListener('keydown', handler);
	}

	function setHandler() {
		removeHandler();
		removeHandler();
		if (!params) return;
		handler = (e) => {
			if (
				!!params.alt != e.altKey ||
				!!params.shift != e.shiftKey ||
				!!params.control != (e.ctrlKey || e.metaKey) ||
				params.key != e.key
			)
				return;
			e.preventDefault();
			node.dispatchEvent(new CustomEvent('shortcut'));
		};
		window.addEventListener('keydown', handler);
	}

	setHandler();
	return {
		update: setHandler,
		destroy: removeHandler
	};
}
