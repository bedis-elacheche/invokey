import { describe, it, expect } from 'vitest';
import { mapKey } from './mapKey.js';

describe('mapKey', () => {
	it('maps known keys to their canonical names', () => {
		expect(mapKey('esc')).toBe('escape');
		expect(mapKey('return')).toBe('enter');
		expect(mapKey('left')).toBe('arrowleft');
		expect(mapKey('ShiftLeft')).toBe('shift');
		expect(mapKey('AltRight')).toBe('alt');
		expect(mapKey('MetaLeft')).toBe('meta');
		expect(mapKey('Control')).toBe('ctrl');
	});

	it('returns lowercased key if not mapped', () => {
		expect(mapKey('A')).toBe('a');
		expect(mapKey('z')).toBe('z');
	});
});
