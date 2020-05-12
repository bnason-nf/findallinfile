// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { FindResult } from "./findResult";
import { IOutputSink } from "./iOutputSink";

function isWord(text: string, start: number, end: number): boolean {
	if (start > 0) {
		const startChar: string = text.charAt(start - 1);
		if (startChar.match(/\W/) === null) {
			return false;
		}
	}

	if (end < text.length) {
		const endChar: string = text.charAt(end);
		if (endChar.match(/\W/) === null) {
			return false;
		}
	}

	return true;
}

// Search for all occurrences of a case sensitive search string within the current file
export function findStringCase(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, true, false);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	for (let line: number = 0; line < lineCount; line += 1) {
		const textLine: vscode.TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text;
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findText);
			if (tmpColumn < 0) {
				break;
			}

			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			outputSink.item(new FindResult(text, line, columnBegin, columnEnd));
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;
		}
	}

	outputSink.end();
}

// Search for all occurrences of a case sensitive search string word within the current file
export function findStringCaseWord(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, true, true);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	for (let line: number = 0; line < lineCount; line += 1) {
		const textLine: vscode.TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text;
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findText);
			if (tmpColumn < 0) {
				break;
			}

			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			if (isWord(text, columnBegin, columnEnd)) {
				outputSink.item(new FindResult(text, line, columnBegin, columnEnd));
			}
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;
		}
	}

	outputSink.end();
}

// Search for all occurrences of a case insensitive search string within the current file
export function findStringNoCase(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, false, false);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let line: number = 0; line < lineCount; line += 1) {
		const textLine: vscode.TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text.toLowerCase();
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findTextLower);
			if (tmpColumn < 0) {
				break;
			}

			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			outputSink.item(new FindResult(text, line, columnBegin, columnEnd));
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;
		}
	}

	outputSink.end();
}

// Search for all occurrences of a case insensitive search string word within the current file
export function findStringNoCaseWord(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, false, true);

	// Search each line of the document
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let line: number = 0; line < lineCount; line += 1) {
		const textLine: vscode.TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text.toLowerCase();
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findTextLower);
			if (tmpColumn < 0) {
				break;
			}

			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			if (isWord(text, columnBegin, columnEnd)) {
				outputSink.item(new FindResult(text, line, columnBegin, columnEnd));
			}
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;
		}
	}

	outputSink.end();
}

// Search for all occurrences of a case sensitive search regex within the current file
export function findRegexCase(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "g");

		outputSink.begin(doc, findText, true, true, false);

		// Search each line of the document
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount; line += 1) {
			const textLine: vscode.TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			while (true) {
				const match: RegExpExecArray | null = findRegExp.exec(text);
				if (match === null) {
					break;
				}
				outputSink.item(
					new FindResult(text, line, match.index, findRegExp.lastIndex)
				);
			}
		}

		outputSink.end();
	} catch (e) {
		// tslint:disable:no-unsafe-any
		outputSink.regexFailure(e);
	}
}

// Search for all occurrences of a case sensitive search regex within the current file
export function findRegexCaseWord(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "g");

		outputSink.begin(doc, findText, true, true, true);

		// Search each line of the document
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount; line += 1) {
			const textLine: vscode.TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			while (true) {
				const match: RegExpExecArray | null = findRegExp.exec(text);
				if (match === null) {
					break;
				}
				if (isWord(text, match.index, findRegExp.lastIndex)) {
					outputSink.item(
						new FindResult(text, line, match.index, findRegExp.lastIndex)
					);
				}
			}
		}

		outputSink.end();
	} catch (e) {
		// tslint:disable:no-unsafe-any
		outputSink.regexFailure(e);
	}
}

// Search for all occurrences of a case insensitive search regex within the current file
export function findRegexNoCase(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "gi");

		outputSink.begin(doc, findText, true, false, false);

		// Search each line of the document
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount; line += 1) {
			const textLine: vscode.TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			while (true) {
				const match: RegExpExecArray | null = findRegExp.exec(text);
				if (match === null) {
					break;
				}
				outputSink.item(
					new FindResult(text, line, match.index, findRegExp.lastIndex)
				);
			}
		}

		outputSink.end();
	} catch (e) {
		// tslint:disable:no-unsafe-any
		outputSink.regexFailure(e);
	}
}

// Search for all occurrences of a case insensitive search regex within the current file
export function findRegexNoCaseWord(
	doc: vscode.TextDocument | undefined,
	findText: string,
	outputSink: IOutputSink
): void {
	if (doc === undefined) {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "gi");

		outputSink.begin(doc, findText, true, false, true);

		// Search each line of the document
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount; line += 1) {
			const textLine: vscode.TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			while (true) {
				const match: RegExpExecArray | null = findRegExp.exec(text);
				if (match === null) {
					break;
				}
				if (isWord(text, match.index, findRegExp.lastIndex)) {
					outputSink.item(
						new FindResult(text, line, match.index, findRegExp.lastIndex)
					);
				}
			}
		}

		outputSink.end();
	} catch (e) {
		// tslint:disable:no-unsafe-any
		outputSink.regexFailure(e);
	}
}
