// Copyright 2019 Benbuck Nason

"use strict";

import * as assert from "assert";
import { afterEach, before, beforeEach } from "mocha";
import * as mock from "ts-mockito";
import * as path from "path";
import * as vscode from "vscode";

import { findStringCase, findStringCaseWord, findStringNoCase, findStringNoCaseWord, findRegexCase, findRegexCaseWord, findRegexNoCase, findRegexNoCaseWord } from "../../findAllInFile";
import { FindResult } from "../../findResult";
import { IOutputSink } from "../../iOutputSink";

const outputMock: IOutputSink = mock.mock<IOutputSink>();
const output: IOutputSink = mock.instance(outputMock);

function isEqual(fr: FindResult, text: string, line: number, columnBegin: number, columnEnd: number)
{
	return (fr.line == line) && (fr.columnBegin == columnBegin) && (fr.columnEnd == columnEnd) && (fr.text == text);
}

suite("No document", () => {
	beforeEach(() => {
		mock.reset(outputMock);
	});

	afterEach(() => {
		mock.verify(outputMock.begin(mock.anything(), mock.anyString(), mock.anyOfClass(Boolean),
			mock.anyOfClass(Boolean), mock.anyOfClass(Boolean))).never();
		mock.verify(outputMock.end()).never();
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
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		mock.verify(outputMock.end()).once();
	});

	test("String case word", () => {
		findStringCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		mock.verify(outputMock.end()).once();
	});

	test("String no case", () => {
		findStringNoCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(10);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(7)[0], "Test tEst TeSttEST", 3, 5, 9));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(8)[0], "Test tEst TeSttEST", 3, 10, 14));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(9)[0], "Test tEst TeSttEST", 3, 14, 18));
		mock.verify(outputMock.end()).once();
	});

	test("String no case word", () => {
		findStringNoCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, false, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(5);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "Test tEst TeSttEST", 3, 5, 9));
		mock.verify(outputMock.end()).once();
	});

	// Trivial regex tests

	test("Regex case", () => {
		findRegexCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(6);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		mock.verify(outputMock.end()).once();
	});

	test("Regex case word", () => {
		findRegexCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case", () => {
		findRegexNoCase(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(10);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(7)[0], "Test tEst TeSttEST", 3, 5, 9));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(8)[0], "Test tEst TeSttEST", 3, 10, 14));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(9)[0], "Test tEst TeSttEST", 3, 14, 18));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case word", () => {
		findRegexNoCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, false, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(5);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "Test tEst TeSttEST", 3, 5, 9));
		mock.verify(outputMock.end()).once();
	});

	// Regex tests

	test("Regex case dot", () => {
		findRegexCase(doc, "t.st", output);
		mock.verify(outputMock.begin(doc, "t.st", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(8);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "no tast no TAST no tASt", 2, 3, 7));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(7)[0], "Test tEst TeSttEST", 3, 5, 9));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case dot", () => {
		findRegexNoCase(doc, "t.st", output);
		mock.verify(outputMock.begin(doc, "t.st", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(13);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "no tast no TAST no tASt", 2, 3, 7));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(7)[0], "no tast no TAST no tASt", 2, 11, 15));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(8)[0], "no tast no TAST no tASt", 2, 19, 23));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(9)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(10)[0], "Test tEst TeSttEST", 3, 5, 9));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(11)[0], "Test tEst TeSttEST", 3, 10, 14));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(12)[0], "Test tEst TeSttEST", 3, 14, 18));
		mock.verify(outputMock.end()).once();
	});

	test("Regex case dot star", () => {
		findRegexCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(2);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "testno 456 notest def notest", 1, 0, 28));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case dot star", () => {
		findRegexNoCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "testno 456 notest def notest", 1, 0, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "Test tEst TeSttEST", 3, 0, 18));
		mock.verify(outputMock.end()).once();
	});

	test("Regex case char class", () => {
		findRegexCase(doc, "t[ae]st", output);
		mock.verify(outputMock.begin(doc, "t[ae]st", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(7);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "no tast no TAST no tASt", 2, 3, 7));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case char class", () => {
		findRegexNoCase(doc, "t[ae]st", output);
		mock.verify(outputMock.begin(doc, "t[ae]st", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(13);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(3)[0], "testno 456 notest def notest", 1, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(4)[0], "testno 456 notest def notest", 1, 13, 17));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(5)[0], "testno 456 notest def notest", 1, 24, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(6)[0], "no tast no TAST no tASt", 2, 3, 7));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(7)[0], "no tast no TAST no tASt", 2, 11, 15));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(8)[0], "no tast no TAST no tASt", 2, 19, 23));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(9)[0], "Test tEst TeSttEST", 3, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(10)[0], "Test tEst TeSttEST", 3, 5, 9));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(11)[0], "Test tEst TeSttEST", 3, 10, 14));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(12)[0], "Test tEst TeSttEST", 3, 14, 18));
		mock.verify(outputMock.end()).once();
	});
});
