# Find All In File

This is an extension for [Visual Studio Code](https://code.visualstudio.com/) that allows you to search for all the occurrences of a search string in the current file.

Additionally, you can also view this extension directly on the Visual Studio Code [Marketplace page for Find All In file](https://marketplace.visualstudio.com/items?itemName=bnason-nf.findallinfile).

There is a [GitHub issue](https://github.com/microsoft/vscode/issues/14836) requesting this feature be integrated into Visual Studio Code. If that ever happens then this extension would likely become obsolete.

# Usage

After installing this extension in Visual Studio Code, you should have some new commands available:

- **Find All In File: Regex**<br>
  Search using a [regular expression](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).
- **Find All In File: Case Sensitive String**<br>
  Does a simple case-sensitive text search.
- **Find All In File: Case Insensitive String**<br>
  Does a simple case-insensitive text search.

You can use these commands from the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette), then typing `"Find All In File"` and selecting the variant you want to use.

Alternately, you can bring up the editor context menu by right mouse clicking on an open document, and the same commands should be available, with slightly different names:

- **Find Regex**
- **Find Case Sensitive String**
- **Find Case Insensitive String**

For any of these methods you will first be asked to enter a search string, and then all the matching occurrences of your search should show up in the Find All In File [Side Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_basic-layout). You can also manually show the Find All In File Side Bar by selecting the corresponding icon in the [Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface#_activity-bar).

After you complete your search, you should see the results in the side bar, which you can use to quickly preview the matches that were found. If you click on one of the matches, it should take you to that location in the document with the match selected.

# Legal

Copyright 2019 Benbuck Nason.

Released under the [ISC license](https://opensource.org/licenses/ISC).
