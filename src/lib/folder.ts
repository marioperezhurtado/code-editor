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

export async function resolvePathToFolder(
	origin_folder: FileSystemDirectoryHandle,
	folder_to_resolve: FileSystemDirectoryHandle
): Promise<Array<string>> {
	if (!origin_folder) return [];

	const path = await origin_folder.resolve(folder_to_resolve);
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

	const path_to_remove = paths.at(-1);
	if (!path_to_remove) return;

	currentFolder.subfolders = currentFolder.subfolders.filter(
		(f) => f.folder.name !== path_to_remove
	);

	await currentFolder.folder.removeEntry(path_to_remove, { recursive: true });
}
