/**
 * Stringifies a sequence of keys into a unique identifier
 * @param sequence - The sequence of keys to stringify
 * @returns A stringified representation of the sequence
 */
export function stringifySequence(sequence: string[]) {
	return `seq__${sequence.join('__')}`;
}
