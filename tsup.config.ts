import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	// entry: ['src/primitives.ts', 'src/custom-types.ts', 'src/utilities.ts'],
	format: ['cjs', 'esm'],
	splitting: true,
	treeshake: true,
	outDir: 'dist',
	// dts: true,
	experimentalDts: true,
	sourcemap: true,
	clean: true,
	bundle: true,
	minify: true,
	skipNodeModulesBundle: true,
	target: 'esnext',
});
