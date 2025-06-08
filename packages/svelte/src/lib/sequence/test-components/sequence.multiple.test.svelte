<script lang="ts">
	import Sequence from '../sequence.svelte';
</script>

<Sequence sequences={['h>e>l>l>o', 'w>o>r>l>d']}>
	{#snippet activeSequence(activeSequence)}
		{#if activeSequence}
			<span data-testid={activeSequence}>{activeSequence}</span>
		{/if}
	{/snippet}
</Sequence>
