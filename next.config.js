/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [{ hostname: "utfs.io" }],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		serverComponentsExternalPackages: ["pino", "pino-pretty"],
	},
};

export default config;
