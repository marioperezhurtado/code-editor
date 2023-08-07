import { writable } from 'svelte/store';
import { readFile } from '$lib/files';
import type { TFile } from './FileExplorer/data';

type SelectedFile = {
	file: TFile;
	content: string;
};

function createSelectedFile() {
	const { subscribe, set } = writable<SelectedFile | null>(null);

	return {
		subscribe,
		set,
		open: async (file: TFile) => {
			const content = await readFile(file.file);
			set({ file, content });
		},
		close: () => set(null)
	};
}

export const selectedFile = createSelectedFile();
