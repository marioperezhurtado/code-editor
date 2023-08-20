import type { TFolder } from './folder';

export type TFile = {
	file: FileSystemFileHandle;
	parentFolder: TFolder;
};

export function getFileExtension(fileName: string): string {
	return fileName.slice(fileName.lastIndexOf('.') + 1);
}

export function isBrowserSupported(): boolean {
    return 'showOpenFilePicker' in window;
}

export function getFileLanguage(fileName: string): (typeof SUPPORTED_LANGUAGES)[number] {
	const fileExtension = getFileExtension(fileName);
	const language = SUPPORTED_LANGUAGES.find((lang) => lang.extension === fileExtension);
	return language || { name: 'Plain Text', extension: 'txt' };
}

export async function getFileUrl(file: TFile): Promise<string> {
	const fileResult = await file.file.getFile();
	return URL.createObjectURL(fileResult);
}

export async function readFile(fileHandle: TFile): Promise<string> {
	const file = await fileHandle.file.getFile();
	return file.text();
}

export function getFileIcon(filename: string): string {
	const fileIcon = FILE_ICONS.find((ext) => filename.includes(ext.extension));
	return fileIcon?.icon ?? 'default';
}

export async function resolvePathToFile(folder: TFolder, file: TFile): Promise<Array<string>> {
	const path = await folder.folder.resolve(file.file);
	return path ?? [];
}

export async function deleteFile(fileToDelete: TFile): Promise<void> {
	const { parentFolder } = fileToDelete;

	await parentFolder.folder.removeEntry(fileToDelete.file.name);

	parentFolder.subfiles = parentFolder.subfiles.filter(
		(f) => f.file.name !== fileToDelete.file.name
	);
}

export async function downloadFile(file: TFile): Promise<void> {
	const blob = await file.file.getFile();
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = file.file.name;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

export async function createFile(parentFolder: TFolder, filename: string): Promise<TFile> {
	const newFile = await parentFolder.folder.getFileHandle(filename, { create: true });

	parentFolder.subfiles = [...parentFolder.subfiles, { file: newFile, parentFolder }];

	return { file: newFile, parentFolder };
}

export async function renameFile(file: TFile, newName: string): Promise<void> {
	const { parentFolder } = file;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await file.file.move(newName);

	parentFolder.subfiles = parentFolder.subfiles.map((f) => {
		if (f.file.name === file.file.name) {
			return file;
		}
		return f;
	});
}

export async function writeToFile(file: TFile, content: string): Promise<void> {
	const writable = await file.file.createWritable();
	await writable.write(content);
	await writable.close();
}

export async function copyFile(file: TFile, destination: TFolder): Promise<void> {
	const copiedFile = await createFile(destination, file.file.name);
	const copiedContent = await readFile(file);

	await writeToFile(copiedFile, copiedContent);
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
	{ extension: '.php', icon: 'php' },
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
] as const;

export const SUPPORTED_LANGUAGES = [
	{ name: 'Bash', extension: 'sh' },
	{ name: 'C', extension: 'c' },
	{ name: 'C++', extension: 'cpp' },
	{ name: 'C#', extension: 'cs' },
	{ name: 'CSS', extension: 'css' },
	{ name: 'Dart', extension: 'dart' },
	{ name: 'Elixir', extension: 'ex' },
	{ name: 'Ruby', extension: 'rb' },
	{ name: 'Excel', extension: 'xlsx' },
	{ name: 'F#', extension: 'fs' },
	{ name: 'Go', extension: 'go' },
	{ name: 'Haskell', extension: 'hs' },
	{ name: 'HTML', extension: 'html' },
	{ name: 'Java', extension: 'java' },
	{ name: 'JavaScript', extension: 'js' },
	{ name: 'JSON', extension: 'json' },
	{ name: 'Kotlin', extension: 'kt' },
	{ name: 'Lisp', extension: 'lisp' },
	{ name: 'Lua', extension: 'lua' },
	{ name: 'Markdown', extension: 'md' },
	{ name: 'Nim', extension: 'nim' },
	{ name: 'OCaml', extension: 'ml' },
	{ name: 'PHP', extension: 'php' },
	{ name: 'Perl', extension: 'pl' },
	{ name: 'Python', extension: 'py' },
	{ name: 'Rust', extension: 'rs' },
	{ name: 'Scala', extension: 'scala' },
	{ name: 'SQL', extension: 'sql' },
	{ name: 'Svelte', extension: 'svelte' },
	{ name: 'Swift', extension: 'swift' },
	{ name: 'TypeScript', extension: 'ts' },
	{ name: 'VIM', extension: 'vim' },
	{ name: 'Web Assembly', extension: 'wasm' },
	{ name: 'XML', extension: 'xml' },
	{ name: 'YAML', extension: 'yaml' }
];
