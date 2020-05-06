// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { FindResult } from "./findResult";

export interface IOutputSink {
	begin(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void;
	end(): void;
	item(findResult: FindResult): void;
	noDocument(): void;
}
