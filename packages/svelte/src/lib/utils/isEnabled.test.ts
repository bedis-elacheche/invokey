import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { isEnabled } from './isEnabled.js';
import { isInScope } from './isInScope.js';

function createEvent(tag = 'div', isContentEditable = false) {
	const el = document.createElement(tag);

	el.setAttribute('contenteditable', isContentEditable.toString());

	return {
		target: el
	} as unknown as KeyboardEvent;
}

vi.mock('./isInScope.js', () => ({ isInScope: vi.fn().mockReturnValue(true) }));

describe('isEnabled', () => {
	beforeEach(() => {
		mockIsInScope.mockReturnValue(true);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const mockIsInScope = vi.mocked(isInScope);

	it('returns false if not in scope', () => {
		mockIsInScope.mockReturnValue(false);

		expect(isEnabled(createEvent(), {})).toBe(false);
	});

	it('calls enabled function if provided', () => {
		const fn = vi.fn().mockReturnValue(false);

		expect(isEnabled(createEvent(), { enabled: fn })).toBe(false);

		expect(fn).toHaveBeenCalled();
	});

	it('returns false if tag is in disabledOnTags', () => {
		expect(isEnabled(createEvent('input'), { disabledOnTags: ['input'] })).toBe(false);
	});

	it('returns false if tag is in disabledOnFormTags', () => {
		expect(isEnabled(createEvent('textarea'), { disabledOnFormTags: true })).toBe(false);
	});

	it('returns false if contentEditable and disabledOnContentEditable', () => {
		expect(isEnabled(createEvent('div', true), { disabledOnContentEditable: true })).toBe(false);
	});

	it('returns true if enabled is true and all checks pass', () => {
		expect(isEnabled(createEvent(), { enabled: true })).toBe(true);
	});

	it('returns true if options is undefined', () => {
		expect(isEnabled(createEvent())).toBe(true);
	});
});
