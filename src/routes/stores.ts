import { readFile, type TFile } from '$lib/file';
import { readFolder, type TFolder } from '$lib/folder';
import { writable, derived } from 'svelte/store';


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

export type OpenFile = {
    file: TFile;
    content: string;
    editedContent: string;
};

type OpenFiles = {
    files: OpenFile[];
    selectedFile: OpenFile | null;
};

function createOpenFiles() {
    const { subscribe, set, update } = writable<OpenFiles>({ files: [], selectedFile: null });

    return {
        subscribe,
        set,
        open: async (file: TFile) => {
            update((files) => {
                // If file is already open, select it
                const openedFile = files.files.find((f) => f.file === file);
                if (openedFile) {
                    files.selectedFile = openedFile;
                    return files;
                }

                // Otherwise, open it
                readFile(file).then((content) => {
                    const lastSavedFile = files.files
                        .slice()
                        .reverse()
                        .find((f) => f.content === f.editedContent);

                    // Remove last saved file
                    if (lastSavedFile) {
                        files.files = files.files.filter((f) => f !== lastSavedFile);
                    }

                    files.files.push({
                        file,
                        content,
                        editedContent: content,
                    });
                    files.selectedFile = files.files[files.files.length - 1];
                    set(files)
                });
                return files;
            });
        },
        move: (file: TFile, newIndex: number) => {
            update((files) => {
                // If file is open, move it
                const openedFile = files.files.find((f) => f.file === file);
                if (openedFile) {
                    files.files = files.files.filter((f) => f.file !== file);
                    files.files.splice(newIndex, 0, openedFile);
                    files.selectedFile = files.files[newIndex];
                    return files;
                }

                // Otherwise, open it at index
                readFile(file).then((content) => {
                    files.files.splice(newIndex + 1, 0, {
                        file,
                        content,
                        editedContent: content,
                    });
                    files.selectedFile = files.files[newIndex + 1];
                    set(files)
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
        closeSaved: () => {
          update((files) => {
            files.files = files.files.filter((f) => f.content !== f.editedContent);

            if (files.selectedFile && !files.files.includes(files.selectedFile)) { 
              files.selectedFile = files.files[files.files.length - 1] || null;
            }
            return files;
          })
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
        },
    };
}

function createDraggedFile() {
    const { subscribe, set } = writable<TFile | null>(null);

    return {
        subscribe,
        drag: (file: TFile) => set(file),
        drop: () => set(null),
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

export const rootFolder = createRootFolder();
export const openFiles = createOpenFiles();
export const selectedFile = derived(openFiles, (openFiles) => openFiles.selectedFile);
export const draggedFile = createDraggedFile();
export const notifications = createNotifications();
