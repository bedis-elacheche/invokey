<script lang="ts">
	import Combination from '../combination.svelte';
</script>

<Combination combinations={'ctrl+a'} hideAfter={50}>
	<span data-testid="child">child</span>
</Combination>
