<script lang="ts">
	/**
	 * A component that renders content based on keyboard combination detection.
	 *
	 * @component
	 * @example
	 * ```svelte
	 * <Combination
	 *   combinations={['ctrl+k', 'cmd+k']}
	 *   hideAfter={2000}
	 * >
	 *   <div>Search panel</div>
	 * </Combination>
	 * ```
	 */
	import { useCombination } from './useCombination.svelte.js';
	import type { CombinationOptions } from './types.js';
	import { onDestroy, type Snippet } from 'svelte';

	interface CombinationProps extends CombinationOptions {
		/** Array of keyboard combinations to detect */
		combinations: Parameters<typeof useCombination>[0];
		/** Content to render when combination is detected */
		children?: Snippet;
		/** Function to render content with active combination info */
		activeCombination?: Snippet<[activeCombination: string | null]>;
		/** Time in ms after which to hide content (0 = never hide) */
		hideAfter?: number;
	}

	let {
		children,
		activeCombination,
		combinations,
		hideAfter = 0,
		...options
	}: CombinationProps = $props();

	let isActive = $state(false);
	let activeCombinationShortcut = $state<string | null>(null);
	let timeoutId: ReturnType<typeof setTimeout> | null = $state(null);

	useCombination(
		combinations,
		(_event, shortcut) => {
			isActive = true;
			activeCombinationShortcut = shortcut;

			if (hideAfter > 0) {
				timeoutId = setTimeout(() => {
					isActive = false;
					activeCombinationShortcut = null;
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
	{#if activeCombination}
		{@render activeCombination(activeCombinationShortcut)}
	{:else if children}
		{@render children()}
	{/if}
{/if}
