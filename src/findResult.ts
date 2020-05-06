// Copyright 2019 Benbuck Nason

"use strict";

export class FindResult {
	public readonly line: number | undefined;
	public readonly text: string;

	public constructor(line: number | undefined, text: string) {
		this.line = line;
		this.text = text;
	}
}
