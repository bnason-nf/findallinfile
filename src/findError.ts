// Copyright 2019 Benbuck Nason

"use strict";

export class FindError {
	public readonly text: string;

	// tslint:disable:no-unnecessary-initializer
	public constructor(text: string) {
		this.text = text;
	}

	public toString(): string {
		return `ERROR: ${this.text}`;
	}
}
