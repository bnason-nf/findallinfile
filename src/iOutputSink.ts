// Copyright 2019 Benbuck Nason

import type * as vscode from "vscode";

import type { DeepReadonly } from "./readonly";
import type { FindResult } from "./findResult";

export interface IOutputSink {
	begin: (
		doc: DeepReadonly<vscode.TextDocument>,
		findText: string,
		useRegex: boolean,
		caseSensitive: boolean,
		wholeWord: boolean
	) => void;
	end: () => void;
	item: (findResult: Readonly<FindResult>) => void;
	noDocument: () => void;
	regexFailure: (e: string) => void;
}
