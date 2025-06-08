import { describe, it, expect } from 'vitest';
import { matchCombination } from './matchCombination.js';

describe('matchCombination', () => {
	it('returns matched true and correct index for first match', () => {
		const active = new Set(['ctrl', 'a']);
		const mapped = [
			['ctrl', 'a'],
			['ctrl', 'b']
		];

		expect(matchCombination(active, mapped)).toEqual({ matched: true, index: 0 });
	});

	it('returns matched true and correct index for second match', () => {
		const active = new Set(['ctrl', 'b']);
		const mapped = [
			['ctrl', 'a'],
			['ctrl', 'b']
		];

		expect(matchCombination(active, mapped)).toEqual({ matched: true, index: 1 });
	});

	it('returns matched false and index -1 if no match', () => {
		const active = new Set(['ctrl', 'c']);
		const mapped = [
			['ctrl', 'a'],
			['ctrl', 'b']
		];

		expect(matchCombination(active, mapped)).toEqual({ matched: false, index: -1 });
	});

	it('returns matched false and index -1 for empty input', () => {
		expect(matchCombination(new Set(), [])).toEqual({ matched: false, index: -1 });
	});
});
