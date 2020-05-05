// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { IOutput } from "./iOutput";

// Search for all occurrences of a case-sensitive search string within the current file
export function findCase(doc: vscode.TextDocument | undefined, findText: string, output: IOutput): void {
	if (doc === undefined) {
		output.error("No active editor document");

		return;
	}

	output.start(doc, findText, false, true);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = lineText.includes(findText);
		if (found) {
			output.item(lineIndex, lineText);
		}
	}

	output.end();
}

// Search for all occurrences of a case-insensitive search string within the current file
export function findNoCase(doc: vscode.TextDocument | undefined, findText: string, output: IOutput): void {
	if (doc === undefined) {
		output.error("No active editor document");

		return;
	}

	output.start(doc, findText, false, false);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = lineText.toLowerCase().includes(findTextLower);
		if (found) {
			output.item(lineIndex, lineText);
		}
	}

	output.end();
}

// Search for all occurrences of a search regex within the current file
export function findRegex(doc: vscode.TextDocument | undefined, findText: string, output: IOutput): void {
	if (doc === undefined) {
		output.error("No active editor document");

		return;
	}

	output.start(doc, findText, true, true);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findRegExp: RegExp = new RegExp(findText);
	for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
		const line: vscode.TextLine = doc.lineAt(lineIndex);
		const lineText: string = line.text;
		const found: boolean = findRegExp.test(lineText);
		if (found) {
			output.item(lineIndex, lineText);
		}
	}

	output.end();
}
