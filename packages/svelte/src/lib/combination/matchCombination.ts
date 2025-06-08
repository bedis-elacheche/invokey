/**
 * Matches a set of active keys against a list of mapped combinations
 * @param activeKeys - The set of active keys
 * @param mappedCombinations - The list of mapped combinations
 * @returns An object containing the match result and the index of the matched combination
 */
export function matchCombination(activeKeys: Set<string>, mappedCombinations: string[][]) {
	for (let i = 0; i < mappedCombinations.length; i++) {
		if (mappedCombinations[i].every((key) => activeKeys.has(key))) {
			return { matched: true, index: i };
		}
	}
	return { matched: false, index: -1 };
}
