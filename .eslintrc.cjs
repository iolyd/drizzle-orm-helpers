module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'eslint-plugin-drizzle'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'curly': ['error', 'all'],
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' },
		],
	},
};
