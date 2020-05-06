// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import { IOutputSink } from "./iOutputSink";
import { TreeNode } from "./treeNode";

export class TreeDataProvider implements vscode.TreeDataProvider<TreeNode>, IOutputSink {
	public readonly onDidChangeTreeData: vscode.Event<TreeNode> | undefined;

	private doc: vscode.TextDocument | undefined;
	private readonly eventEmitter: vscode.EventEmitter<TreeNode> = new vscode.EventEmitter<TreeNode>();
	private readonly treeNodes: TreeNode[] = [];

	public constructor() {
		this.onDidChangeTreeData = this.eventEmitter.event;
	}

	public end(): void {
		const label: string = `Found ${this.treeNodes.length - 1} occurrences`;
		this.treeNodes.push(new TreeNode(undefined, label));
		this.refreshTree();
	}

	public errorNoDocument(): void {
		this.treeNodes.length = 0;
		this.treeNodes.push(new TreeNode(undefined, "No active editor document"));
		this.refreshTree();
	}

	public getChildren(/* element: TreeNode */): TreeNode[] {
		return this.treeNodes;
	}

	// tslint:disable:prefer-function-over-method
	public getParent(/* element: TreeNode */): vscode.ProviderResult<TreeNode> {
		return undefined;
	}

	public getTreeItem(element: TreeNode): vscode.TreeItem {
		const label: string = (element.line === undefined) ? `${element.text}` : `line ${element.line + 1}: ${element.text}`;
		const treeItem: vscode.TreeItem = new vscode.TreeItem(label);

		if (this.doc !== undefined) {
			treeItem.command = { command: "findallinfile.viewResult", title: "Open File", arguments: [this.doc, element.line] };
		}

		return treeItem;
	}

	public item(lineIndex: number, lineText: string): void {
		this.treeNodes.push(new TreeNode(lineIndex, lineText));
		this.refreshTree();
	}

	public start(doc: vscode.TextDocument, findText: string, useRegex: boolean, caseSensitive: boolean): void {
		this.doc = doc;
		this.treeNodes.length = 0;
		const label: string = `Searching for ${useRegex ? "regex" : caseSensitive ? "case-sensitive string" :
			"case-insensitive string"} "${findText}" in "${doc.fileName}":`;
		this.treeNodes.push(new TreeNode(undefined, label));
		this.refreshTree();
	}

	private refreshTree(): void {
		this.eventEmitter.fire();
	}
}
