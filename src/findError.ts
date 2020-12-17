// Copyright 2019 Benbuck Nason

import { localize } from "./localize";

export class FindError {
	public readonly text: string;

	public constructor(text: string) {
		this.text = text;
	}

	public toString(): string {
		return localize("find_error", this.text);
	}
}
