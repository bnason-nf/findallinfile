// Copyright 2019 Benbuck Nason

import * as findAllInFile from "./findAllInFile";
import * as vscode from "vscode";
import type { DeepReadonly } from "./readonly";
import { SearchHistory } from "./searchHistory";
import { TreeDataProvider } from "./treeDataProvider";
import type { TreeElement } from "./treeDataProvider";
import { localize } from "./localize";

const getActiveDocument = (): vscode.TextDocument | undefined => {
	// Make sure there is an active editor window for us to use
	if (vscode.window.activeTextEditor === undefined) {
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

const getSelectedText = (): string | undefined => {
	const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
	if (editor === undefined) {
		return undefined;
	}
	const selection: vscode.Selection = editor.selection;
	if (selection.isEmpty) {
		return undefined;
	}
	const text: string = editor.document.getText(selection);
	if (text.length <= 0) {
		return undefined;
	}

	return text;
};

// eslint-disable-next-line @typescript-eslint/init-declarations
let searchHistory: SearchHistory | undefined;

const defaultFindRegexes = (): string[] => (searchHistory ? searchHistory.defaultFindRegexes() : ([] as string[]));

const defaultFindStrings = (): string[] => (searchHistory ? searchHistory.defaultFindStrings() : ([] as string[]));

const showQuickPick = async (
	strings: readonly string[],
	options: Readonly<vscode.QuickPickOptions>
): Promise<string | undefined> => {
	class QuickPickItem implements vscode.QuickPickItem {
		public label: string = "";
	}

	const quickPick: vscode.QuickPick<QuickPickItem> = vscode.window.createQuickPick();
	const items: QuickPickItem[] = [];
	for (const string of strings) {
		const item: QuickPickItem = new QuickPickItem();
		item.label = string;
		items.push(item);
	}
	quickPick.items = items;
	quickPick.placeholder = options.placeHolder;
	quickPick.onDidChangeValue((value: string) => {
		const newItems: QuickPickItem[] = quickPick.items.concat();
		newItems[0].label = value;
		quickPick.items = newItems;
	});
	quickPick.onDidHide(() => {
		quickPick.dispose();
	});
	quickPick.show();

	return new Promise<string | undefined>((resolve) => {
		quickPick.onDidAccept(() => {
			const selection = quickPick.selectedItems[0];
			quickPick.dispose();
			resolve(selection.label);
		});
	});
};

const findRegexCase = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_regex") };
	showQuickPick(defaultFindRegexes(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findRegexCase(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindRegex(findText);
			}
		},
		() => {}
	);
};

const findRegexCaseWord = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_regex") };
	showQuickPick(defaultFindRegexes(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findRegexCaseWord(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindRegex(findText);
			}
		},
		() => {}
	);
};

const findRegexNoCase = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_regex") };
	showQuickPick(defaultFindRegexes(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findRegexNoCase(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindRegex(findText);
			}
		},
		() => {}
	);
};

const findRegexNoCaseWord = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_regex") };
	showQuickPick(defaultFindRegexes(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findRegexNoCaseWord(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindRegex(findText);
			}
		},
		() => {}
	);
};

const findStringCase = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_string") };
	showQuickPick(defaultFindStrings(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findStringCase(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindString(findText);
			}
		},
		() => {}
	);
};

const findStringCaseWord = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_string") };
	showQuickPick(defaultFindStrings(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findStringCaseWord(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindString(findText);
			}
		},
		() => {}
	);
};

const findStringNoCase = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_string") };
	showQuickPick(defaultFindStrings(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findStringNoCase(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindString(findText);
			}
		},
		() => {}
	);
};

const findStringNoCaseWord = (): void => {
	const options: vscode.QuickPickOptions = { placeHolder: localize("enter_search_string") };
	showQuickPick(defaultFindStrings(), options).then(
		(findText: string | undefined) => {
			if (findText !== undefined && findText.length > 0) {
				const provider: TreeDataProvider = new TreeDataProvider();
				const treeView: vscode.TreeView<TreeElement> = createTreeView(provider);

				findAllInFile.findStringNoCaseWord(getActiveDocument(), findText, provider);

				treeView.reveal(provider.getFirstResult(), { expand: true, focus: true, select: false }).then(
					() => {},
					() => {}
				);

				searchHistory?.addFindString(findText);
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

	if (vscode.window.activeTextEditor !== undefined) {
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

	const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("findAllInFile");

	let resultLimit: number | undefined = config.get("resultLimit");
	if (resultLimit === undefined) {
		resultLimit = Number.MAX_SAFE_INTEGER;
	}
	findAllInFile.setResultLimit(resultLimit);

	let searchHistoryLimit: number | undefined = config.get("searchHistoryLimit");
	if (searchHistoryLimit === undefined) {
		const defaultHistoryLimit: number = 10;
		searchHistoryLimit = defaultHistoryLimit;
	} else {
		searchHistoryLimit = Math.round(searchHistoryLimit);
	}
	searchHistory = new SearchHistory(context.workspaceState, searchHistoryLimit, getSelectedText);
};

// Called once on extension destroy
export const deactivate = (): void => {
	// Nothing to do
};
