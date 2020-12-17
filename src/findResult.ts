// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";

import { localize } from "./localize";

export class FindResult {
	public readonly columnBegin: number;

	public readonly columnEnd: number;

	public readonly index: number;

	public readonly line: number;

	public readonly text: string;

	public constructor(
		text: string,
		line: number,
		columnBegin: number,
		columnEnd: number,
		index: number
	) {
		this.columnBegin = columnBegin;
		this.columnEnd = columnEnd;
		this.index = index;
		this.line = line;
		this.text = text;
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
		return localize(
			"find_result_string",
			this.index,
			this.line + 1,
			this.columnBegin + 1,
			this.columnEnd,
			this.text
		);
	}
}
