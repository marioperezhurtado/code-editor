import { beforeEach, describe, test, expect } from 'vitest';
import { persisted } from './persisted';
import { get } from 'svelte/store';

beforeEach(() => localStorage.clear());

describe('persisted()', () => {
	test('uses initial value if nothing in local storage', () => {
		const store = persisted('myKey', 123);
		const value = get(store);

		expect(value).toEqual(123);
		expect(localStorage.myKey).toEqual('123');
	});

	test('uses existing value if data already in local storage', () => {
		localStorage.setItem('myKey2', '"existing"');

		const store = persisted('myKey2', 'initial');
		const value = get(store);

		expect(value).toEqual('existing');
	});

	describe('set()', () => {
		test('replaces old value', () => {
			localStorage.setItem('myKey3', '"existing"');

			const store = persisted('myKey3', '');
			store.set('new-value');
			const value = get(store);

			expect(localStorage.myKey3).toEqual('"new-value"');
			expect(value).toEqual('new-value');
		});

		test('adds new value', () => {
			const store = persisted('myKey4', '');
			store.set('new-value');
			const value = get(store);

			expect(localStorage.myKey4).toEqual('"new-value"');
			expect(value).toEqual('new-value');
		});
	});

	describe('update()', () => {
		test('replaces old value', () => {
			const store = persisted('myKey5', 123);
			store.update((n) => n + 1);
			const value = get(store);

			expect(localStorage.myKey5).toEqual('124');
			expect(value).toEqual(124);
		});

		test('adds new value', () => {
			const store = persisted('myKey6', 123);
			store.update((n) => n + 1);
			const value = get(store);

			expect(localStorage.myKey6).toEqual('124');
			expect(value).toEqual(124);
		});
	});

	describe('subscribe()', () => {
		test('publishes updates', () => {
			const store = persisted('myKey7', 123);
			const values: number[] = [];
			const unsub = store.subscribe((value: number) => {
				if (value !== undefined) values.push(value);
			});
			store.set(456);
			store.set(999);

			expect(values).toEqual([123, 456, 999]);

			unsub();
		});
	});

	test('handles duplicate stores with the same key', () => {
		const store1 = persisted('same-key', 1);
		const values1: number[] = [];

		const unsub1 = store1.subscribe((value) => {
			values1.push(value);
		});

		store1.set(2);

		const store2 = persisted('same-key', 99);
		const values2: number[] = [];

		const unsub2 = store2.subscribe((value) => {
			values2.push(value);
		});

		store1.set(3);
		store2.set(4);

		expect(values1).toEqual([1, 2, 3, 4]);
		expect(values2).toEqual([2, 3, 4]);
		expect(get(store1)).toEqual(get(store2));

		expect(store1).toEqual(store2);

		unsub1();
		unsub2();
	});

	describe('handles window.storage event', () => {
		type NumberDict = { [key: string]: number };

		test('sets storage when key matches', () => {
			const store = persisted('myKey8', { a: 1 });
			const values: NumberDict[] = [];

			const unsub = store.subscribe((value: NumberDict) => {
				values.push(value);
			});

			const event = new StorageEvent('storage', { key: 'myKey8', newValue: '{"a": 1, "b": 2}' });
			window.dispatchEvent(event);

			expect(values).toEqual([{ a: 1 }, { a: 1, b: 2 }]);

			unsub();
		});

		test('sets store to null when value is null', () => {
			const store = persisted('myKey9', { a: 1 });
			const values: NumberDict[] = [];

			const unsub = store.subscribe((value: NumberDict) => {
				values.push(value);
			});

			const event = new StorageEvent('storage', { key: 'myKey9', newValue: null });
			window.dispatchEvent(event);

			expect(values).toEqual([{ a: 1 }, null]);

			unsub();
		});

		test("doesn't update store when key doesn't match", () => {
			const store = persisted('myKey10', 1);
			const values: number[] = [];

			const unsub = store.subscribe((value: number) => {
				values.push(value);
			});

			const event = new StorageEvent('storage', { key: 'unknownKey', newValue: '2' });
			window.dispatchEvent(event);

			expect(values).toEqual([1]);

			unsub();
		});

		test("doesn't update store when there are no subscribers", () => {
			const store = persisted('myKey', 1);
			const values: number[] = [];

			const event = new StorageEvent('storage', { key: 'myKey', newValue: '2' });
			window.dispatchEvent(event);
			localStorage.setItem('myKey', '2');

			const unsub = store.subscribe((value: number) => {
				values.push(value);
			});

			expect(values).toEqual([2]);

			unsub();
		});
	});
});
