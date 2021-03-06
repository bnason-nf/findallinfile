// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";

import { localize } from "./localize";

export class FindResult {
	// eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
	private static readonly truncateContext: number = 15;

	public readonly columnBegin: number;

	public readonly columnEnd: number;

	public readonly index: number;

	public readonly line: number;

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

		const trimmedTextBegin: number = this.columnBegin - FindResult.truncateContext;
		if (trimmedTextBegin < 0) {
			this.trimmedText = this.text;
			this.trimmedColumnBegin = this.columnBegin;
			this.trimmedColumnEnd = this.columnEnd;
		} else {
			this.trimmedText = `…${this.text.substr(trimmedTextBegin)}`;
			this.trimmedColumnBegin = this.columnBegin - trimmedTextBegin + 1;
			this.trimmedColumnEnd = this.columnEnd - trimmedTextBegin + 1;
		}
	}

	public toMarkdown(): vscode.MarkdownString {
		const markdown: string = localize(
			"find_result_markdown",
			this.index,
			this.line + 1,
			this.columnBegin + 1,
			this.columnEnd,
			this.text
		);

		return new vscode.MarkdownString(markdown);
	}

	public toString(): string {
		return localize("find_result_string", this.index, this.line + 1, this.columnBegin + 1, this.columnEnd, this.text);
	}
}
