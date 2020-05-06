// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

export interface IOutputSink {
	end(): void;
	errorNoDocument(): void;
	item(lineIndex: number, lineText: string): void;
	start(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void;
}
