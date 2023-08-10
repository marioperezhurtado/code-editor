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

	// sort alphabetically
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
	if (!originFolder) return [];

	const path = await originFolder.resolve(folderToResolve);
	return path ?? [];
}

export async function deleteFolder(rootFolder: TFolder, folder: TFolder): Promise<void> {
	const paths = await resolvePathToFolder(rootFolder.folder, folder.folder);
	if (!paths) return;

	// find folder
	let currentFolder = rootFolder;

	for (let i = 0; i < paths.length - 1; i++) {
		const subfolder = currentFolder?.subfolders.find((f) => f.folder.name === paths[i]);
		if (subfolder) currentFolder = subfolder;
	}

	const pathToRemove = paths.at(-1);
	if (!pathToRemove) return;

	currentFolder.subfolders = currentFolder.subfolders.filter((f) => f.folder.name !== pathToRemove);

	await currentFolder.folder.removeEntry(pathToRemove, { recursive: true });
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
