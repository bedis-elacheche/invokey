import { describe, it, expect, vi, afterEach } from 'vitest';
import { getActiveScopes } from '../scopes/store.js';
import { isInScope } from './isInScope.js';

vi.mock('../scopes/store.js', () => ({
	getActiveScopes: vi.fn().mockReturnValue(['*'])
}));

describe('isInScope', () => {
	afterEach(() => {
		vi.resetModules();
	});

	const mockGetActiveScopes = vi.mocked(getActiveScopes);

	it('returns true if no scope provided', () => {
		expect(isInScope()).toBe(true);
	});

	it('returns true if wildcard is in activeScopes', () => {
		expect(isInScope('baz')).toBe(true);
	});

	it('returns true if scope is in activeScopes', () => {
		mockGetActiveScopes.mockReturnValue(['foo', 'bar']);

		expect(isInScope('foo')).toBe(true);
	});

	it('returns false if scope is not in activeScopes', () => {
		mockGetActiveScopes.mockReturnValue(['foo', 'bar']);

		expect(isInScope('baz')).toBe(false);
	});
});
