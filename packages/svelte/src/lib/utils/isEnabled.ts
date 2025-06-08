import type { Options } from '../types.js';
import { isInScope } from './isInScope.js';

/**
 * Checks if a keyboard event is enabled based on the provided options
 * @param event - The keyboard event
 * @param options - The options provided for the hook
 * @returns True if the event is enabled, false otherwise
 */
export function isEnabled(event: KeyboardEvent, options?: Options) {
	if (!isInScope(options?.scope)) {
		return false;
	}

	if (typeof options?.enabled === 'function') {
		return options.enabled(event);
	}

	if (event.target instanceof HTMLElement) {
		const tagName = event.target.tagName.toLowerCase();

		const disabledTags = new Set(
			[
				...(options?.disabledOnTags || []),
				...(options?.disabledOnFormTags ? ['input', 'textarea', 'select'] : [])
			].map((tag) => tag.toLowerCase())
		);

		if (disabledTags.has(tagName)) {
			return false;
		}

		if (
			options?.disabledOnContentEditable &&
			event.target.getAttribute('contenteditable') === 'true'
		) {
			return false;
		}
	}

	return options?.enabled ?? true;
}
