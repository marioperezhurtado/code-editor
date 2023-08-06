export type TFolder = {
	folder: FileSystemDirectoryHandle;
	subfolders: TFolder[];
	subfiles: TFile[];
	expanded: boolean;
};

export type TFile = {
	file: FileSystemFileHandle;
};

async function readFolder(dirHandle: FileSystemDirectoryHandle): Promise<TFolder> {
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

export async function openFolder(): Promise<TFolder> {
	const dirHandle = await window.showDirectoryPicker();

	return readFolder(dirHandle);
}

const FILE_EXTENSIONS = [
	{ extension: 'pnpm-workspace.yaml', icon: 'pnpm' },
	{ extension: 'tailwind.config', icon: 'tailwindcss' },
	{ extension: '.prettierignore', icon: 'prettier' },
	{ extension: 'postcss.config', icon: 'postcss' },
	{ extension: 'pnpm-lock.yaml', icon: 'pnpm' },
	{ extension: '.eslintignore', icon: 'eslint' },
	{ extension: 'svelte.config', icon: 'svelte' },
	{ extension: 'tsconfig.json', icon: 'tsconfig' },
	{ extension: 'package.json', icon: 'nodejs' },
	{ extension: 'next.config', icon: 'next' },
	{ extension: 'vite.config', icon: 'vite' },
	{ extension: 'vite.config', icon: 'vite' },
	{ extension: '.prettierrc', icon: 'prettier' },
	{ extension: '.gitignore', icon: 'git' },
	{ extension: '.eslintrc', icon: 'eslint' },
	{ extension: 'yarn.lock', icon: 'yarn' },
	{ extension: '.svelte', icon: 'svelte' },
	{ extension: '.npmrc', icon: 'npm' },
	{ extension: '.d.ts', icon: 'd.ts' },
	{ extension: '.html', icon: 'html' },
	{ extension: '.json', icon: 'json' },
	{ extension: '.webp', icon: 'image' },
	{ extension: '.jpeg', icon: 'image' },
	{ extension: '.svg', icon: 'svg' },
	{ extension: '.png', icon: 'image' },
	{ extension: '.jpg', icon: 'image' },
	{ extension: '.gif', icon: 'image' },
	{ extension: '.ico', icon: 'image' },
	{ extension: '.txt', icon: 'txt' },
	{ extension: '.css', icon: 'css' },
	{ extension: '.jsx', icon: 'jsx' },
	{ extension: '.tsx', icon: 'tsx' },
	{ extension: '.vue', icon: 'vue' },
	{ extension: '.env', icon: 'env' },
	{ extension: '.js', icon: 'js' },
	{ extension: '.ts', icon: 'ts' },
	{ extension: '.md', icon: 'md' }
];

export function getFileIcon(filename: string): string {
	const fileIcon = FILE_EXTENSIONS.find((ext) => filename.includes(ext.extension));

	return fileIcon?.icon ?? 'unknown';
}
