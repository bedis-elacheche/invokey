import type { Scopes } from './types.js';
import { get, writable } from 'svelte/store';

const _scopes = writable<Scopes>({
	'*': true
});

/**
 * Sets the scopes list
 * @param scopes - The scopes to set
 */
export function setScopes(scopes: Scopes) {
	_scopes.set(scopes);
}

/**
 * Gets the scopes list and their statuses
 * @returns The scopes
 */
export function getScopes() {
	return get(_scopes);
}

/**
 * Gets the active scopes
 * @returns The active scopes
 */
export function getActiveScopes() {
	const scopes = getScopes();

	return Object.keys(scopes).filter((scope) => scopes[scope]);
}

/**
 * Enables a scope
 * @param scope - The scope to enable
 */
export function enableScope(scope: string) {
	_scopes.update((current) => ({ ...current, [scope]: true }));
}

/**
 * Enables all scopes
 */
export function enableAllScopes() {
	_scopes.update((current) =>
		Object.keys(current).reduce((acc, scope) => ({ ...acc, [scope]: true }), {})
	);
}

/**
 * Disables a scope
 * @param scope - The scope to disable
 */
export function disableScope(scope: string) {
	_scopes.update((current) => ({ ...current, [scope]: false }));
}

/**
 * Disables all scopes
 */
export function disableAllScopes() {
	_scopes.update((current) =>
		Object.keys(current).reduce((acc, scope) => ({ ...acc, [scope]: false }), {})
	);
}

/**
 * Toggles a scope
 * @param scope - The scope to toggle
 */
export function toggleScope(scope: string) {
	_scopes.update((current) => ({ ...current, [scope]: !current[scope] }));
}
