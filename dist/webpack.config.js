var path = require("path");
module.exports = {
	entry: "./src/lib.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		library: "SDK",
		libraryTarget: "umd",
	},
	mode: "production",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "swc-loader",
				},
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
};
//# sourceMappingURL=webpack.config.js.map
