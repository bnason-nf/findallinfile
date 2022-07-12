// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";

import { localize } from "./localize";

export class FindResult {
	// Zero based column index for first character
	public readonly columnBegin: number;

	// Zero based column index for last character
	public readonly columnEnd: number;

	// Zero based result index
	public readonly index: number;

	// Zero based file line number
	public readonly line: number;

	// The entire text of the matching line
	public readonly text: string;

	public readonly trimmedText: string;

	public readonly trimmedColumnBegin: number;

	public readonly trimmedColumnEnd: number;

	public constructor(text: string, line: number, columnBegin: number, columnEnd: number, index: number) {
		this.columnBegin = columnBegin;
		this.columnEnd = columnEnd;
		this.index = index;
		this.line = line;
		this.text = text;

		const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("findAllInFile");
		let trimKeepCount: number = config.get("trimKeepCount") ?? 0;
		if (trimKeepCount < 0) {
			trimKeepCount = 0;
		}

		let keepColumnBegin: number = this.columnBegin - trimKeepCount;
		let keepColumnEnd: number = this.columnEnd + trimKeepCount;
		if (keepColumnBegin < 0) {
			keepColumnBegin = 0;
		}
		if (keepColumnEnd > this.text.length) {
			keepColumnEnd = this.text.length;
		}

		this.trimmedText = this.text.substring(keepColumnBegin, keepColumnEnd);
		this.trimmedColumnBegin = this.columnBegin - keepColumnBegin;
		this.trimmedColumnEnd = this.columnEnd - keepColumnBegin;
		if (keepColumnBegin !== 0) {
			this.trimmedText = `…${this.trimmedText}`;
			this.trimmedColumnBegin += 1;
			this.trimmedColumnEnd += 1;
		}
		if (keepColumnEnd !== this.text.length) {
			this.trimmedText = `${this.trimmedText}…`;
		}
	}

	public toMarkdown(): vscode.MarkdownString {
		const markdown: string = localize(
			"find_result_markdown",
			this.index + 1,
			this.line + 1,
			this.columnBegin + 1,
			this.columnEnd,
			this.text
		);

		return new vscode.MarkdownString(markdown);
	}

	public toString(): string {
		return localize("find_result_string", this.index + 1, this.line + 1, this.columnBegin + 1, this.columnEnd, this.text);
	}
}
