import { writable, type Writable } from 'svelte/store';

type StoreDict<T> = { [key: string]: Writable<T> };

/* eslint-disable @typescript-eslint/no-explicit-any */
const stores: StoreDict<any> = {};

export function persisted<T>(key: string, initialValue: T): Writable<T> {
	const browser = typeof window !== 'undefined' && typeof document !== 'undefined';
	const storage = browser ? localStorage : null;

	function updateStorage(key: string, value: T) {
		storage?.setItem(key, JSON.stringify(value));
	}

	if (stores[key]) {
		return stores[key];
	}

	const store = writable(initialValue, (set) => {
		const json = storage?.getItem(key);

		if (json) {
			set(<T>JSON.parse(json));
		} else {
			updateStorage(key, initialValue);
		}

		if (browser) {
			const handleStorage = (event: StorageEvent) => {
				if (event.key === key) set(event.newValue ? JSON.parse(event.newValue) : null);
			};

			window.addEventListener('storage', handleStorage);

			return () => window.removeEventListener('storage', handleStorage);
		}
	});

	const { subscribe, set } = store;

	stores[key] = {
		subscribe,
		set(value: T) {
			updateStorage(key, value);
			set(value);
		},
		update(callback: (value: T) => T) {
			return store.update((last) => {
				const value = callback(last);

				updateStorage(key, value);

				return value;
			});
		}
	};

	return stores[key];
}
