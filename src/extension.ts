// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import * as findAllInFile from "./findAllInFile";
import { FindResultsOutput } from "./findResultsOutput";

function getActiveDocument(): vscode.TextDocument | undefined {
	// Make sure there is an active editor window for us to use
	if (vscode.window.activeTextEditor === undefined) {
		return undefined;
	}

	// Get the active document
	return vscode.window.activeTextEditor.document;
}

// Remember most recent searches for easy re-use
let lastFindRegex: string = "";
let lastFindString: string = "";

// Called once on extension init
export function activate(context: vscode.ExtensionContext): void {
	const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("Find All In File");
	const findResultsOutput: FindResultsOutput = new FindResultsOutput(outputChannel);

	// Add command for searching with a regular expression
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregex", () => {
		vscode.window.showInputBox({
			prompt: "Please enter regular expression to search for",
			value: lastFindRegex,
		}).then((findText: string | undefined) => {
			if (findText !== undefined) {
				findAllInFile.findRegex(getActiveDocument(), findText, findResultsOutput);

				lastFindRegex = findText;
			}
		});
	}));

	// Add command for searching with a case-sensitive string
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringcase", () => {
		vscode.window.showInputBox({
			prompt: "Please enter string to search for",
			value: lastFindString,
		}).then((findText: string | undefined) => {
			if (findText !== undefined) {
				findAllInFile.findCase(getActiveDocument(), findText, findResultsOutput);

				lastFindString = findText;
			}
		});
	}));

	// Add command for searching with a case insensitive string
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringnocase", () => {
		vscode.window.showInputBox({
			prompt: "Please enter string to search for",
			value: lastFindString,
		}).then((findText: string | undefined) => {
			if (findText !== undefined) {
				findAllInFile.findNoCase(getActiveDocument(), findText, findResultsOutput);

				lastFindString = findText;
			}
		});
	}));
}

// Called once on extension destroy
export function deactivate(): void {
	// Nothing to do
}
