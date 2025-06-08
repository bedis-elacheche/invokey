/**
 * Type definition for enabling/disabling keyboard shortcuts
 * Can be a boolean or a function that takes a KeyboardEvent and returns a boolean
 */
export type Enabled = boolean | ((event: KeyboardEvent) => boolean);

/**
 * Configuration options for keyboard shortcuts
 * @typedef {Object} Options
 * @property {string} [seperator] - Character used to separate keys in a sequence
 * @property {HTMLElement | null} [ref] - Reference to the DOM element to attach the keyboard listener to
 * @property {Enabled} [preventDefault] - Whether to prevent default browser behavior
 * @property {Enabled} [enabled] - Whether the shortcut is enabled
 * @property {string[]} [disabledOnTags] - List of HTML tags where shortcuts should be disabled
 * @property {boolean} [disabledOnFormTags] - Whether to disable shortcuts on form elements
 * @property {boolean} [disabledOnContentEditable] - Whether to disable shortcuts on contentEditable elements
 * @property {string} [scope] - The scope this shortcut belongs to
 */
export type Options = {
	seperator?: string;
	ref?: HTMLElement | null;
	preventDefault?: Enabled;
	enabled?: Enabled;
	disabledOnTags?: string[];
	disabledOnFormTags?: boolean;
	disabledOnContentEditable?: boolean;
	scope?: string;
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
