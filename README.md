# Find All In File

This is an extension for [Visual Studio Code](https://code.visualstudio.com/) that allows you to
search for all the occurrences of some text within the current document.

## Installing

The simplest way to get this extension is directly from [Extensions
Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery) built into Visual Studio
Code.

An alternative way to get this extension is from the [Marketplace web
page](https://marketplace.visualstudio.com/items?itemName=bnason-nf.findallinfile) for Visual Studio
Code.

## Usage

After installing this extension in Visual Studio Code, you will have some new commands available:

- **Find All In File: Find Regex (Case Insensitive)**
  Search using a case insensitive [regular
  expression](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).
- **Find All In File: Find Regex (Case Insensitive, Whole Word)**
  Search using a case insensitive regular expression, match whole word.
- **Find All In File: Find Regex (Case Sensitive)**
  Search using a case sensitive regular expression.
- **Find All In File: Find Regex (Case Sensitive, Whole Word)**
  Search using a case sensitive regular expression, match whole word.
- **Find All In File: Find String (Case Insensitive)**
  Search using a simple case insensitive string.
- **Find All In File: Find String (Case Insensitive, Whole Word)**
  Search using a simple case insensitive string, match whole word.
- **Find All In File: Find String (Case Sensitive)**
  Search using a simple case sensitive string.
- **Find All In File: Find String (Case Sensitive, Whole Word)**
  Search using a simple case sensitive string, match whole word.

All of these combinations match the corresponding options in the built-in Visual Studio Code
[Search](https://code.visualstudio.com/docs/editor/codebasics#_search-across-files) interface.

You can use these commands from the
[Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)
by typing `"Find All In File"`, then selecting the command variant you want to use.

You can can also access these from the editor context menu by right mouse clicking on an open
document. The same commands are available, with slightly different names:

- **Find Regex (Case Insensitive)**
- **Find Regex (Case Insensitive, Whole Word)**
- **Find Regex (Case Sensitive)**
- **Find Regex (Case Sensitive, Whole Word)**
- **Find String (Case Insensitive)**
- **Find String (Case Insensitive, Whole Word)**
- **Find String (Case Sensitive)**
- **Find String (Case Sensitive, Whole Word)**

For all of these commands you will first be asked to enter a search string. If you have text
selected in your document, that should be the default search string. If you have done any previous
searches, those should also be available in your search history list under that. Of course you can
also type in a new search string as well. Once you finish entering the string, the extension will
search the current document and display the results.

The results of your search (all the matching occurrences of the string or regex) will show up in
the Find All In File
[Side Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_basic-layout). You can
also manually show the Find All In File Side Bar by selecting the corresponding icon in the
[Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_activity-bar). You can
use these results to quickly preview the matches that were found. If you hover on one of the
results, a tooltip will show the complete result details if that information isn't fully visible
otherwise. If you click on one of the results, it will take you to that location in the document,
and the matching text will be selected. It's also possible to view the results view at any time by
using the "**Find All In File: Focus on View**" command. The format of these results is:

`[Match Number] [Line Number]:[Start Column]-[End Column] [Text of matching line from file]`

The first and last lines in the Side Bar are special. The first line shows you the search you
performed, and the last line shows you the summary of the search results. If you select either of
these lines, the entire search results will be copied to the clipboard so you can use text
processing tools to interact with the results.

## Settings

There is a section called "Find All In File" in the Visual Studio Code
[settings](https://code.visualstudio.com/docs/getstarted/settings).

If you don't want to Find All In File to add items to your editor context menu, you can disable the
"Editor Context Menu" setting ("findAllInFile.editorContextMenu" in settings.json). The default is
`true` which means enabled, and setting it to `false` will disable it.

If you want to change the limit on the number of results that will be found, you can modify the
"Result Limit" setting ("findAllInFile.resultLimit" in settings.json). The default is 10000, and
you can change it to any number, or zero to disable it (no limit).

If you want to change the limit on the number of searches that will stored in the history, you can
modify the "Search History Limit" setting ("findAllInFile.searchHistoryLimit" in settings.json).
The default is 10, and you can change it to any number between 1 and 100 inclusive.

If you want to change the number of characters to keep on both sides of matching results, you can
modify the "Trim Keep Count" setting ("findAllInFile.trimKeepCount" in settings.json). The default
is 15, and you can change it to any number, where zero means only show the matching portion of the
result with no extra characters, and a very large number will show the whole line. This value only
affects the results in the Side Bar, not in the tooltip that shows when you hover over one of the
results.

## Note

There is a [GitHub issue](https://github.com/microsoft/vscode/issues/14836) requesting this feature
be integrated into Visual Studio Code. If that ever happens then this extension will become
obsolete (we all hope).

## Contributions

If you have any suggestions for improvements, find any problems, have any feedback, or would like to
provide translations for the strings in this extension, please contact me on the
[GitHub project page](https://github.com/bnason-nf/findallinfile/issues)

## Legal

Copyright &copy; 2019 Benbuck Nason.

Released under the [ISC license](https://opensource.org/licenses/ISC).

## Build Status

![CI](https://github.com/bnason-nf/findallinfile/workflows/CI/badge.svg)
