// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { FindResult } from "./findResult";
import { IOutputSink } from "./iOutputSink";

export class TreeDataProvider implements vscode.TreeDataProvider<FindResult>, IOutputSink {
	public readonly onDidChangeTreeData: vscode.Event<FindResult> | undefined;

	private doc: vscode.TextDocument | undefined;
	private readonly eventEmitter: vscode.EventEmitter<FindResult> = new vscode.EventEmitter<FindResult>();
	private readonly findResults: FindResult[] = [];

	public constructor() {
		this.onDidChangeTreeData = this.eventEmitter.event;
	}

	public begin(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void {
		this.doc = doc;
		this.findResults.length = 0;
		const label: string = `Searching for ${useRegex ? "regex" : caseSensitive ? "case-sensitive string" :
			"case-insensitive string"} "${findText}" in "${doc.fileName}":`;
		this.findResults.push(new FindResult(label));
		this.refreshTree();
	}

	public end(): void {
		const label: string = `Found ${this.findResults.length - 1} occurrences`;
		this.findResults.push(new FindResult(label));
		this.refreshTree();
	}

	public getChildren(element: FindResult | undefined): FindResult[] {
		if (element === undefined) {
			return this.findResults;
		}

		return [];
	}

	public getFirstResult(): FindResult {
		return this.findResults[0];
	}

	// tslint:disable:prefer-function-over-method
	public getParent(/* element: FindResult */): vscode.ProviderResult<FindResult> {
		return undefined;
	}

	public getTreeItem(element: FindResult | undefined): vscode.TreeItem {
		if (element === undefined) {
			return new vscode.TreeItem("");
		}

		if ((element.line === undefined) || (element.column === undefined)) {
			return new vscode.TreeItem(element.text);
		}

		const label: string = `${element.line + 1}:${element.column + 1}:\t${element.text}`;
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);

		if (this.doc !== undefined) {
			// tslint:disable:no-any
			const args: any[] = [ this.doc, element.line, element.column ];
			treeItem.command = { command: "findallinfile.viewResult", title: "Open File", arguments: args };
		}

		return treeItem;
	}

	public item(text: string, line: number, column: number): void {
		this.findResults.push(new FindResult(text, line, column));
		// Slow: this.refreshTree();
	}

	public noDocument(): void {
		this.findResults.length = 0;
		this.findResults.push(new FindResult("No active editor document"));
		this.refreshTree();
	}

	private refreshTree(): void {
		this.eventEmitter.fire();
	}
}
