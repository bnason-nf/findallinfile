// Copyright 2019 Benbuck Nason

import * as vscode from 'vscode';

// search for all occurrences of a search string within the current file
function findallinfile(findText: string, useRegex: boolean) {
	// create and use an output channel for the results
	let outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel("Find All In File");
	outputChannel.show();

	// make sure there is an active editor window for us to use
	if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
		outputChannel.appendLine("No active editor");
		return;
	}

	// get the active document
	let doc: vscode.TextDocument = vscode.window.activeTextEditor.document;

	// print initial status message
	outputChannel.appendLine(`Searching for ${useRegex ? "regex" : "string"} '${findText}' in '${doc.fileName}':`);

	// search each line of the document
	let lineCount: number = doc.lineCount;
	let foundCount: number = 0;
	let findRegex: RegExp = new RegExp(findText); // may not be used
	for (let lineIndex: number = 0; lineIndex < lineCount; ++lineIndex) {
		let line: vscode.TextLine = doc.lineAt(lineIndex);
		let lineText: string = line.text;
		if ((useRegex && findRegex.test(lineText)) || (!useRegex && lineText.includes(findText))) {
			// print matching line
			outputChannel.appendLine(`line ${lineIndex}: ${lineText}`);
			++foundCount;
		}
	}

	// print summary
	outputChannel.appendLine(`Found ${foundCount} occurrences`);
}

// remember most recent searches for easy re-use
let lastFindRegex: string = '';
let lastFindString: string = '';

// called once on extension init
export function activate(context: vscode.ExtensionContext) {
	// add command for searching with a regular expression
	let regexCommand = vscode.commands.registerCommand('extension.findallinfileregex', async () => {
		const findText = await vscode.window.showInputBox({
			prompt: 'Find All In File Search Regex',
			value: lastFindRegex
		});

		if (findText) {
			findallinfile(findText, true);
			lastFindRegex = findText;
		}
	});
	context.subscriptions.push(regexCommand);

	// add command for searching with a string
	let stringCommand = vscode.commands.registerCommand('extension.findallinfilestring', async () => {
		const findText = await vscode.window.showInputBox({
			prompt: 'Find All In File Search String',
			value: lastFindString
		});

		if (findText) {
			findallinfile(findText, false);
			lastFindString = findText;
		}
	});
	context.subscriptions.push(stringCommand);
}

// called once on extension destroy
export function deactivate() {
}
