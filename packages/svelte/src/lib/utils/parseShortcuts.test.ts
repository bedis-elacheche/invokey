import { describe, it, expect } from 'vitest';
import { parseShortcuts } from './parseShortcuts.js';

describe('parseShortcuts', () => {
	it('parses a single shortcut string', () => {
		const [arr, mapped] = parseShortcuts('A>B', '>');

		expect(arr).toEqual(['A>B']);
		expect(mapped).toEqual([['a', 'b']]);
	});

	it('parses an array of shortcuts', () => {
		const [arr, mapped] = parseShortcuts(['a+b', 'c+d'], '+');

		expect(arr).toEqual(['a+b', 'c+d']);
		expect(mapped).toEqual([
			['a', 'b'],
			['c', 'd']
		]);
	});
});
