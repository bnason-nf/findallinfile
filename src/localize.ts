// Copyright 2019 Benbuck Nason

// Originally from https://github.com/shanalikhan/code-settings-sync/blob/master/src/localize.ts

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

const recurseCandidates = (rootPath: string, format: string, candidate: string): string => {
	const filename: string = format.replace("{0}", `.${candidate}`);
	const filepath: string = path.resolve(rootPath, filename);
	if (fs.existsSync(filepath)) {
		return filename;
	}
	if (candidate.split("-")[0] !== candidate) {
		return recurseCandidates(rootPath, format, candidate.split("-")[0]);
	}

	return format.replace("{0}", "");
};

const resolveLanguagePack = (): Record<string, string> => {
	let options: { locale: string } = { locale: "" };
	const config: string = process.env.VSCODE_NLS_CONFIG ?? "{}";
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	options = {
		...options,
		...JSON.parse(config),
	};

	const languageFormat: string = "package.nls{0}.json";
	const defaultLanguage: string = languageFormat.replace("{0}", "");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const extension: vscode.Extension<any> | undefined = vscode.extensions.getExtension("bnason-nf.findallinfile");
	const rootPath: string = typeof extension === "undefined" ? "" : extension.extensionPath;
	const resolvedLanguage: string = recurseCandidates(rootPath, languageFormat, options.locale);
	const languageFilePath: string = path.resolve(rootPath, resolvedLanguage);

	const usingDefaultLanguage: boolean = resolvedLanguage !== defaultLanguage;
	const json: string = usingDefaultLanguage ? fs.readFileSync(path.resolve(rootPath, defaultLanguage), "utf-8") : "{}";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
	const defaultLanguageBundle: any = JSON.parse(json);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
	const resolvedLanguageBundle: any = JSON.parse(fs.readFileSync(languageFilePath, "utf-8"));

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return { ...defaultLanguageBundle, ...resolvedLanguageBundle };
};

const languagePack: Record<string, string> = resolveLanguagePack();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localize = (key: string, ...args: readonly any[]): string => {
	const localized: string = languagePack[key];

	let formatted: string = localized;
	for (let index: number = 0; index < args.length; index += 1) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		formatted = formatted.replace(`{${index}}`, `${args[index]}`);
	}

	return formatted;
};
