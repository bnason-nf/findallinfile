// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

class FileReference {
	public readonly lineIndex: number;
	public readonly lineText: string;

	public constructor(lineIndex: number, lineText: string) {
		this.lineIndex = lineIndex;
		this.lineText = lineText;
	}
}

function getActiveDocument(): vscode.TextDocument | undefined {
	// Make sure there is an active editor window for us to use
	if (vscode.window.activeTextEditor === undefined) {
		return undefined;
	}

	// Get the active document
	return vscode.window.activeTextEditor.document;
}

// Search for all occurrences of a search string within the current file
function findAllInFile(doc: vscode.TextDocument, findText: string, useRegex: boolean): FileReference[] {
	const fileRefs: FileReference[] = [];

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findRegex: RegExp | undefined = useRegex ? new RegExp(findText) : undefined;
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = (findRegex === undefined) ? lineText.includes(findText) : findRegex.test(lineText);
		if (found) {
			fileRefs.push(new FileReference(lineIndex, lineText));
		}
	}

	return fileRefs;
}

// Output all occurrences of a search string within the current file
function outputAllInFile(findText: string, useRegex: boolean): void {
	// Create and use an output channel for the results
	const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("Find All In File");
	outputChannel.show();

	// Get the active document
	const doc: vscode.TextDocument | undefined = getActiveDocument();
	if (doc === undefined) {
		outputChannel.appendLine("No active editor document");

		return;
	}

	// Print initial status message
	outputChannel.appendLine(`Searching for ${useRegex ? "regex" : "string"} "${findText}" in "${doc.fileName}":`);

	const fileRefs: FileReference[] = findAllInFile(doc, findText, useRegex);

	fileRefs.forEach((fileRef: FileReference) => {
		// Print matching line
		outputChannel.appendLine(`line ${fileRef.lineIndex}: ${fileRef.lineText}`);
	});

	// Print summary
	outputChannel.appendLine(`Found ${fileRefs.length} occurrences`);
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
				outputAllInFile(findText, true);

				lastFindRegex = findText;
			}
		});
	}));

	// Add command for searching with a string
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstring", () => {
		vscode.window.showInputBox({
			prompt: "Please enter string to search for",
			value: lastFindString,
		}).then((findText: string | undefined) => {
			if (findText !== undefined) {
				outputAllInFile(findText, false);

				lastFindString = findText;
			}
		});
	}));
}

// Called once on extension destroy
export function deactivate(): void {
	// Nothing to do
}
