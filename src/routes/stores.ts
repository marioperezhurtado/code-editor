import { readFile, type TFile } from '$lib/file';
import { readFolder, type TFolder } from '$lib/folder';
import { writable, derived } from 'svelte/store';

export type OpenFile = {
    file: TFile;
    content: string | null;
    editedContent: string | null;
};

type OpenFiles = {
    files: OpenFile[];
    selectedFile: OpenFile | null;
};

function createOpenFiles() {
    const { subscribe,set,  update } = writable<OpenFiles>({ files: [], selectedFile: null });

    return {
        subscribe,
        open: async (file: TFile) => {
            update((files) => {
                if (files.files.some((f) => f.file === file)) {
                    files.selectedFile = files.files.find((f) => f.file === file) || null;
                    return files;
                }

                readFile(file).then((content) => {
                    files.files.push({
                        file,
                        content,
                        editedContent: content
                    });
                    files.selectedFile = files.files[files.files.length - 1];
                    set(files);
                });

                return files;
            });
        },
        close: (file: TFile) => {
            update((files) => {
                files.files = files.files.filter((f) => f.file !== file);

                if (file === files.selectedFile?.file) {
                    files.selectedFile = files.files[files.files.length - 1] || null;
                }
                return files;
            });
        },
        select: (file: TFile) => {
            update((files) => {
                files.selectedFile = files.files.find((f) => f.file === file) || null;
                return files;
            });
        },
        reset: () => {
            update((files) => {
                if (!files.selectedFile) return files;
                files.selectedFile.editedContent = files.selectedFile.content;
                return files;
            });
        },
        save: () => {
            update((files) => {
                if (!files.selectedFile?.editedContent) return files;
                files.selectedFile.content = files.selectedFile.editedContent;
                return files;
            });
        }
    }
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

export const openFiles = createOpenFiles();
export const selectedFile = derived(openFiles, (openFiles) => openFiles.selectedFile);
export const rootFolder = createRootFolder();
export const notifications = createNotifications();
