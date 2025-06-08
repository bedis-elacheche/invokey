/**
 * Maps a key to a normalized key name
 * @param key - The key to map
 * @returns The normalized key name
 */
const mappedKeys: Record<string, string> = {
	' ': 'space',
	esc: 'escape',
	return: 'enter',
	left: 'arrowleft',
	right: 'arrowright',
	up: 'arrowup',
	down: 'arrowdown',
	Shift: 'shift',
	ShiftLeft: 'shift',
	ShiftRight: 'shift',
	AltLeft: 'alt',
	AltRight: 'alt',
	MetaLeft: 'meta',
	MetaRight: 'meta',
	OSLeft: 'meta',
	OSRight: 'meta',
	ControlLeft: 'ctrl',
	ControlRight: 'ctrl',
	Control: 'ctrl'
};

/**
 * Maps a key to a normalized key name
 * @param key - The key to map
 * @returns The normalized key name in lowercase
 */
export function mapKey(key: string) {
	return (mappedKeys[key] || key).toLowerCase();
}
