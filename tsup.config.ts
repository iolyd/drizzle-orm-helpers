import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	treeshake: true,
	outDir: 'dist',
	dts: true,
	// experimentalDts: true,
	sourcemap: true,
	clean: true,
	bundle: true,
	minify: true,
	skipNodeModulesBundle: true,
	target: 'esnext',
});
