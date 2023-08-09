import { readFile, deleteFile, type TFile } from '$lib/file';
import { readFolder, deleteFolder, type TFolder } from '$lib/folder';
import { writable } from 'svelte/store';
import { persisted } from '$lib/persisted_store';

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
		deleteFile: async (file_to_delete: TFile) =>
			update((folder) => {
				if (!folder) return folder;

				deleteFile(folder, file_to_delete).then(() => {
					set(folder);
				});
				return folder;
			}),
		deleteFolder: async (folder_to_delete: TFolder) =>
			update((folder) => {
				if (!folder) return folder;

				deleteFolder(folder, folder_to_delete).then(() => {
					set(folder);
				});
				return folder;
			})
	};
}

type Theme = 'dark' | 'light';

function createColorTheme() {
	if (typeof window === 'undefined') return;

	const initialTheme = window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';

	const { subscribe, set } = persisted('color-theme', initialTheme);

	return {
		subscribe,
		setTheme: (theme: Theme) => set(theme)
	};
}

export const selectedFile = createSelectedFile();
export const rootFolder = createRootFolder();
export const colorTheme = createColorTheme();
