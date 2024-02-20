import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/index.ts', './src/pg/index.ts', './src/mysql/index.ts', './src/sqlite/index.ts'],
	format: ['cjs', 'esm'],
	treeshake: true,
	outDir: 'dist',
	dts: true,
	sourcemap: true,
	clean: true,
	bundle: true,
	minify: true,
	skipNodeModulesBundle: true,
	target: 'esnext',
});
