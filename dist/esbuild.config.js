var esbuild = require("esbuild");
// Automatically exclude all node_modules from the bundled version
var nodeExternalsPlugin = require("esbuild-node-externals").nodeExternalsPlugin;
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
//# sourceMappingURL=esbuild.config.js.map
