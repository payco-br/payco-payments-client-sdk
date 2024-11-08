import esbuild from "esbuild";

buildAll();

async function buildAll() {
	return Promise.all([
		build("script", {
			platform: "browser",
			minify: true,
			target: ["es6"],
		}),
		build("esm", {
			platform: "neutral",
			minify: true,
			external: ["axios", "cpf-cnpj-validator", "jose", "valibot"],
		}),
		build("cjs", {
			target: ["node18"],
			minify: true,
			platform: "node",
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
	const path = `${name}.js`;
	console.log(`Building ${name}`);

	if (process.argv.includes("--watch")) {
		const ctx = await esbuild.context({
			entryPoints: ["./src/index.ts"],
			outfile: `./dist/${path}`,
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
			outfile: `./dist/${path}`,
			bundle: true,
			...options,
		});
	}
}
