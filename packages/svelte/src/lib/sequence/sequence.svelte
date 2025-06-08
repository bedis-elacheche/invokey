<script lang="ts">
	/**
	 * A component that renders content based on keyboard sequence detection.
	 *
	 * @component
	 * @example
	 * ```svelte
	 * <Sequence
	 *   sequences={"i>n>v>o>k>r"}
	 *   hideAfter={2000}
	 * >
	 *   <div>Got invoked!</div>
	 * </Sequence>
	 * ```
	 */
	import { useSequence } from './useSequence.svelte.js';
	import type { SequenceOptions } from './types.js';
	import { onDestroy, type Snippet } from 'svelte';

	interface SequenceProps extends SequenceOptions {
		/** Array of keyboard sequences to detect */
		sequences: Parameters<typeof useSequence>[0];
		/** Content to render when sequence is detected */
		children?: Snippet;
		/** Function to render content with active sequence info */
		activeSequence?: Snippet<[activeSequence: string | null]>;
		/** Time in ms after which to hide content (0 = never hide) */
		hideAfter?: number;
	}

	let { children, activeSequence, sequences, hideAfter = 0, ...options }: SequenceProps = $props();

	let isActive = $state(false);
	let activeSequenceShortcut = $state<string | null>(null);
	let timeoutId: ReturnType<typeof setTimeout> | null = $state(null);

	useSequence(
		sequences,
		(_event, shortcut) => {
			isActive = true;
			activeSequenceShortcut = shortcut;

			if (hideAfter > 0) {
				timeoutId = setTimeout(() => {
					isActive = false;
					activeSequenceShortcut = null;
				}, hideAfter);
			}
		},
		options
	);

	onDestroy(() => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
	});
</script>

{#if isActive}
	{#if activeSequence}
		{@render activeSequence(activeSequenceShortcut)}
	{:else if children}
		{@render children()}
	{/if}
{/if}
