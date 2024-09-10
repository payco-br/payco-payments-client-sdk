/**
 * @param {import("esbuild").BuildOptions} options additional build options
 * @returns {import("esbuild").BuildOptions}
 */
export default function generateBuildSettings(options) {
	return {
		entryPoints: ["./src/index.ts"],
		bundle: true,
		format: "esm",
		target: ["chrome60", "firefox60", "safari11", "edge18"],
		...options,
	};
}
