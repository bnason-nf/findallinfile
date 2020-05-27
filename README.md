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

You can use these commands from the [Command
Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) by typing
`"Find All In File"`, then selecting the command variant you want to use.

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

For all of these commands you will first be asked to enter a search string. Once you do this, the
extension will search the current document, and all the matching occurrences of your search will
show up in the Find All In File [Side
Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_basic-layout). You can also
manually show the Find All In File Side Bar by selecting the corresponding icon in the [Activity
Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_activity-bar).

After you complete your search, you will see the results in the Side Bar. You can use these results
to quickly preview the matches that were found. If you click on one of the results, it will take you
to that location in the document, and the matching text will be selected. It's also possible to view
the results view at any time by using the "**Find All In File: Focus on View**" command.

The first and last lines in the Side Bar are special. The first line shows you the search you
performed, and the last line shows you the summary of the search results. If you select either of
these lines, the search results will be copied to the clipboard so you can use text processing tools
to interact with the results.

## Note

There is a [GitHub issue](https://github.com/microsoft/vscode/issues/14836) requesting this feature
be integrated into Visual Studio Code. If that ever happens then this extension will become
obsolete.

## Legal

Copyright &copy; 2019 Benbuck Nason.

Released under the [ISC license](https://opensource.org/licenses/ISC).
