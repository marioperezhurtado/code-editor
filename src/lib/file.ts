export type TFile = {
	file: FileSystemFileHandle;
};

export function getFileExtension(fileName: string): string {
	return fileName.slice(fileName.lastIndexOf('.') + 1);
}
export async function getFileUrl(file: FileSystemFileHandle): Promise<string> {
	const fileResult = await file.getFile();
	return URL.createObjectURL(fileResult);
}

export async function readFile(fileHandle: FileSystemFileHandle): Promise<string> {
	const file = await fileHandle.getFile();
	return file.text();
}

export function getFileIcon(filename: string): string {
	const fileIcon = FILE_EXTENSIONS.find((ext) => filename.includes(ext.extension));

	return fileIcon?.icon ?? 'unknown';
}

export async function resolvePath(
	file: FileSystemFileHandle,
	folder: FileSystemDirectoryHandle
): Promise<Array<string>> {
	if (!file) return [];

	const path = await folder.resolve(file);
	return path ?? [];
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
	{ extension: '.webm', icon: 'video' },
	{ extension: '.mp4', icon: 'video' },
	{ extension: '.ogg', icon: 'video' },
	{ extension: '.jpeg', icon: 'image' },
	{ extension: '.astro', icon: 'astro' },
	{ extension: 'i18n', icon: 'i18n' },
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