// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";

import { FileReference } from "./fileReference";

export class FindAllInFile {
	private readonly fileRefs: FileReference[] = [];

	public get fileReferences(): FileReference[] { return this.fileRefs; }

	// Search for all occurrences of a case-sensitive search string within the current file
	public findCase(doc: vscode.TextDocument, findText: string): void {
		// Search each line of the document
		const lineCount: number = doc.lineCount;
		for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
			const line: vscode.TextLine = doc.lineAt(lineIndex);
			const lineText: string = line.text;
			const found: boolean = lineText.includes(findText);
			if (found) {
				this.fileRefs.push(new FileReference(lineIndex, lineText));
			}
		}
	}

	// Search for all occurrences of a case-insensitive search string within the current file
	public findNoCase(doc: vscode.TextDocument, findText: string): void {
		// Search each line of the document
		const lineCount: number = doc.lineCount;
		const findTextLower: string = findText.toLowerCase();
		for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
			const line: vscode.TextLine = doc.lineAt(lineIndex);
			const lineText: string = line.text;
			const found: boolean = lineText.toLowerCase().includes(findTextLower);
			if (found) {
				this.fileRefs.push(new FileReference(lineIndex, lineText));
			}
		}
	}

	// Search for all occurrences of a search regex within the current file
	public findRegex(doc: vscode.TextDocument, findText: string): void {
		// Search each line of the document
		const lineCount: number = doc.lineCount;
		const findRegex: RegExp = new RegExp(findText);
		for (let lineIndex: number = 0; lineIndex < lineCount; lineIndex += 1) {
			const line: vscode.TextLine = doc.lineAt(lineIndex);
			const lineText: string = line.text;
			const found: boolean = findRegex.test(lineText);
			if (found) {
				this.fileRefs.push(new FileReference(lineIndex, lineText));
			}
		}
	}
}
