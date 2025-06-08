import type { CombinationHandler, CombinationOptions } from './types.js';
import { isEnabled } from '../utils/isEnabled.js';
import { mapKey } from '../utils/mapKey.js';
import { parseShortcuts } from '../utils/parseShortcuts.js';
import { shouldPreventDefault } from '../utils/shouldPreventDefault.js';
import { matchCombination } from './matchCombination.js';

/**
 * Custom hook for handling keyboard combination shortcuts
 * @param combinations - The combination(s) to listen for
 * @param handler - The function to call when the combination is matched
 * @param options - Configuration options for the combination
 * @returns void
 */
export function useCombination(
	combinations: string | string[],
	handler: CombinationHandler,
	options?: CombinationOptions
) {
	const seperator = options?.seperator || '+';
	const [combinationsArray, mappedCombinations] = parseShortcuts(combinations, seperator);
	const activeKeys = $state(new Set<string>());

	function handleKeydown(event: KeyboardEvent) {
		if (!isEnabled(event, options)) {
			return;
		}

		activeKeys.add(mapKey(event.key));

		const { matched, index } = matchCombination(activeKeys, mappedCombinations);

		if (matched) {
			if (shouldPreventDefault(event, options)) {
				event.preventDefault();
			}

			handler(event, combinationsArray[index]);
		}
	}

	function handleKeyup(event: KeyboardEvent) {
		activeKeys.delete(mapKey(event.key));
	}

	$effect(() => {
		const target = options?.ref || window;

		target.addEventListener('keydown', handleKeydown as EventListener);
		target.addEventListener('keyup', handleKeyup as EventListener);

		return () => {
			target.removeEventListener('keydown', handleKeydown as EventListener);
			target.removeEventListener('keyup', handleKeyup as EventListener);
			activeKeys.clear();
		};
	});
}
