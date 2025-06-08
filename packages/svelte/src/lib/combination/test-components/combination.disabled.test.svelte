<script lang="ts">
	import Combination from '../combination.svelte';
</script>

<Combination combinations={['ctrl+b']} enabled={false}>
	<span data-testid="child">child</span>
</Combination>
