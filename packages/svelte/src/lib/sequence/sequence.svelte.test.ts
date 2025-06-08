import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { act, render } from '@testing-library/svelte';

import SequenceTest from './test-components/sequence.test.svelte';
import SequenceDisabledTest from './test-components/sequence.disabled.test.svelte';
import SequenceMultipleTest from './test-components/sequence.multiple.test.svelte';
import SequenceTimeoutTest from './test-components/sequence.timeout.test.svelte';
import SequenceIgnoreModifiersTest from './test-components/sequence.ignoreModifiers.test.svelte';
import SequenceHideTest from './test-components/sequence.hide.test.svelte';

describe('useSequence', () => {
	const user = userEvent.setup();

	it('calls handler on correct sequence', async () => {
		const { getByTestId } = render(SequenceTest);

		await user.keyboard('hello');

		expect(getByTestId('child')).toBeInTheDocument();
	});

	it('does not call handler if not enabled', async () => {
		const { queryByTestId } = render(SequenceDisabledTest);

		await user.keyboard('world');

		expect(queryByTestId('child')).toBeNull();
	});

	it('resets activeKeys if timeout exceeded', async () => {
		const { queryByTestId } = render(SequenceTimeoutTest);

		await user.keyboard('hell');

		await new Promise((resolve) => setTimeout(resolve, 20));

		await user.keyboard('o');

		expect(queryByTestId('child')).toBeNull();
	});

	it('ignores modifier keys if ignoreModifiers is true', async () => {
		const { getByTestId } = render(SequenceIgnoreModifiersTest);

		await user.keyboard('hel{ctrl}l{shift}o');

		expect(getByTestId('child')).toBeInTheDocument();
	});

	it('resets activeKeys if sequence does not match', async () => {
		const { queryByTestId } = render(SequenceTest);

		await user.keyboard('helleo');

		expect(queryByTestId('child')).toBeNull();
	});

	it('matches multiple sequences', async () => {
		const { getByTestId, queryByTestId } = render(SequenceMultipleTest);

		await user.keyboard('hello');

		expect(getByTestId('h>e>l>l>o')).toBeInTheDocument();
		expect(queryByTestId('w>o>r>l>d')).toBeNull();

		await user.keyboard('world');

		expect(getByTestId('w>o>r>l>d')).toBeInTheDocument();
		expect(queryByTestId('h>e>l>l>o')).toBeNull();
	});

	it('hides after timeout', async () => {
		const { getByTestId, queryByTestId } = render(SequenceHideTest);

		await user.keyboard('hello');

		expect(getByTestId('child')).toBeInTheDocument();

		await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

		expect(queryByTestId('child')).toBeNull();
	});

	it('does not call handler if no match', async () => {
		const { queryByTestId } = render(SequenceTest);

		await user.keyboard('nonsense');

		expect(queryByTestId('child')).toBeNull();
	});
});
