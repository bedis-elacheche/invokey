import { getActiveScopes } from '../scopes/store.js';

/**
 * Checks if a keyboard event is in a specific scope
 * @param scope - The scope to check
 * @returns True if the event is in the scope, false otherwise
 */
export function isInScope(scope?: string) {
	if (!scope || scope === '*') {
		return true;
	}

	const activeScopes = getActiveScopes();

	return activeScopes.includes(scope) || activeScopes.includes('*');
}
