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
