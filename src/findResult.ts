// Copyright 2019 Benbuck Nason

"use strict";

export class FindResult {
	public readonly columnBegin: number | undefined;
	public readonly columnEnd: number | undefined;
	public readonly line: number | undefined;
	public readonly text: string;

	// tslint:disable:no-unnecessary-initializer
	public constructor(
		text: string,
		line: number | undefined = undefined,
		columnBegin: number | undefined = undefined,
		columnEnd: number | undefined = undefined
	) {
		this.line = line;
		this.columnBegin = columnBegin;
		this.columnEnd = columnEnd;
		this.text = text;
	}
}
