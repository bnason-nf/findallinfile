// Copyright 2019 Benbuck Nason

"use strict";

export class FileReference {
	public readonly lineIndex: number;
	public readonly lineText: string;
	public constructor(lineIndex: number, lineText: string) {
		this.lineIndex = lineIndex;
		this.lineText = lineText;
	}
}
