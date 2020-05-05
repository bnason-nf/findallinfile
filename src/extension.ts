// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { FileReference } from "./fileReference";
import { FindAllInFile } from "./findAllInFile";

// Output all occurrences of a search string within the current file
function outputAllInFile(findText: string, useRegex: boolean, caseSensitive: boolean): void {
	// Create and use an output channel for the results
	const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("Find All In File");
	outputChannel.show();

	// Get the active document
	const doc: vscode.TextDocument | undefined = (vscode.window.activeTextEditor === undefined) ? undefined :
		vscode.window.activeTextEditor.document;
	if (doc === undefined) {
		outputChannel.appendLine("No active editor document");

		return;
	}

	// Print initial status message
	outputChannel.appendLine(`Searching for ${useRegex ? "regex" : caseSensitive ?
		"case-sensitive string" : "case-insensitive string"} "${findText}" in "${doc.fileName}":`);

	const findAllInFile: FindAllInFile = new FindAllInFile();

	if (useRegex) {
		findAllInFile.findRegex(doc, findText);
	} else if (caseSensitive) {
		findAllInFile.findCase(doc, findText);
	} else {
		findAllInFile.findNoCase(doc, findText);
	}

	findAllInFile.fileReferences.forEach((fileRef: FileReference) => {
		// Print matching line
		outputChannel.appendLine(`line ${fileRef.lineIndex}: ${fileRef.lineText}`);
	});

	// Print summary
	outputChannel.appendLine(`Found ${findAllInFile.fileReferences.length} occurrences`);
}

// Remember most recent searches for easy re-use
let lastFindRegex: string = "";
let lastFindString: string = "";

// Called once on extension init
export function activate(context: vscode.ExtensionContext): void {
	// Add command for searching with a regular expression
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregex", () => {
		vscode.window.showInputBox({
			prompt: "Please enter regular expression to search for",
			value: lastFindRegex,
		}).then((findText: string | undefined) => {
			if (findText !== undefined) {
				outputAllInFile(findText, true, true);

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
				outputAllInFile(findText, false, true);

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
				outputAllInFile(findText, false, false);

				lastFindString = findText;
			}
		});
	}));
}

// Called once on extension destroy
export function deactivate(): void {
	// Nothing to do
}
