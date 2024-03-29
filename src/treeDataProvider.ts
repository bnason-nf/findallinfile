// Copyright 2019 Benbuck Nason

import * as vscode from "vscode";

import type { DeepReadonly } from "./readonly";
import { FindError } from "./findError";
import { FindInfo } from "./findInfo";
import { FindResult } from "./findResult";
import type { IOutputSink } from "./iOutputSink";
import { localize } from "./localize";

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type TreeElement = FindError | FindInfo | FindResult;

export class TreeDataProvider implements vscode.TreeDataProvider<TreeElement>, IOutputSink {
	public readonly onDidChangeTreeData: vscode.Event<TreeElement> | undefined;

	private doc: DeepReadonly<vscode.TextDocument | undefined>;

	private readonly eventEmitter: vscode.EventEmitter<TreeElement> = new vscode.EventEmitter<TreeElement>();

	private readonly findResults: TreeElement[] = [];

	public constructor() {
		this.onDidChangeTreeData = this.eventEmitter.event;
	}

	public begin(
		doc: DeepReadonly<vscode.TextDocument>,
		findText: string,
		useRegex: boolean,
		caseSensitive: boolean,
		wholeWord: boolean
	): void {
		this.doc = doc;
		this.findResults.length = 0;
		const regexCase: string = caseSensitive ? localize("regex_case") : localize("regex_no_case");
		const stringCase: string = caseSensitive ? localize("string_case") : localize("string_no_case");
		const searchType: string = useRegex ? regexCase : stringCase;
		const label: string = localize(
			"search_header",
			searchType,
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

	public getChildren(element: Readonly<TreeElement> | undefined): TreeElement[] {
		if (element === undefined) {
			return this.findResults;
		}

		return [];
	}

	public getFirstResult(): TreeElement {
		return this.findResults[0];
	}

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
	public getParent(_element: DeepReadonly<TreeElement>): vscode.ProviderResult<TreeElement> {
		return undefined;
	}

	public getResults(): TreeElement[] {
		return this.findResults;
	}

	public getTreeItem(element: DeepReadonly<TreeElement> | undefined): vscode.TreeItem {
		if (element === undefined) {
			return new vscode.TreeItem("");
		}

		if (element instanceof FindError) {
			const treeItem: vscode.TreeItem = new vscode.TreeItem(element.toString());
			treeItem.tooltip = element.text;
			return treeItem;
		}

		if (element instanceof FindInfo) {
			return this.itemFromInfo(element);
		}

		if (element instanceof FindResult) {
			return this.itemFromResult(element);
		}

		return new vscode.TreeItem("");
	}

	public item(findResult: Readonly<FindResult>): void {
		this.findResults.push(findResult);
		// Slow: this.refreshTree();
	}

	public noDocument(): void {
		this.findResults.length = 0;
		this.findResults.push(new FindError(localize("error_no_document")));
		this.refreshTree();
	}

	public regexFailure(error: string): void {
		this.findResults.length = 0;
		this.findResults.push(new FindError(localize("error_regex", error)));
		this.refreshTree();
	}

	private refreshTree(): void {
		this.eventEmitter.fire(new FindInfo(""));
	}

	private itemFromInfo(element: Readonly<FindInfo>): vscode.TreeItem {
		const label: string = element.toString();
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);
		treeItem.tooltip = element.text;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const args: any[] = [this];
		treeItem.command = {
			arguments: args,
			command: "findallinfile.copyResults",
			title: "",
		};
		return treeItem;
	}

	private itemFromResult(element: Readonly<FindResult>): vscode.TreeItem {
		const highlight: [number, number] = [element.trimmedColumnBegin, element.trimmedColumnEnd];
		const label: vscode.TreeItemLabel = { highlights: [highlight], label: element.trimmedText };
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);
		if (this.doc !== undefined) {
			treeItem.tooltip = element.toMarkdown();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const args: any[] = [this.doc, element.line, element.columnBegin, element.columnEnd];
			treeItem.command = {
				arguments: args,
				command: "findallinfile.viewResult",
				title: "",
			};
		}
		return treeItem;
	}
}
