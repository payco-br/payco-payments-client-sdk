import * as esbuild from "esbuild";
import generateBuildSettings from "./settings.mjs";

const settings = generateBuildSettings({
	outfile: "www/index.js",
	sourcemap: true,
	banner: {
		js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
	},
});

const ctx = await esbuild.context(settings).catch(() => process.exit(1));

await ctx.watch().catch(() => process.exit(1));

const { host, port } = await ctx
	.serve({
		port: 3000,
		servedir: "www",
		fallback: "www/index.html",
	})
	.catch(() => process.exit(1));

console.log(`Serving app at ${host}:${port}.`);
