import * as esbuild from "esbuild";
import generateBuildSettings from "./settings.mjs";

const settings = generateBuildSettings({
	outfile: "dist/index.mjs",
	minify: true,
	sourcemap: false,
	treeShaking: true,
});

await esbuild.build(settings).catch(() => process.exit(1));
