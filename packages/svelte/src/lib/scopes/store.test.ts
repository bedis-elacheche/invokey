import { describe, it, expect, beforeEach } from 'vitest';
import {
	setScopes,
	getScopes,
	getActiveScopes,
	enableScope,
	disableScope,
	enableAllScopes,
	disableAllScopes,
	toggleScope
} from './store.js';

describe('scopes store', () => {
	beforeEach(() => {
		setScopes({ '*': true });
	});

	it('sets and gets scopes', () => {
		setScopes({ foo: true, bar: false });

		expect(getScopes()).toEqual({ foo: true, bar: false });
	});

	it('gets active scopes', () => {
		setScopes({ foo: true, bar: false, baz: true });

		expect(getActiveScopes().sort()).toEqual(['foo', 'baz'].sort());
	});

	it('enables a scope', () => {
		setScopes({ foo: false });
		enableScope('foo');

		expect(getScopes()).toEqual({ foo: true });
	});

	it('disables a scope', () => {
		setScopes({ foo: true });
		disableScope('foo');

		expect(getScopes()).toEqual({ foo: false });
	});

	it('enables all scopes', () => {
		setScopes({ foo: false, bar: true });

		enableAllScopes();

		expect(getScopes()).toEqual({ foo: true, bar: true });
	});

	it('disables all scopes', () => {
		setScopes({ foo: true, bar: false });

		disableAllScopes();

		expect(getScopes()).toEqual({ foo: false, bar: false });
	});

	it('toggles a scope', () => {
		setScopes({ foo: true });

		toggleScope('foo');

		expect(getScopes()).toEqual({ foo: false });
	});
});
