import { defineWorkspace } from "vitest/config";

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
	{
		// add "extends" to merge two configs together
		extends: "./vite.config.js",
		test: {
			include: ["tests/**/*.unit.test.{ts,js}"],
			// it is recommended to define a name when using inline configs
			name: "unit",
		},
	},
	{
		// add "extends" to merge two configs together
		extends: "./vite.config.js",
		test: {
			include: ["tests/**/*.interation.test.{ts,js}"],
			name: "interation",
		},
	},
]);
