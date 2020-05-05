# Find All In File

This is an extension for [Visual Studio Code](https://code.visualstudio.com/) that allows you to search for all the occurrences of a search string in the current file.

Additionally, you can also view this extension directly on the Visual Studio Code [Marketplace page for Find All In file](https://marketplace.visualstudio.com/items?itemName=bnason-nf.findallinfile).

# Usage

After installing this extension in Visual Studio Code, you should have some new commands available:

- **Find All In File: Regex** - search using a [regular expression](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).
- **Find All In File: Case Sensitive String** - does a simple case-sensitive text search.
- **Find All In File: Case Insensitive String** - does a simple case-insensitive text search.

You can use these commands from the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette), then typing `"Find All In File"` and selecting the variant you want to use.

Alternately, you can bring up the context menu by right mouse clicking on an open editor document, and the same commands should be available, with slightly different names:

- **Find Regex**
- **Find Case Sensitive String**
- **Find Case Insensitive String**

For any of these methods you will first be asked to enter a search string, and then all the matching occurrences of your search should show up in the Output window in the `Find All In File` channel. Please note that this list does not have any support for selecting an occurrence to go to that location in the file.

# Legal

Copyright 2019 Benbuck Nason.

Released under the [ISC license](https://opensource.org/licenses/ISC).
