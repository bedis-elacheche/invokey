<script lang="ts">
	/**
	 * A component that provides keyboard shortcut scoping functionality.
	 *
	 * @component
	 * @example
	 * ```svelte
	 * <ScopeProvider activeScopes={['grid', 'editor']}>
	 *   <Grid />
	 *   <Editor />
	 * </ScopeProvider>
	 * ```
	 */
	import type { Snippet } from 'svelte';
	import { setScopes } from './store.js';

	interface ScopeProviderProps {
		/** Content to render within the scope context */
		children: Snippet;
		/** Array of active scope names. Defaults to ['*'] for global scope */
		activeScopes?: string[];
	}

	let { children, activeScopes = ['*'] }: ScopeProviderProps = $props();

	$effect(() => {
		setScopes(
			activeScopes.reduce<Record<string, boolean>>(
				(acc, scope) => ({
					...acc,
					[scope]: true
				}),
				{}
			)
		);
	});
</script>

{@render children()}
