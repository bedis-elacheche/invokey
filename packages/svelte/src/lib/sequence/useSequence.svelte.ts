import type { SequenceHandler, SequenceOptions } from './types.js';
import { isEnabled } from '../utils/isEnabled.js';
import { mapKey } from '../utils/mapKey.js';
import { parseShortcuts } from '../utils/parseShortcuts.js';
import { shouldPreventDefault } from '../utils/shouldPreventDefault.js';
import { stringifySequence } from './stringifySequence.js';

/**
 * Custom hook for handling keyboard sequence shortcuts
 * @param sequences - The sequence(s) to listen for
 * @param handler - The function to call when the sequence is matched
 * @param options - Configuration options for the sequence
 * @returns void
 */
export function useSequence(
	sequences: string | string[],
	handler: SequenceHandler,
	options?: SequenceOptions
) {
	const seperator = options?.seperator || '>';
	const [sequencesArray, mappedSequences] = parseShortcuts(sequences, seperator);
	const activeKeys = $state<string[]>([]);
	const timeout = options?.timeout ?? 1000;
	let lastKeyTime = $state(0);

	function handleKeydown(event: KeyboardEvent) {
		if (!isEnabled(event, options)) {
			return;
		}

		const now = Date.now();

		if (now - lastKeyTime > timeout) {
			activeKeys.length = 0;
		}

		lastKeyTime = now;

		const key = mapKey(event.key);

		if (options?.ignoreModifiers) {
			if (!['ctrl', 'alt', 'meta', 'shift'].includes(key)) {
				activeKeys.push(key);
			}
		} else {
			activeKeys.push(event.key);
		}

		if (
			mappedSequences.every(
				(sequence) => !stringifySequence(sequence).startsWith(stringifySequence(activeKeys))
			)
		) {
			activeKeys.length = 0;
		}

		const index = mappedSequences.findIndex(
			(sequence) => stringifySequence(sequence) === stringifySequence(activeKeys)
		);

		if (index !== -1) {
			if (shouldPreventDefault(event, options)) {
				event.preventDefault();
			}

			handler(event, sequencesArray[index]);
			activeKeys.length = 0;
		}
	}

	$effect(() => {
		const target = options?.ref || window;

		target.addEventListener('keydown', handleKeydown as EventListener);

		return () => {
			target.removeEventListener('keydown', handleKeydown as EventListener);
			activeKeys.length = 0;
		};
	});
}
