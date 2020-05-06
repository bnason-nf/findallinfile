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

	public end(): void {
		const label: string = `Found ${this.findResults.length - 1} occurrences`;
		this.findResults.push(new FindResult(undefined, label));
		this.refreshTree();
	}

	public errorNoDocument(): void {
		this.findResults.length = 0;
		this.findResults.push(new FindResult(undefined, "No active editor document"));
		this.refreshTree();
	}

	public getChildren(/* element: FindResult */): FindResult[] {
		return this.findResults;
	}

	// tslint:disable:prefer-function-over-method
	public getParent(/* element: FindResult */): vscode.ProviderResult<FindResult> {
		return undefined;
	}

	public getTreeItem(element: FindResult): vscode.TreeItem {
		const label: string = (element.line === undefined) ? `${element.text}` : `line ${element.line + 1}: ${element.text}`;
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);

		if (this.doc !== undefined) {
			treeItem.command = { command: "findallinfile.viewResult", title: "Open File", arguments: [this.doc, element.line] };
		}

		return treeItem;
	}

	public item(lineIndex: number, lineText: string): void {
		this.findResults.push(new FindResult(lineIndex, lineText));
		this.refreshTree();
	}

	public start(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void {
		this.doc = doc;
		this.findResults.length = 0;
		const label: string = `Searching for ${useRegex ? "regex" : caseSensitive ? "case-sensitive string" :
			"case-insensitive string"} "${findText}" in "${doc.fileName}":`;
		this.findResults.push(new FindResult(undefined, label));
		this.refreshTree();
	}

	private refreshTree(): void {
		this.eventEmitter.fire();
	}
}
