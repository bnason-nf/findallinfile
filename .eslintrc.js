// Copyright 2019 Benbuck Nason

module.exports = {
	env: {
		"node": true
	},
	extends: ["eslint:all", "plugin:@typescript-eslint/all"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 6,
		project: "tsconfig.json",
		sourceType: "module"
	},
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
		"@typescript-eslint/no-extra-parens": ["error", "functions"],
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-magic-numbers": ["error", { "ignore": [0, 1] }],
		"@typescript-eslint/space-before-function-paren": ["error", "never"],
		"array-element-newline": ["error", "consistent"],
		"function-call-argument-newline": ["error", "consistent"],
		"indent": ["error", "tab"],
		"max-depth": ["error", { "max": 5 }],
		"max-len": ["error", { "code": 128 }],
		"max-lines": ["error", { "max": 512 }],
		"max-params": ["error", { "max": 5 }],
		"max-statements": ["error", { "max": 32 }],
		"multiline-ternary": ["error", "always-multiline"],
		"no-extra-parens": ["error", "functions"],
		"no-magic-numbers": ["error", { "ignore": [0, 1] }],
		"no-tabs": ["error", { "allowIndentationTabs": true }],
		"no-ternary": "off",
		"object-curly-spacing": ["error", "always"],
		"object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
		"one-var": ["error", "never"],
		"padded-blocks": ["error", "never"],
		"prefer-destructuring": "off",
		"quote-props": ["error", "consistent"],
		"space-before-function-paren": ["error", "never"]
	}
};
