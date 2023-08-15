import { readFile, type TFile } from '$lib/file';
import { readFolder, type TFolder } from '$lib/folder';
import { writable } from 'svelte/store';

type SelectedFile = {
	file: TFile;
	content: string | null;
	editedContent: string | null;
};

function createSelectedFile() {
	const { subscribe, set, update } = writable<SelectedFile | null>(null);

	return {
		subscribe,
		set,
		open: async (file: TFile) => {
			const content = await readFile(file);
			set({
				file,
				content,
				editedContent: content
			});
		},
		close: () => set(null),
		reset: () =>
			update((file) => {
				if (!file) return null;
				file.editedContent = file.content;
				return file;
			}),
		save: () =>
			update((file) => {
				if (!file?.editedContent) return null;
				file.content = file.editedContent;
				return file;
			})
	};
}

function createRootFolder() {
	const { subscribe, set, update } = writable<TFolder | null>(null);

	return {
		subscribe,
		open: async (dirHandle: FileSystemDirectoryHandle) => {
			const folder = await readFolder(dirHandle, null);
			folder.expanded = true;
			set(folder);
		},
		close: () => set(null),
		refresh: () => update((folder) => folder)
	};
}

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
export const notifications = createNotifications();
