// Copyright 2019 Benbuck Nason

import * as assert from "assert";
import * as findallinfile from "../../findAllInFile";
import * as mock from "ts-mockito";
import * as path from "path";
import * as vscode from "vscode";
import { afterEach, before, beforeEach } from "mocha";
import { FindResult } from "../../findResult";
import type { IOutputSink } from "../../iOutputSink";

const outputMock: IOutputSink = mock.mock<IOutputSink>();
const output: IOutputSink = mock.instance(outputMock);

// eslint-disable-next-line arrow-body-style
const isEqual = (fr: Readonly<FindResult>, text: string, line: number, columnBegin: number, columnEnd: number): boolean => {
	return fr.line === line && fr.columnBegin === columnBegin && fr.columnEnd === columnEnd && fr.text === text;
};

/* eslint-disable max-lines-per-function, @typescript-eslint/no-confusing-void-expression */

suite("No document", () => {
	beforeEach(() => {
		mock.reset(outputMock);
	});

	afterEach(() => {
		mock.verify(
			outputMock.begin(
				mock.anything(),
				mock.anyString(),
				mock.anyOfClass(Boolean),
				mock.anyOfClass(Boolean),
				mock.anyOfClass(Boolean)
			)
		).never();
		mock.verify(outputMock.end()).never();
	});

	/* eslint-disable no-undefined */

	test("String case", () => {
		findallinfile.findStringCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String case word", () => {
		findallinfile.findStringCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String no case", () => {
		findallinfile.findStringNoCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("String no case word", () => {
		findallinfile.findStringNoCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex case", () => {
		findallinfile.findRegexCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex case word", () => {
		findallinfile.findRegexCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex no case", () => {
		findallinfile.findRegexNoCase(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	test("Regex no case word", () => {
		findallinfile.findRegexNoCaseWord(undefined, "", output);
		mock.verify(outputMock.noDocument()).once();
	});

	/* eslint-enable no-undefined */
});

suite("Find", (): void => {
	// eslint-disable-next-line @typescript-eslint/init-declarations
	let doc: vscode.TextDocument;

	before(async () => {
		const docUri: string = path.resolve(__dirname, "../../../src/test/suite/test.txt");
		doc = await vscode.workspace.openTextDocument(docUri);
		// Unused - const editor: vscode.TextEditor = ...
		await vscode.window.showTextDocument(doc);
	});

	beforeEach(() => {
		mock.reset(outputMock);
	});

	// String tests

	/* eslint-disable no-magic-numbers, @typescript-eslint/no-magic-numbers */

	test("String case", () => {
		findallinfile.findStringCase(doc, "test", output);
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
		findallinfile.findStringCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", false, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		mock.verify(outputMock.end()).once();
	});

	test("String no case", () => {
		findallinfile.findStringNoCase(doc, "test", output);
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
		findallinfile.findStringNoCaseWord(doc, "test", output);
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
		findallinfile.findRegexCase(doc, "test", output);
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
		findallinfile.findRegexCaseWord(doc, "test", output);
		mock.verify(outputMock.begin(doc, "test", true, true, true)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 4));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "test 123 test abc test", 0, 9, 13));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "test 123 test abc test", 0, 18, 22));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case", () => {
		findallinfile.findRegexNoCase(doc, "test", output);
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
		findallinfile.findRegexNoCaseWord(doc, "test", output);
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
		findallinfile.findRegexCase(doc, "t.st", output);
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
		findallinfile.findRegexNoCase(doc, "t.st", output);
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
		findallinfile.findRegexCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, true, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(2);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "testno 456 notest def notest", 1, 0, 28));
		mock.verify(outputMock.end()).once();
	});

	test("Regex no case dot star", () => {
		findallinfile.findRegexNoCase(doc, "test.*", output);
		mock.verify(outputMock.begin(doc, "test.*", true, false, false)).once();
		mock.verify(outputMock.item(mock.anyOfClass(FindResult))).times(3);
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(0)[0], "test 123 test abc test", 0, 0, 22));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(1)[0], "testno 456 notest def notest", 1, 0, 28));
		assert(isEqual(mock.capture(outputMock.item).byCallIndex(2)[0], "Test tEst TeSttEST", 3, 0, 18));
		mock.verify(outputMock.end()).once();
	});

	test("Regex case char class", () => {
		findallinfile.findRegexCase(doc, "t[ae]st", output);
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
		findallinfile.findRegexNoCase(doc, "t[ae]st", output);
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

	/* eslint-enable no-magic-numbers, @typescript-eslint/no-magic-numbers */
});

/* eslint-enable max-lines-per-function, @typescript-eslint/no-confusing-void-expression */
