// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

export interface IOutputSink {
	begin(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void;
	end(): void;
	item(text: string, line: number, column: number): void;
	noDocument(): void;
}
