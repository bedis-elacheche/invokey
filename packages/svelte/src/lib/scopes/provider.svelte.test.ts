import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { setScopes } from './store.js';
import ScopeProvider from './test-components/provider.test.svelte';

vi.mock('./store.js', () => ({ setScopes: vi.fn() }));

describe('ScopeProvider', () => {
	afterEach(() => {
		vi.resetModules();
	});

	it('calls setScopes with activeScopes', () => {
		render(ScopeProvider, { props: { activeScopes: ['foo', 'bar'] } });

		expect(vi.mocked(setScopes)).toHaveBeenCalledWith({ foo: true, bar: true });
	});

	it('calls setScopes with default activeScopes', () => {
		render(ScopeProvider);

		expect(vi.mocked(setScopes)).toHaveBeenCalledWith({ '*': true });
	});

	it('renders children', () => {
		const { getByTestId } = render(ScopeProvider);

		expect(getByTestId('child')).toBeTruthy();
	});
});
