// Copyright 2019 Benbuck Nason

import * as Mocha from "mocha";
import * as glob from "glob";
import * as path from "path";
import type { DeepReadonly } from "../../readonly";

export const run = async (): Promise<void> => {
	// Create the mocha test
	const mocha: Mocha = new Mocha({
		color: true,
		ui: "tdd",
	});

	const testsRoot: string = path.resolve(__dirname, "..");

	return new Promise((onComplete, onError) => {
		glob("**/**.test.js", { cwd: testsRoot }, (err: DeepReadonly<Error> | null, files: readonly string[]): void => {
			if (err !== null) {
				onError(err);
				return;
			}

			// Add files to the test suite
			files.forEach((file) => mocha.addFile(path.resolve(testsRoot, file)));

			try {
				// Run the mocha test
				mocha.run((failures: number) => {
					if (failures > 0) {
						onError(new Error(`${failures} tests failed.`));
					} else {
						onComplete();
					}
				});
			} catch (exception: unknown) {
				onError(exception);
			}
		});
	});
};
