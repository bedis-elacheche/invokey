<script lang="ts">
	import Sequence from '../sequence.svelte';
</script>

<Sequence sequences={'h>e>l>l>o'} timeout={2}>
	<span data-testid="child">child</span>
</Sequence>
