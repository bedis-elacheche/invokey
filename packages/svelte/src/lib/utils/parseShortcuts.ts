import { mapKey } from './mapKey.js';

/**
 * Transforms a string or array of shortcuts into an array of strings and a array of mapped keys split by the seperator
 * @param shortcuts - The string or array of shortcuts to parse
 * @param seperator - The seperator to use to split the shortcuts
 * @returns An array of strings and an array of arrays of mapped keys
 */
export function parseShortcuts(
	shortcuts: string | string[],
	seperator: string
): [string[], string[][]] {
	const shortcutsArray = Array.isArray(shortcuts) ? shortcuts : [shortcuts];
	const mappedShortcuts = shortcutsArray.map((shortcut) =>
		shortcut.split(seperator).map((key) => mapKey(key))
	);

	return [shortcutsArray, mappedShortcuts];
}
