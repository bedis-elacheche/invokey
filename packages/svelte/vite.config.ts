import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		environment: 'jsdom',
		clearMocks: true,
		include: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.test.{js,ts}'],
		setupFiles: ['./vitest-setup-client.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/**/*.{ts,svelte}'],
			exclude: ['src/lib/index.ts', 'src/lib/**/types.ts', 'src/lib/**/test-components/**'],
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100
			}
		}
	}
});
