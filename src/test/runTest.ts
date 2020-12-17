// Copyright 2019 Benbuck Nason

import * as path from "path";

import { runTests } from "vscode-test";

const main = async(): Promise<void> => {
	try {
		// The folder containing the Extension Manifest package.json passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, "../../");

		// The path to test runner passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, "./suite/index");

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath });
	} catch (err: unknown) {
		// FIX - console.error("Failed to run tests");
		process.exit(1);
	}
};

main().then(
	() => { },
	() => { }
);
