// Copyright 2019 Benbuck Nason

"use strict";

import { localize } from "./localize";

export class FindError {
	public readonly text: string;

	// tslint:disable:no-unnecessary-initializer
	public constructor(text: string) {
		this.text = text;
	}

	public toString(): string {
		return localize("find_error", this.text);
	}
}
