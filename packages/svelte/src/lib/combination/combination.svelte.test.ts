import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { act, render } from '@testing-library/svelte';

import CombinationTest from './test-components/combination.test.svelte';
import CombinationDisabledTest from './test-components/combination.disabled.test.svelte';
import CombinationMultipleTest from './test-components/combination.multiple.test.svelte';
import CombinationHideTest from './test-components/combination.hide.test.svelte';

describe('useCombination', () => {
	const user = userEvent.setup();

	it('calls handler on correct combination', async () => {
		const { getByTestId } = render(CombinationTest);

		await user.keyboard('{ctrl>}{a}');

		expect(getByTestId('child')).toBeInTheDocument();
	});

	it('does not call handler if not enabled', async () => {
		const { queryByTestId } = render(CombinationDisabledTest);

		await user.keyboard('{ctrl>}{b}');

		expect(queryByTestId('child')).toBeNull();
	});

	it('removes key from activeKeys on keyup', async () => {
		const { queryByTestId } = render(CombinationTest);

		await user.keyboard('{ctrl}{a}');

		expect(queryByTestId('child')).toBeNull();
	});

	it('matches multiple combinations', async () => {
		const { getByTestId } = render(CombinationMultipleTest);

		await user.keyboard('{ctrl>}{a}');

		expect(getByTestId('ctrl+a')).toBeInTheDocument();

		await user.keyboard('{ctrl>}{b}');

		expect(getByTestId('ctrl+b')).toBeInTheDocument();
	});

	it('hides after timeout', async () => {
		const { getByTestId, queryByTestId } = render(CombinationHideTest);

		await user.keyboard('{ctrl>}{a}');

		expect(getByTestId('child')).toBeInTheDocument();

		await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

		expect(queryByTestId('child')).toBeNull();
	});
	it('does not call handler if no match', async () => {
		const { queryByTestId } = render(CombinationTest);

		await user.keyboard('{x}{y}');

		expect(queryByTestId('child')).toBeNull();
	});
});
