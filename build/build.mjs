import esbuild from "esbuild";

buildAll();

async function buildAll() {
	return Promise.all([
		build("script", {
			format: "iife",
			platform: "browser",
			minify: true,
			target: ["es6"],
			outfile: "./dist/script.js",
		}),
		build("esm", {
			format: "esm",
			platform: "neutral",
			minify: true,
			outdir: "dist",
			outExtension: { ".js": ".mjs" },
			external: ["axios", "cpf-cnpj-validator", "jose", "valibot"],
		}),
		build("cjs", {
			format: "cjs",
			platform: "node",
			minify: true,
			target: ["node18"],
			outdir: "dist",
			external: ["axios", "cpf-cnpj-validator", "jose", "valibot"],
		}),
	]);
}

/**
 *
 * @param {"script" | "esm" | "cjs"} name bundle name
 * @param {import("esbuild").BuildOptions} options additional bundler options
 * @returns
 */
async function build(name, options) {
	console.log(`Building ${name}`);

	if (process.argv.includes("--watch")) {
		const ctx = await esbuild.context({
			entryPoints: ["./src/index.ts"],
			bundle: true,
			logLevel: "info",
			sourcemap: true,
			...options,
			minify: false,
		});
		await ctx.watch();
	} else {
		return esbuild.build({
			entryPoints: ["./src/index.ts"],
			bundle: true,
			...options,
		});
	}
}
