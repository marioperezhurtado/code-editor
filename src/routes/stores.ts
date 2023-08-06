import { writable } from 'svelte/store';
import type { TFile } from './FileExplorer/data';

async function readFile(fileHandle: FileSystemFileHandle): Promise<string> {
	const file = await fileHandle.getFile();
	return file.text();
}

type SelectedFile = {
	file: TFile;
	content: string;
};

function createSelectedFile() {
	const { subscribe, set } = writable<SelectedFile | null>(null);

	return {
		subscribe,
		open: async (file: TFile) => {
			const content = await readFile(file.file);
			set({ file, content });
		},
		close: () => set(null)
	};
}

export const selectedFile = createSelectedFile();
