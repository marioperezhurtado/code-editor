import type { TFile } from '$lib/file';

export type TFolder = {
	folder: FileSystemDirectoryHandle;
	subfolders: TFolder[];
	subfiles: TFile[];
	expanded: boolean;
};

export async function readFolder(dirHandle: FileSystemDirectoryHandle): Promise<TFolder> {
	const subfolders: TFolder['subfolders'] = [];
	const subfiles: TFolder['subfiles'] = [];

	for await (const entry of dirHandle.values()) {
		if (entry.kind === 'directory') {
			const children = await readFolder(entry);

			subfolders.push({
				...children,
				expanded: false
			});
		} else {
			subfiles.push({ file: entry });
		}
	}

	subfiles.sort((a, b) => a.file.name.localeCompare(b.file.name));
	subfolders.sort((a, b) => a.folder.name.localeCompare(b.folder.name));

	return {
		folder: dirHandle,
		subfiles,
		subfolders,
		expanded: false
	};
}

export function getFolderIcon(foldername: string): string {
	return FOLDER_ICONS.find((icon) => foldername.includes(icon)) ?? 'default';
}

export async function resolvePathToFolder(
	originFolder: FileSystemDirectoryHandle,
	folderToResolve: FileSystemDirectoryHandle
): Promise<Array<string>> {
	const path = await originFolder.resolve(folderToResolve);
	return path ?? [];
}

export async function deleteFolder(parentFolder: TFolder, folderToDelete: TFolder): Promise<void> {
	await parentFolder.folder.removeEntry(folderToDelete.folder.name, { recursive: true });

	parentFolder.subfolders = parentFolder.subfolders.filter(
		(f) => f.folder.name !== folderToDelete.folder.name
	);
}

export async function createFolder(parentFolder: TFolder, foldername: string): Promise<void> {
	const newFolder = await parentFolder.folder.getDirectoryHandle(foldername, { create: true });

	parentFolder.subfolders = [
		...parentFolder.subfolders,
		{ folder: newFolder, subfolders: [], subfiles: [], expanded: false }
	];
}

const FOLDER_ICONS = [
	'node',
	'app',
	'api',
	'ci',
	'config',
	'components',
	'git',
	'component',
	'git',
	'coverage',
	'font',
	'function',
	'dist',
	'css',
	'context',
	'content',
	'hook',
	'i18n',
	'src',
	'test',
	'lib',
	'open',
	'node',
	'mock',
	'server',
	'temp',
	'util',
	'layout',
	'script',
	'style',
	'image',
	'asset'
];
