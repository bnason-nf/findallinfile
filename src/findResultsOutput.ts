// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { IOutput } from "./iOutput";

export class FindResultsOutput implements IOutput {
	private itemCount: number;
	private readonly outputChannel: vscode.OutputChannel;

	public constructor(outputChannel: vscode.OutputChannel) {
		this.itemCount = 0;
		this.outputChannel = outputChannel;
	}

	public end(): void {
		this.outputChannel.appendLine(`Found ${this.itemCount} occurrences`);
		this.outputChannel.appendLine("");
	}

	public error(msg: string): void {
		this.outputChannel.appendLine(msg);
	}

	public item(lineIndex: number, lineText: string): void {
		this.itemCount += 1;
		this.outputChannel.appendLine(`line ${lineIndex}: ${lineText}`);
	}

	public start(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void {
		this.outputChannel.show();
		this.itemCount = 0;

		this.outputChannel.appendLine(`Searching for ${useRegex ? "regex" : caseSensitive ?
			"case-sensitive string" : "case-insensitive string"} "${findText}" in "${doc.fileName}":`);
	}
}
