// Copyright 2019 Benbuck Nason

import * as findAllInFile from "./findAllInFile";
import * as vscode from "vscode";
import type { DeepReadonly } from "./DeepReadonly";
import { TreeDataProvider } from "./treeDataProvider";
import type { TreeElement } from "./treeDataProvider";
import { localize } from "./localize";

const getActiveDocument = (): vscode.TextDocument | undefined => {
	// Make sure there is an active editor window for us to use
	if (typeof vscode.window.activeTextEditor === "undefined") {
		// eslint-disable-next-line no-undefined
		return undefined;
	}

	// Get the active document
	return vscode.window.activeTextEditor.document;
};

const createTreeView = (provider: Readonly<TreeDataProvider>): vscode.TreeView<TreeElement> => {
	const treeViewOptions: vscode.TreeViewOptions<TreeElement> = {
		showCollapseAll: false,
		treeDataProvider: provider,
	};

	return vscode.window.createTreeView("findallview", treeViewOptions);
};

// Remember most recent searches for easy re-use
let lastFindRegex: string = "";
let lastFindString: string = "";

const getSelectedText = (): string | undefined => {
	const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
	if (typeof editor === "undefined") {
		// eslint-disable-next-line no-undefined
		return undefined;
	}
	const selection: vscode.Selection = editor.selection;
	if (selection.isEmpty) {
		// eslint-disable-next-line no-undefined
		return undefined;
	}
	const text: string = editor.document.getText(selection);
	if (text.length <= 0) {
		// eslint-disable-next-line no-undefined
		return undefined;
	}

	return text;
};

const defaultFindRegex = (): string => {
	const selectedText: string | undefined = getSelectedText();
	if (typeof selectedText === "undefined") {
		return lastFindRegex;
	}

	return selectedText;
};

const defaultFindString = (): string => {
	const selectedText: string | undefined = getSelectedText();
	if (typeof selectedText === "undefined") {
		return lastFindString;
	}

	return selectedText;
};

const findRegexCase = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_regex"),
			value: defaultFindRegex(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findRegexCase(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindRegex = findText;
				}
			},
			() => {}
		);
};

const findRegexCaseWord = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_regex"),
			value: defaultFindRegex(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findRegexCaseWord(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindRegex = findText;
				}
			},
			() => {}
		);
};

const findRegexNoCase = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_regex"),
			value: defaultFindRegex(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findRegexNoCase(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindRegex = findText;
				}
			},
			() => {}
		);
};

const findRegexNoCaseWord = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_regex"),
			value: defaultFindRegex(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findRegexNoCaseWord(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindRegex = findText;
				}
			},
			() => {}
		);
};

const findStringCase = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_string"),
			value: defaultFindString(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findStringCase(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindString = findText;
				}
			},
			() => {}
		);
};

const findStringCaseWord = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_string"),
			value: defaultFindString(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findStringCaseWord(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindString = findText;
				}
			},
			() => {}
		);
};

const findStringNoCase = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_string"),
			value: defaultFindString(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findStringNoCase(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindString = findText;
				}
			},
			() => {}
		);
};

const findStringNoCaseWord = (): void => {
	vscode.window
		.showInputBox({
			prompt: localize("enter_search_string"),
			value: defaultFindString(),
		})
		.then(
			(findText: string | undefined) => {
				if (typeof findText !== "undefined" && findText.length > 0) {
					const provider: TreeDataProvider = new TreeDataProvider();
					const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

					findAllInFile.findStringNoCaseWord(getActiveDocument(), findText, provider);

					treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
						() => {},
						() => {}
					);

					lastFindString = findText;
				}
			},
			() => {}
		);
};

const viewResult = (doc: DeepReadonly<vscode.TextDocument>, line: number, columnBegin: number, columnEnd: number): void => {
	// Make sure document is showing
	vscode.window.showTextDocument(doc).then(
		() => {},
		() => {}
	);

	if (typeof vscode.window.activeTextEditor !== "undefined") {
		// Make the result visible
		vscode.window.activeTextEditor.revealRange(new vscode.Range(line, columnBegin, line, columnEnd));

		// Select the result
		vscode.window.activeTextEditor.selection = new vscode.Selection(line, columnBegin, line, columnEnd);
	}
};

const copyResults = (provider: Readonly<TreeDataProvider>): void => {
	let resultString: string = "";
	const results: TreeElement[] = provider.getResults();
	for (const result of results) {
		resultString += result.toString();
		resultString += "\n";
	}

	vscode.env.clipboard.writeText(resultString).then(
		() => {},
		() => {}
	);
	vscode.window.showInformationMessage(localize("copied_to_clipboard")).then(
		() => {},
		() => {}
	);
};

// Called once on extension init
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const activate = (context: Readonly<vscode.ExtensionContext>): void => {
	// External commands
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregexcase", findRegexCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregexcaseword", findRegexCaseWord));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregexnocase", findRegexNoCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findregexnocaseword", findRegexNoCaseWord));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringcase", findStringCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringcaseword", findStringCaseWord));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringnocase", findStringNoCase));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.findstringnocaseword", findStringNoCaseWord));

	// Internal commands
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.viewResult", viewResult));
	context.subscriptions.push(vscode.commands.registerCommand("findallinfile.copyResults", copyResults));
};

// Called once on extension destroy
export const deactivate = (): void => {
	// Nothing to do
};
