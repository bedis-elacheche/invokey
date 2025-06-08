import type { Options } from '../types.js';

/**
 * Determines whether to prevent the default browser behavior for a keyboard event
 * @param event - The keyboard event
 * @param options - The options provided for the hook
 * @returns True if the default behavior should be prevented, false otherwise
 */
export function shouldPreventDefault(event: KeyboardEvent, options?: Options) {
	if (typeof options?.preventDefault === 'function') {
		return options.preventDefault(event);
	}

	return options?.preventDefault ?? true;
}
