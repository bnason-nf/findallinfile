// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";
import { before } from "mocha";

suite("Extension Test Suite", () => {
	before(() => {
		vscode.window.showInformationMessage("Start all tests.").then(
			() => {},
			() => {}
		);
	});
});
