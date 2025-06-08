<script lang="ts">
	import Combination from '../combination.svelte';
</script>

<Combination combinations={['ctrl+a', 'ctrl+b']}>
	{#snippet activeCombination(activeCombination)}
		{#if activeCombination}
			<span data-testid={activeCombination}>{activeCombination}</span>
		{/if}
	{/snippet}
</Combination>
