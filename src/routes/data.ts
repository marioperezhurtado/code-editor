export type TFolder = {
	name: string;
	kind: 'file' | 'folder';
	expanded: boolean;
	subfiles: Array<TFolder>;
};
