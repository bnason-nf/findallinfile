// Copyright 2019 Benbuck Nason

"use strict";

// Originally from https://github.com/shanalikhan/code-settings-sync/blob/master/src/localize.ts

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

interface ILanguagePack {
	[key: string]: string;
}

function recurseCandidates(rootPath: string, format: string, candidate: string): string {
	const filename: string = format.replace("{0}", `.${candidate}`);
	const filepath: string = path.resolve(rootPath, filename);
	if (fs.existsSync(filepath)) {
		return filename;
	}
	if (candidate.split("-")[0] !== candidate) {
		return recurseCandidates(rootPath, format, candidate.split("-")[0]);
	}

	return format.replace("{0}", "");
}

function resolveLanguagePack(): ILanguagePack {
	let options: { locale: string } = { locale: "" };
	try {
		const config: string = process.env.VSCODE_NLS_CONFIG ?? "{}";
		options = {
			...options,
			...JSON.parse(config)
		};
	} catch (err) {
		throw err;
	}

	// tslint:disable:no-any
	const languageFormat: string = "package.nls{0}.json";
	const defaultLanguage: string = languageFormat.replace("{0}", "");
	const extension: vscode.Extension<any> | undefined = vscode.extensions.getExtension("bnason-nf.findallinfile");
	const rootPath: string = (extension === undefined) ? "" : extension.extensionPath;
	const resolvedLanguage: string = recurseCandidates(rootPath, languageFormat, options.locale);
	const languageFilePath: string = path.resolve(rootPath, resolvedLanguage);

	try {
		const defaultLanguageBundle: any = JSON.parse(
			(resolvedLanguage !== defaultLanguage)
				? fs.readFileSync(path.resolve(rootPath, defaultLanguage), "utf-8")
				: "{}"
		);

		const resolvedLanguageBundle: any = JSON.parse(
			fs.readFileSync(languageFilePath, "utf-8")
		);

		return { ...defaultLanguageBundle, ...resolvedLanguageBundle };
	} catch (err) {
		throw err;
	}
}

const languagePack: ILanguagePack = resolveLanguagePack();

// tslint:disable:no-any no-unsafe-any
export function localize(key: string, ...args: any[]): string {
	const localized: string = languagePack[key];

	let formatted: string = localized;
	for (let index: number = 0; index < args.length; index += 1) {
		formatted = formatted.replace(`{${index}}`, `${args[index]}`);
	}

	return formatted;
}
