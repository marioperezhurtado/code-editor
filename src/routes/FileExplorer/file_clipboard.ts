import { writable } from 'svelte/store';
import type { TFile } from '$lib/file';

type Clipboard = TFile | null;

function createFileClipboard() {
	const { subscribe, set } = writable<Clipboard>(null);

	return {
		subscribe,
		copy: (file: TFile) => set(file),
		paste: () => set(null)
	};
}

export const fileClipboard = createFileClipboard();
