import { describe, it, expect } from 'vitest';
import { shouldPreventDefault } from './shouldPreventDefault.js';

describe('shouldPreventDefault', () => {
	it('returns result of preventDefault function', () => {
		const fn = () => false;
		expect(shouldPreventDefault({} as KeyboardEvent, { preventDefault: fn })).toBe(false);
	});

	it('returns boolean preventDefault', () => {
		expect(shouldPreventDefault({} as KeyboardEvent, { preventDefault: true })).toBe(true);
		expect(shouldPreventDefault({} as KeyboardEvent, { preventDefault: false })).toBe(false);
	});

	it('returns true if preventDefault is undefined', () => {
		expect(shouldPreventDefault({} as KeyboardEvent, {})).toBe(true);
		expect(shouldPreventDefault({} as KeyboardEvent)).toBe(true);
	});
});
