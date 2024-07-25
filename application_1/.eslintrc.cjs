module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react/jsx-no-target-blank': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		semi: ['error', 'always', { omitLastInOneLineBlock: false }], // Указывает где я не поставил ";"
		'comma-dangle': ['error', 'never'], // Указывает где есть висячая запятая
		quotes: ['error', 'single'], // Все кавычки превращаем в одинарные
	},
};
