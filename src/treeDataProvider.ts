// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { FindError } from "./findError";
import { FindInfo } from "./findInfo";
import { FindResult } from "./findResult";
import { IOutputSink } from "./iOutputSink";
import { localize } from "./localize";

export type TreeElement = FindError | FindInfo | FindResult;

export class TreeDataProvider implements vscode.TreeDataProvider<TreeElement>, IOutputSink {
	public readonly onDidChangeTreeData: vscode.Event<TreeElement> | undefined;

	private doc: vscode.TextDocument | undefined;
	private readonly eventEmitter: vscode.EventEmitter<TreeElement> = new vscode.EventEmitter<TreeElement>();
	private readonly findResults: TreeElement[] = [];

	public constructor() {
		this.onDidChangeTreeData = this.eventEmitter.event;
	}

	public begin(
		doc: vscode.TextDocument,
		findText: string,
		useRegex: boolean,
		caseSensitive: boolean,
		wholeWord: boolean,
	): void {
		this.doc = doc;
		this.findResults.length = 0;
		const label: string = localize(
			"search_header",
			useRegex ?
				caseSensitive ? localize("regex_case") : localize("regex_no_case") :
				caseSensitive ? localize("string_case") : localize("string_no_case"),
			wholeWord ? localize("whole_word") : " ",
			findText,
			doc.fileName
		);
		this.findResults.push(new FindInfo(label));
		this.refreshTree();
	}

	public end(): void {
		const label: string = localize("search_footer", this.findResults.length - 1);
		this.findResults.push(new FindInfo(label));
		this.refreshTree();
	}

	public getChildren(element: TreeElement | undefined): TreeElement[] {
		if (element === undefined) {
			return this.findResults;
		}

		return [];
	}

	public getFirstResult(): TreeElement {
		return this.findResults[0];
	}

	// tslint:disable:prefer-function-over-method
	public getParent(/* element: TreeElement */): vscode.ProviderResult<TreeElement> {
		return undefined;
	}

	public getResults(): TreeElement[] {
		return this.findResults;
	}

	public getTreeItem(element: TreeElement | undefined): vscode.TreeItem {
		if (element === undefined) {
			return new vscode.TreeItem("");
		}

		const label: string = element.toString();
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);
		treeItem.tooltip = element.text;

		if (element instanceof FindError) {
			// No command needed
		} else if (element instanceof FindInfo) {
			// tslint:disable:no-any
			const args: any[] = [this];
			treeItem.command = {
				arguments: args,
				command: "findallinfile.copyResults",
				title: ""
			};
		} else if (element instanceof FindResult) {
			if (this.doc !== undefined) {
				// tslint:disable:no-any
				const args: any[] = [this.doc, element.line, element.columnBegin, element.columnEnd];
				treeItem.command = {
					arguments: args,
					command: "findallinfile.viewResult",
					title: ""
				};
			}
		}

		return treeItem;
	}

	public item(findResult: FindResult): void {
		this.findResults.push(findResult);
		// Slow: this.refreshTree();
	}

	public noDocument(): void {
		this.findResults.length = 0;
		this.findResults.push(new FindError(localize("error_no_document")));
		this.refreshTree();
	}

	public regexFailure(e: string): void {
		this.findResults.length = 0;
		this.findResults.push(new FindError(localize("error_regex", e)));
		this.refreshTree();
	}

	private refreshTree(): void {
		this.eventEmitter.fire(new FindInfo(""));
	}
}
