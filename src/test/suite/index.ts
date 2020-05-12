import * as glob from "glob";
import * as Mocha from "mocha";
import * as path from "path";

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha: Mocha = new Mocha({
		ui: "tdd",
	});
	mocha.useColors(true);

	const testsRoot: string = path.resolve(__dirname, "..");

	return new Promise((c, e) => {
		glob("**/**.test.js", { cwd: testsRoot }, (err: Error | null, files: string[]) => {
			if (err !== null) {
				return e(err);
			}

			// Add files to the test suite
			files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

			try {
				// Run the mocha test
				mocha.run((failures: number) => {
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				e(err);
			}
		});
	});
}
