module.exports = {
	plugins: ["@typescript-eslint", "jest"],
	extends: [
		"react-app",
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"google",
		"prettier",
		"plugin:prettier/recommended",
	],
	env: { node: true, browser: true, jest: true },
	rules: {
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/no-floating-promises": 2,
		"@typescript-eslint/no-empty-interface": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"no-unused-vars": 0,
		"@typescript-eslint/no-unused-vars": 2,
		"@typescript-eslint/no-use-before-define": 0,
		"global-require": 2,
		"new-cap": 0,
		"no-async-promise-executor": 0,
		"no-invalid-this": 0,
		"require-jsdoc": 0,
	},
	parserOptions: {
		project: "./tsconfig.json",
	},
}
