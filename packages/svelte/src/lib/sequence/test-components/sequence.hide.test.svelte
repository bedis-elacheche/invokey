<script lang="ts">
	import Sequence from '../sequence.svelte';
</script>

<Sequence sequences={'h>e>l>l>o'} hideAfter={20}>
	<span data-testid="child">child</span>
</Sequence>
