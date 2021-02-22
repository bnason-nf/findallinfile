// Copyright 2019 Benbuck Nason

import type { Memento } from "vscode";

// Remember most recent searches for easy re-use
export class SearchHistory {
	private regexHistory: string[] = [];

	private stringHistory: string[] = [];

	private readonly memento: Readonly<Memento>;

	private readonly historyLimit: number;

	private readonly defaultTextCallback: () => string | undefined;

	public constructor(memento: Readonly<Memento>, historyLimit: number, defaultTextCallback: () => string | undefined) {
		this.memento = memento;
		this.historyLimit = historyLimit;
		this.defaultTextCallback = defaultTextCallback;

		const regexHistory: string[] | undefined = this.memento.get<string[]>("regexHistory");
		if (regexHistory) {
			this.regexHistory = regexHistory;
			this.trimRegexHistory();
		}

		const stringHistory: string[] | undefined = this.memento.get<string[]>("stringHistory");
		if (stringHistory) {
			this.stringHistory = stringHistory;
			this.trimStringHistory();
		}
	}

	public defaultFindRegexes(): string[] {
		let findRegexes: string[] = [];
		const defaultText: string | undefined = this.defaultTextCallback();
		findRegexes.push(typeof defaultText === "string" ? defaultText : "");
		findRegexes = findRegexes.concat(this.regexHistory);
		return findRegexes;
	}

	public defaultFindStrings(): string[] {
		let findStrings: string[] = [];
		const defaultText: string | undefined = this.defaultTextCallback();
		findStrings.push(typeof defaultText === "string" ? defaultText : "");
		findStrings = findStrings.concat(this.stringHistory);
		return findStrings;
	}

	public addFindRegex(regex: string): void {
		this.regexHistory = this.regexHistory.filter((historyRegex) => regex !== historyRegex);
		this.regexHistory.unshift(regex);
		this.trimRegexHistory();
		this.memento.update("regexHistory", this.regexHistory).then(
			() => {},
			() => {}
		);
	}

	public addFindString(string: string): void {
		this.stringHistory = this.stringHistory.filter((historyString) => string !== historyString);
		this.stringHistory.unshift(string);
		this.trimStringHistory();
		this.memento.update("stringHistory", this.stringHistory).then(
			() => {},
			() => {}
		);
	}

	private trimRegexHistory(): void {
		if (this.regexHistory.length > this.historyLimit) {
			this.regexHistory.length = this.historyLimit;
		}
	}

	private trimStringHistory(): void {
		if (this.stringHistory.length > this.historyLimit) {
			this.stringHistory.length = this.historyLimit;
		}
	}
}
