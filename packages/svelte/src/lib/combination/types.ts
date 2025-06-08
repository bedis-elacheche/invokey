import type { Options, Prettify } from '../types.js';

/**
 * Type definition for the handler function used in combination shortcuts
 * @typedef {Function} CombinationHandler
 * @param {KeyboardEvent} event - The keyboard event
 * @param {string} combination - The combination that was matched
 */
export type CombinationHandler = (event: KeyboardEvent, combination: string) => void;

/**
 * Configuration options for keyboard combination shortcuts
 * Extends the base Options type with additional combination-specific options
 * @typedef {Object} CombinationOptions
 */
export type CombinationOptions = Prettify<Options & {}>;
