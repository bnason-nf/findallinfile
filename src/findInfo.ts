// Copyright 2019 Benbuck Nason
export class FindInfo {
	public readonly text: string;

	public constructor(text: string) {
		this.text = text;
	}

	public toString(): string {
		return this.text;
	}
}
