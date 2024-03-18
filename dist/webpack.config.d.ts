export let entry: string;
export namespace output {
	let path: string;
	let filename: string;
	let library: string;
	let libraryTarget: string;
}
export let mode: string;
export let devtool: string;
export namespace module {
	let rules: (
		| {
				test: RegExp;
				exclude: RegExp;
				use: {
					loader: string;
				};
		  }
		| {
				test: RegExp;
				use: string;
				exclude: RegExp;
		  }
	)[];
}
export namespace resolve {
	let extensions: string[];
}
