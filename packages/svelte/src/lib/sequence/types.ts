import type { Options, Prettify } from '../types.js';

/**
 * Type definition for the handler function used in sequence shortcuts
 * @typedef {Function} SequenceHandler
 * @param {KeyboardEvent} event - The keyboard event
 * @param {string} sequence - The sequence that was matched
 */
export type SequenceHandler = (event: KeyboardEvent, sequence: string) => void;

/**
 * Configuration options for keyboard sequence shortcuts
 * Extends the base Options type with additional sequence-specific options
 * @typedef {Object} SequenceOptions
 * @property {number} [timeout] - Maximum time (in milliseconds) allowed between key presses in a sequence
 * @property {boolean} [ignoreModifiers] - Whether to ignore modifier keys (Ctrl, Alt, Shift, Meta) in the sequence
 */
export type SequenceOptions = Prettify<
	Options & {
		timeout?: number;
		ignoreModifiers?: boolean;
	}
>;
