Zope Extension
==============

Adds extra functionality to Visual Studio Code when developing Zope applications.

### Fundamentals

The extension does **absolutely nothing** unless you explicitly tell it to. There are no file parsers running in the background for any open projects.

You can register a directory on your file system as a zope project using the _Register Project_ button and then VSC will remember to activate the plugin whenever you work in that folder.

No changes to files are ever made. The extension simply offers tailored ways to navigate your project, automatically sets language types when no extensions are present and allows you to follow references to other files, when using peek definition and via the lookup command.

### Contributing

Please do! PRs welcome at the [github repo](https://github.com/CraicOverflow89/vsc-zope/).

### Tasks

 - maintain the tree view with project files organised around type
 - recognise python files (without extension) and set file type automatically for those documents
    - first line starts with "## Script (Python)"
 - recognise sql files (if possible - might need to register these in a cache of choices?)
 - import the dtml language description (will need to be set for files with no extension)
 - test registration of directory when using workspaces
 - add command to determine where file is in hierachy when using references that look them up
    - continue work with the `LookupProvider` that points to result when _peek definition_ is used

### Issues

 - looks like `zope-active` context value is currently being set later than `viewsWelcome` is checking it