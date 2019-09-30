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

// Search for all occurrences of a search regex within the current file
function findAllInFileRegex(doc: vscode.TextDocument, findText: string): FileReference[] {
	const fileRefs: FileReference[] = [];

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findRegex: RegExp = new RegExp(findText);
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = findRegex.test(lineText);
		if (found) {
			fileRefs.push(new FileReference(lineIndex, lineText));
		}
	}

	return fileRefs;
}

// Search for all occurrences of a case-sensitive search string within the current file
function findAllInFileCase(doc: vscode.TextDocument, findText: string): FileReference[] {
	const fileRefs: FileReference[] = [];

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = lineText.includes(findText);
		if (found) {
			fileRefs.push(new FileReference(lineIndex, lineText));
		}
	}

	return fileRefs;
}

// Search for all occurrences of a case-insensitive search string within the current file
function findAllInFileNoCase(doc: vscode.TextDocument, findText: string): FileReference[] {
	const fileRefs: FileReference[] = [];

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = lineText.toLowerCase().includes(findTextLower);
		if (found) {
			fileRefs.push(new FileReference(lineIndex, lineText));
		}
	}

	return fileRefs;
}

// Output all occurrences of a search string within the current file
function outputAllInFile(findText: string, useRegex: boolean, caseSensitive: boolean): void {
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
	outputChannel.appendLine(`Searching for ${useRegex ? "regex" : caseSensitive ?
		"case-sensitive string" : "case-insensitive string"} "${findText}" in "${doc.fileName}":`);

	const fileRefs: FileReference[] = (useRegex ? findAllInFileRegex(doc, findText) :
		(caseSensitive ? findAllInFileCase(doc, findText) : findAllInFileNoCase(doc, findText)));

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
