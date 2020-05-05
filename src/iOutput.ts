// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

export interface IOutput {
	end(): void;
	error(msg: string): void;
	item(lineIndex: number, lineText: string): void;
	start(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void;
}
