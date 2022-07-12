// Copyright 2019 Benbuck Nason

import type { TextDocument, TextLine } from "vscode";
import type { DeepReadonly } from "./readonly";
import { FindResult } from "./findResult";
import type { IOutputSink } from "./iOutputSink";

let resultLimit: number = Number.MAX_SAFE_INTEGER;

export const setResultLimit = (limit: number): void => {
	resultLimit = limit;
};

const isWord = (text: string, start: number, end: number): boolean => {
	if (start > 0) {
		const startChar: string = text.charAt(start - 1);
		if (/\W/u.exec(startChar) === null) {
			return false;
		}
	}

	if (end < text.length) {
		const endChar: string = text.charAt(end);
		if (/\W/u.exec(endChar) === null) {
			return false;
		}
	}

	return true;
};

// Search for all occurrences of a case sensitive search string within the current file
export const findStringCase = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, true, false);

	// Search each line of the document
	let findCount: number = 0;
	const lineCount: number = doc.lineCount;
	for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
		const textLine: TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text;
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findText);
			if (tmpColumn < 0) {
				break;
			}

			findCount += 1;
			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			outputSink.item(new FindResult(text, line, columnBegin, columnEnd, findCount));
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;

			if (findCount >= resultLimit) {
				break;
			}
		}
	}

	outputSink.end();
};

// Search for all occurrences of a case sensitive search string word within the current file
export const findStringCaseWord = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, true, true);

	// Search each line of the document
	let findCount: number = 0;
	const lineCount: number = doc.lineCount;
	for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
		const textLine: TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text;
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findText);
			if (tmpColumn < 0) {
				break;
			}

			findCount += 1;
			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			if (isWord(text, columnBegin, columnEnd)) {
				outputSink.item(new FindResult(text, line, columnBegin, columnEnd, findCount));
			}
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;

			if (findCount >= resultLimit) {
				break;
			}
		}
	}

	outputSink.end();
};

// Search for all occurrences of a case insensitive search string within the current file
export const findStringNoCase = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, false, false);

	// Search each line of the document
	let findCount: number = 0;
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
		const textLine: TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text.toLowerCase();
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findTextLower);
			if (tmpColumn < 0) {
				break;
			}

			findCount += 1;
			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			outputSink.item(new FindResult(text, line, columnBegin, columnEnd, findCount));
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;

			if (findCount >= resultLimit) {
				break;
			}
		}
	}

	outputSink.end();
};

// Search for all occurrences of a case insensitive search string word within the current file
export const findStringNoCaseWord = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	outputSink.begin(doc, findText, false, false, true);

	// Search each line of the document
	let findCount: number = 0;
	const lineCount: number = doc.lineCount;
	const findTextLower: string = findText.toLowerCase();
	for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
		const textLine: TextLine = doc.lineAt(line);
		const text: string = textLine.text;
		let tmpText: string = text.toLowerCase();
		let column: number = 0;
		// Search for all the instances within each line
		while (tmpText !== "") {
			const tmpColumn: number = tmpText.indexOf(findTextLower);
			if (tmpColumn < 0) {
				break;
			}

			findCount += 1;
			const columnBegin: number = column + tmpColumn;
			const columnEnd: number = column + tmpColumn + findText.length;
			if (isWord(text, columnBegin, columnEnd)) {
				outputSink.item(new FindResult(text, line, columnBegin, columnEnd, findCount));
			}
			tmpText = tmpText.substr(tmpColumn + findText.length);

			column = columnEnd;

			if (findCount >= resultLimit) {
				break;
			}
		}
	}

	outputSink.end();
};

// Search for all occurrences of a case sensitive search regex within the current file
export const findRegexCase = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "gu");

		outputSink.begin(doc, findText, true, true, false);

		// Search each line of the document
		let findCount: number = 0;
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
			const textLine: TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			for (let match: RegExpExecArray | null = findRegExp.exec(text); match !== null; match = findRegExp.exec(text)) {
				findCount += 1;
				outputSink.item(new FindResult(text, line, match.index, findRegExp.lastIndex, findCount));

				if (findCount >= resultLimit) {
					break;
				}
			}
		}

		outputSink.end();
	} catch (exception: unknown) {
		if (typeof exception === "string") {
			outputSink.regexFailure(exception);
		} else {
			outputSink.regexFailure(JSON.stringify(exception));
		}
	}
};

// Search for all occurrences of a case sensitive search regex within the current file
export const findRegexCaseWord = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "gu");

		outputSink.begin(doc, findText, true, true, true);

		// Search each line of the document
		let findCount: number = 0;
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
			const textLine: TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			for (let match: RegExpExecArray | null = findRegExp.exec(text); match !== null; match = findRegExp.exec(text)) {
				if (isWord(text, match.index, findRegExp.lastIndex)) {
					findCount += 1;
					outputSink.item(new FindResult(text, line, match.index, findRegExp.lastIndex, findCount));

					if (findCount >= resultLimit) {
						break;
					}
				}
			}
		}

		outputSink.end();
	} catch (exception: unknown) {
		if (typeof exception === "string") {
			outputSink.regexFailure(exception);
		} else {
			outputSink.regexFailure(JSON.stringify(exception));
		}
	}
};

// Search for all occurrences of a case insensitive search regex within the current file
export const findRegexNoCase = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "giu");

		outputSink.begin(doc, findText, true, false, false);

		// Search each line of the document
		let findCount: number = 0;
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
			const textLine: TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			for (let match: RegExpExecArray | null = findRegExp.exec(text); match !== null; match = findRegExp.exec(text)) {
				findCount += 1;
				outputSink.item(new FindResult(text, line, match.index, findRegExp.lastIndex, findCount));

				if (findCount >= resultLimit) {
					break;
				}
			}
		}

		outputSink.end();
	} catch (exception: unknown) {
		if (typeof exception === "string") {
			outputSink.regexFailure(exception);
		} else {
			outputSink.regexFailure(JSON.stringify(exception));
		}
	}
};

// Search for all occurrences of a case insensitive search regex within the current file
export const findRegexNoCaseWord = (
	doc: DeepReadonly<TextDocument> | undefined,
	findText: string,
	outputSink: Readonly<IOutputSink>
): void => {
	if (typeof doc === "undefined") {
		outputSink.noDocument();

		return;
	}

	try {
		const findRegExp: RegExp = new RegExp(findText, "giu");

		outputSink.begin(doc, findText, true, false, true);

		// Search each line of the document
		let findCount: number = 0;
		const lineCount: number = doc.lineCount;
		for (let line: number = 0; line < lineCount && findCount < resultLimit; line += 1) {
			const textLine: TextLine = doc.lineAt(line);
			const text: string = textLine.text;
			// Search for all the instances within each line
			for (let match: RegExpExecArray | null = findRegExp.exec(text); match !== null; match = findRegExp.exec(text)) {
				if (isWord(text, match.index, findRegExp.lastIndex)) {
					findCount += 1;
					outputSink.item(new FindResult(text, line, match.index, findRegExp.lastIndex, findCount));

					if (findCount >= resultLimit) {
						break;
					}
				}
			}
		}

		outputSink.end();
	} catch (exception: unknown) {
		if (typeof exception === "string") {
			outputSink.regexFailure(exception);
		} else {
			outputSink.regexFailure(JSON.stringify(exception));
		}
	}
};
