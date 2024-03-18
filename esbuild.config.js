const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
	.build({
		entryPoints: ["./src/lib.ts"],
		outfile: "lib/index.js",
		bundle: true,
		sourcemap: true,
		format: "iife",
		globalName: "SDK",
		target: ["chrome60", "firefox60", "safari11", "edge18"],
		plugins: [nodeExternalsPlugin()],
	})
	.catch(() => process.exit(1));
