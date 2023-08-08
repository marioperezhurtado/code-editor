import { writable } from 'svelte/store';
import { readFile, deleteFile, type TFile } from '$lib/file';
import { readFolder, type TFolder } from '$lib/folder';

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

function createRootFolder() {
	const { subscribe, set, update } = writable<TFolder | null>(null);

	return {
		subscribe,
		open: async () => {
			const dirHandle = await window.showDirectoryPicker();
			const folder = await readFolder(dirHandle);
			folder.expanded = true;
			set(folder);
		},
		close: () => set(null),
		deleteFile: async (file: TFile) =>
			update((folder) => {
				if (!folder) return folder;

				deleteFile(folder, file).then(() => {
					set(folder);
				});

				return folder;
			})
	};
}

export const selectedFile = createSelectedFile();
export const rootFolder = createRootFolder();
