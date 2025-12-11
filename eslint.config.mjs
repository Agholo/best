import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
	{
		rules: {
			indent: ["error", "tab", { SwitchCase: 1 }],
			"no-mixed-spaces-and-tabs": "error",
			"no-trailing-spaces": "error",
			"no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
		},
	},
]);

export default eslintConfig;
