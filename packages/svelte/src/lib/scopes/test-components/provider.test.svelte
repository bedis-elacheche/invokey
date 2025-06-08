<script lang="ts">
	import ScopeProvider from '../provider.svelte';

	let { activeScopes } = $props();
</script>

<ScopeProvider {activeScopes}>
	<span data-testid="child">child</span>
</ScopeProvider>
