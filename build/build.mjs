import esbuild from "esbuild";
import envFilePlugin from "esbuild-envfile-plugin";

buildAll();

async function buildAll() {
	return Promise.all([
		build("script", {
			format: "esm",
			platform: "browser",
			target: ["es6"],
			outdir: undefined,
			outfile: "./dist/script.js",
		}),
		build("esm", {
			format: "esm",
			platform: "neutral",
			outExtension: { ".js": ".mjs" },
			external: ["axios", "cpf-cnpj-validator", "jose", "valibot"],
		}),
		build("cjs", {
			format: "cjs",
			platform: "node",
			target: ["node18"],
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
			outdir: "dist",
			bundle: true,
			logLevel: "info",
			sourcemap: true,
			minify: false,
			plugins: [envFilePlugin],
			...options,
		});
		await ctx.watch();
	} else {
		return esbuild.build({
			entryPoints: ["./src/index.ts"],
			outdir: "dist",
			bundle: true,
			minify: true,
			plugins: [envFilePlugin],
			...options,
		});
	}
}
