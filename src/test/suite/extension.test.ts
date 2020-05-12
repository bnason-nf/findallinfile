// TMP import * as assert from "assert";

import { before } from "mocha";
import * as vscode from "vscode";

// EXAMPLE: import * as myExtension from "../extension";

suite("Extension Test Suite", () => {
	before(async () => {
		vscode.window.showInformationMessage("Start all tests.");
	});

	// TMP test("Sample test", () => {
	// TMP 	assert.strictEqual(-1, [1, 2, 3].indexOf(5));
	// TMP 	assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	// TMP });
});
