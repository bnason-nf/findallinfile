# Find All In File

This is an extension for [Visual Studio Code](https://code.visualstudio.com/) that allows you to search for all the occurrences of a search string in the current file.

# Usage

After installing this extension in Visual Studio Code, you should have some new commands available:

- Find All In File (Regex)
- Find All In File (Case Sensitive String)
- Find All In File (Case Insensitive String)

You can use these commands from the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette), then typing `"Find All In File"` and selecting the variant you want to use.

The Regex variant of the command allows you to search using a [regular expression](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).

The Case Sensitive String variant of the command just does a simple case-sensitive text search.

The Case Insensitive String variant of the command is the same but case-insensitive.

For each of these you will first be asked to enter a search string, and then all the matching occurrences of your search should show up in the Output window in the `Find All In File` channel. Please note that this list does not have any support for selecting an occurrence to go to that location in the file.

# Legal

Copyright 2019 Benbuck Nason.

Released under the [ISC license](https://opensource.org/licenses/ISC).
