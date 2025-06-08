import { describe, it, expect } from 'vitest';
import { stringifySequence } from './stringifySequence.js';

describe('stringifySequence', () => {
	it('returns prefix for empty array', () => {
		expect(stringifySequence([])).toBe('seq__');
	});

	it('joins single element array', () => {
		expect(stringifySequence(['a'])).toBe('seq__a');
	});

	it('joins multiple elements with __', () => {
		expect(stringifySequence(['a', 'b', 'c'])).toBe('seq__a__b__c');
	});
});
