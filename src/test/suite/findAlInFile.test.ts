//import * as assert from "assert";
import { before, beforeEach } from "mocha";
import * as mock from "ts-mockito";
import * as path from "path";
import * as vscode from "vscode";

import { findStringCase, findStringCaseWord, findStringNoCase, findStringNoCaseWord, findRegexCase, findRegexCaseWord, findRegexNoCase, findRegexNoCaseWord } from "../../findAllInFile";
import { FindResult } from "../../findResult";
import { IOutputSink } from "../../iOutputSink";

const outputMock: IOutputSink = mock.mock<IOutputSink>();
const output: IOutputSink = mock.instance(outputMock);

suite("No document", () => {
	beforeEach(() => {
		mock.reset(outputMock);
	});

	test("String case", () => {
		findStringCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String case word", () => {
		findStringCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String no case", () => {
		findStringNoCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String no case word", () => {
		findStringNoCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex case", () => {
		findRegexCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex case word", () => {
		findRegexCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex no case", () => {
		findRegexNoCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex no case word", () => {
		findRegexNoCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});
});

suite("Find", async () => {
	let doc: vscode.TextDocument;

	before(async() => {
		const docUri: string = path.resolve(__dirname, "../../../src/test/suite/test.txt");
		doc = await vscode.workspace.openTextDocument(docUri);
		/* const editor: vscode.TextEditor = */ await vscode.window.showTextDocument(doc);
	});

	beforeEach(() => {
		mock.reset(outputMock);
	});

	// String tests

	test("String case", () => {
		findStringCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(6);
		mock.verify(outputMock.end()).once();
	});

	test("String case word", () => {
		findStringCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		mock.verify(outputMock.end()).once();
	});

	test("String no case", () => {
		findStringNoCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(10);
		mock.verify(outputMock.end()).once();
	});

	test("String no case word", () => {
		findStringNoCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, false, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(5);
		mock.verify(outputMock.end()).once();
	});

	test("Regex case", () => {
		findRegexCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(6);
		mock.verify(outputMock.end()).once();
	});

	// Trivial regex tests

	test("Regex case word", () => {
		findRegexCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case", () => {
		findRegexNoCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(10);
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case word", () => {
		findRegexNoCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, false, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(5);
		mock.verify(outputMock.end()).once();
	});

	// Regex tests

	test("Regex case dot", () => {
		findRegexCase(doc, "t.st", output);
		mock.verify(outputMock.begin(doc, "t.st", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(8);
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case dot", () => {
		findRegexNoCase(doc, "t.st", output);
		mock.verify(outputMock.begin(doc, "t.st", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(13);
		mock.verify(outputMock.end()).once();
	});

	test("Regex case dot star", () => {
		findRegexCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(2);
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case dot star", () => {
		findRegexNoCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		mock.verify(outputMock.end()).once();
	});

	test("Regex case char class", () => {
		findRegexCase(doc, "t[ae]st", output);
		mock.verify(outputMock.begin(doc, "t[ae]st", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(7);
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case char class", () => {
		findRegexNoCase(doc, "t[ae]st", output);
		mock.verify(outputMock.begin(doc, "t[ae]st", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(13);
		mock.verify(outputMock.end()).once();
	});
});
