import type { TFolder } from './folder';

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
	const fileIcon = FILE_ICONS.find((ext) => filename.includes(ext.extension));
	return fileIcon?.icon ?? 'default';
}

export async function resolvePathToFile(
	folder: FileSystemDirectoryHandle,
	file: FileSystemFileHandle
): Promise<Array<string>> {
	const path = await folder.resolve(file);
	return path ?? [];
}

export async function deleteFile(parentFolder: TFolder, fileToDelete: TFile): Promise<void> {
	await parentFolder.folder.removeEntry(fileToDelete.file.name);

	parentFolder.subfiles = parentFolder.subfiles.filter(
		(f) => f.file.name !== fileToDelete.file.name
	);
}

export async function downloadFile(file: FileSystemFileHandle): Promise<void> {
	const blob = await file.getFile();
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = file.name;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

export async function createFile(parentFolder: TFolder, filename: string): Promise<void> {
	const newFile = await parentFolder.folder.getFileHandle(filename, { create: true });

	parentFolder.subfiles = [...parentFolder.subfiles, { file: newFile }];
}

const FILE_ICONS = [
	{ extension: 'pnpm', icon: 'pnpm' },
	{ extension: 'tailwind', icon: 'tailwindcss' },
	{ extension: 'postcss', icon: 'postcss' },
	{ extension: 'eslint', icon: 'eslint' },
	{ extension: 'tsconfig', icon: 'tsconfig' },
	{ extension: 'package.json', icon: 'nodejs' },
	{ extension: 'next', icon: 'next' },
	{ extension: 'vite', icon: 'vite' },
	{ extension: 'vite', icon: 'vite' },
	{ extension: 'prettier', icon: 'prettier' },
	{ extension: 'git', icon: 'git' },
	{ extension: 'yarn', icon: 'yarn' },
	{ extension: 'svelte', icon: 'svelte' },
	{ extension: 'astro', icon: 'astro' },
	{ extension: 'npm', icon: 'npm' },
	{ extension: 'i18n', icon: 'i18n' },
	{ extension: '.d.ts', icon: 'd.ts' },
	{ extension: '.html', icon: 'html' },
	{ extension: '.json', icon: 'json' },
	{ extension: '.webp', icon: 'image' },
	{ extension: '.webm', icon: 'video' },
	{ extension: '.mp4', icon: 'video' },
	{ extension: '.ogg', icon: 'video' },
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
