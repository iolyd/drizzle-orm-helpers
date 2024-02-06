import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/primitives.ts', 'src/custom-types.ts', 'src/utilities.ts'],
	outDir: 'dist',
	dts: true,
	sourcemap: true,
	clean: true,
	bundle: true,
});
