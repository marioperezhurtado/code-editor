export type TFolder = {
	name: string;
	kind: 'file' | 'folder';
	expanded: boolean;
	subfiles: Array<TFolder>;
};

async function readSubfiles(dirHandle: FileSystemDirectoryHandle): Promise<TFolder['subfiles']> {
	const subfiles: TFolder['subfiles'] = [];

	for await (const entry of dirHandle.values()) {
		if (entry.kind === 'directory') {
			subfiles.push({
				name: entry.name,
				kind: 'folder',
				expanded: false,
				subfiles: await readSubfiles(entry)
			});
		} else {
			subfiles.push({
				name: entry.name,
				kind: 'file',
				expanded: false,
				subfiles: []
			});
		}
	}

	// sort alphabetically
	subfiles.sort((a, b) => a.name.localeCompare(b.name));

	// sort folders before files
	subfiles.sort((a, b) => {
		if (a.kind === 'folder' && b.kind === 'file') return -1;
		if (a.kind === 'file' && b.kind === 'folder') return 1;
		return 0;
	});

	return subfiles;
}

export async function openFolder(): Promise<TFolder> {
	const dirHandle = await window.showDirectoryPicker();

	return {
		name: dirHandle.name,
		kind: 'folder',
		expanded: true,
		subfiles: await readSubfiles(dirHandle)
	};
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
