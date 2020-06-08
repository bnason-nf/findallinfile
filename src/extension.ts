// Copyright 2019 Benbuck Nason

"use strict";

import * as vscode from "vscode";

import * as findAllInFile from "./findAllInFile";
import { TreeDataProvider, TreeElement } from "./treeDataProvider";

function getActiveDocument(): vscode.TextDocument | undefined {
	// Make sure there is an active editor window for us to use
	if (vscode.window.activeTextEditor === undefined) {
		return undefined;
	}

	// Get the active document
	return vscode.window.activeTextEditor.document;
}

function createTreeView(provider: TreeDataProvider): vscode.TreeView<TreeElement> {
	const treeViewOptions: vscode.TreeViewOptions<TreeElement> = {
		showCollapseAll: false,
		treeDataProvider: provider,
	};

	return vscode.window.createTreeView("findallview", treeViewOptions);
}

// Remember most recent searches for easy re-use
let lastFindRegex: string = "";
let lastFindString: string = "";

function findRegexCase(): void {
	vscode.window.showInputBox({
		prompt: "Please enter regular expression to search for",
		value: lastFindRegex,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findRegexCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindRegex = findText;
		}
	});
}

function findRegexCaseWord(): void {
	vscode.window.showInputBox({
		prompt: "Please enter regular expression to search for",
		value: lastFindRegex,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findRegexCaseWord(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindRegex = findText;
		}
	});
}

function findRegexNoCase(): void {
	vscode.window.showInputBox({
		prompt: "Please enter regular expression to search for",
		value: lastFindRegex,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findRegexNoCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindRegex = findText;
		}
	});
}

function findRegexNoCaseWord(): void {
	vscode.window.showInputBox({
		prompt: "Please enter regular expression to search for",
		value: lastFindRegex,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findRegexNoCaseWord(getActiveDocument(), findText, provider);

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
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findStringCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindString = findText;
		}
	});
}

function findStringCaseWord(): void {
	vscode.window.showInputBox({
		prompt: "Please enter string to search for",
		value: lastFindString,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findStringCaseWord(getActiveDocument(), findText, provider);

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
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findStringNoCase(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindString = findText;
		}
	});
}

function findStringNoCaseWord(): void {
	vscode.window.showInputBox({
		prompt: "Please enter string to search for",
		value: lastFindString,
	}).then((findText: string | undefined) => {
		if (findText !== undefined) {
			const provider: TreeDataProvider = new TreeDataProvider();
			const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

			findAllInFile.findStringNoCaseWord(getActiveDocument(), findText, provider);

			treeView.reveal(provider.getFirstResult(), { focus: true, select: false, expand: true });

			lastFindString = findText;
		}
	});
}

function viewResult(doc: vscode.TextDocument, line: number, columnBegin: number, columnEnd: number): void {
	// Make sure document is showing
	vscode.window.showTextDocument(doc);

	if (vscode.window.activeTextEditor !== undefined) {
		// Make the result visible
		vscode.window.activeTextEditor.revealRange(new vscode.Range(line, columnBegin, line, columnEnd));

		// Select the result
		vscode.window.activeTextEditor.selection = new vscode.Selection(line, columnBegin, line, columnEnd);
	}
}

function copyResults(provider: TreeDataProvider): void {
	let resultString: string = "";
	const results: TreeElement[] = provider.getResults();
	for (const result of results) {
		resultString += `${result.toString()}\n`;
	}

	vscode.env.clipboard.writeText(resultString);
	vscode.window.showInformationMessage("Copied results to clipboard");
}
// Called once on extension init
export function activate(context: vscode.ExtensionContext): void {
	// External commands
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findregexcase",
		findRegexCase
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findregexcaseword",
		findRegexCaseWord
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findregexnocase",
		findRegexNoCase
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findregexnocaseword",
		findRegexNoCaseWord
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findstringcase",
		findStringCase
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findstringcaseword",
		findStringCaseWord
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findstringnocase",
		findStringNoCase
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.findstringnocaseword",
		findStringNoCaseWord
	));

	// Internal commands
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.viewResult", viewResult
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"findallinfile.copyResults", copyResults
	));
}

// Called once on extension destroy
export function deactivate(): void {
	// Nothing to do
}
