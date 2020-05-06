// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import * as findAllInFile from "./findAllInFile";
import { FindResult } from "./findResult";
import { TreeDataProvider } from "./treeDataProvider";

function getActiveDocument(): vscode.TextDocument | undefined {
	// Make sure there is an active editor window for us to use
	if (vscode.window.activeTextEditor === undefined) {
		return undefined;
	}

	// Get the active document
	return vscode.window.activeTextEditor.document;
}

function createTreeView(provider: TreeDataProvider): vscode.TreeView<FindResult> {
	const treeViewOptions: vscode.TreeViewOptions<FindResult> = {
		canSelectMany: false,
		showCollapseAll: false,
		treeDataProvider: provider,
	};

	return vscode.window.createTreeView("findallview", treeViewOptions);
}

// Remember most recent searches for easy re-use
let lastFindRegex: string = "";
let lastFindString: string = "";

function findRegex(): void {
	vscode.window.showInputBox({
		prompt: "Please enter regular expression to search for",
		value: lastFindRegex,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<FindResult> = createTreeView(provider);

			findAllInFile.findRegex(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindRegex = findText;
		}
	});
}

function findStringCase(): void {
	vscode.window.showInputBox({
		prompt: "Please enter string to search for",
		value: lastFindString,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<FindResult> = createTreeView(provider);

			findAllInFile.findCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindString = findText;
		}
	});
}

function findStringNoCase(): void {
	vscode.window.showInputBox({
		prompt: "Please enter string to search for",
		value: lastFindString,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<FindResult> = createTreeView(provider);

			findAllInFile.findNoCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindString = findText;
		}
	});
}

function viewResult(doc: vscode.TextDocument, line: number, columnBegin: number, columnEnd: number): void {
	// Make sure document is showing
	vscode.window.showTextDocument(doc);

	// Make sure line is showing
	vscode.commands.executeCommand("revealLine", { lineNumber: line, at: "center" });

	// Select the result
	if (vscode.window.activeTextEditor !== undefined) {
		vscode.window.activeTextEditor.selection = new vscode.Selection(line, columnBegin, line, columnEnd);
	}
}

// Called once on extension init
export function activate(context: vscode.ExtensionContext): void {
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregex", findRegex));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringcase", findStringCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringnocase", findStringNoCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.viewResult", viewResult));
}

// Called once on extension destroy
export function deactivate(): void {
	// Nothing to do
}
