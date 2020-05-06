// Copyright 2019 Benbuck Nason

"use strict";

export class FindResult {
	public readonly column: number | undefined;
	public readonly line: number | undefined;
	public readonly text: string;

	// tslint:disable:no-unnecessary-initializer
	public constructor(text: string, line: number | undefined = undefined, column: number | undefined = undefined) {
		this.line = line;
		this.column = column;
		this.text = text;
	}
}
