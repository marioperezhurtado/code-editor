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
		deleteFile: async (fileToDelete: TFile) =>
			update((rootFolder) => {
				if (!rootFolder) return null;

				deleteFile(rootFolder, fileToDelete).then(() => {
					set(rootFolder);
				});
				return rootFolder;
			}),
		deleteFolder: async (folderToDelete: TFolder) =>
			update((rootFolder) => {
				if (!rootFolder) return null;

				deleteFolder(rootFolder, folderToDelete).then(() => {
					set(rootFolder);
				});
				return rootFolder;
			})
	};
}

export const COLOR_THEMES = [
	{ title: 'Dark (Code Editor)', code: 'dark' },
	{ title: 'Light (Code Editor)', code: 'light' },
	{ title: 'Monokai', code: 'monokai' },
	{ title: 'Github Light', code: 'github-light' },
	{ title: 'Moonlight', code: 'moonlight' },
	{ title: 'Synthwave', code: 'synthwave' },
	{ title: 'One Dark', code: 'one-dark' }
] as const;
type Theme = (typeof COLOR_THEMES)[number]['code'];

export const LANGUAGES = [
	{ title: 'English', code: 'en' },
	{ title: 'Español', code: 'es' },
	{ title: 'Français', code: 'fr' }
] as const;
type Language = (typeof LANGUAGES)[number]['code'];

type Notification = {
	title: string;
	description: string;
	type: 'success' | 'error' | 'warning' | 'info';
};

function createNotifications() {
	const { subscribe, set, update } = writable<Notification[]>([]);

	return {
		subscribe,
		add: (notification: Notification) =>
			update((notifications) => {
				notifications.push(notification);
				return notifications;
			}),
		remove: (notification: Notification) =>
			update((notifications) => {
				return notifications.filter((n) => n !== notification);
			}),
		clearAll: () => set([])
	};
}

export const selectedFile = createSelectedFile();
export const rootFolder = createRootFolder();
export const colorTheme = persisted<Theme>('color-theme', COLOR_THEMES[0].code);
export const language = persisted<Language>('language', LANGUAGES[0].code);
export const notifications = createNotifications();
