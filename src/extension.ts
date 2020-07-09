import { commands, ExtensionContext, languages, TextEditor, window } from 'vscode'
//import * as nls from 'vscode-nls'
import { LookupProvider } from './lookup'
import { Project } from './project'

export function activate(context: ExtensionContext) {

	// NOTE: will need to re-run a lot of this each time the workspace changes

	// TEMP DEBUG
	console.log('Zope Extension is now active.')

	// TEST NLS
	//let localize = nls.config({locale: 'en-GB'})();
	// NOTE: using vscode-nls-dev package but not too much deocumentation for how to get this working

	// TEST REGISTERED
	console.log(`workspace is registered: ${Project.exists(context)}`)
	// NOTE: need to make this accessible to the viewsWelcome when conditions

	// TEST PROJECT
	let project = Project.exists(context) ? new Project(context) : null
	// NOTE: will need to create project initially and also change each time the workspace changes
	if(project != null) console.log(`data = ${project.toString()}`)

	// Active Status
	commands.executeCommand('setContext', 'zope-active', project != null)
	// NOTE: this seems too late (but it's not saying it doesn't exist at all) when it checks :/

	// Command: Register
	context.subscriptions.push(commands.registerCommand('zope.register', () => {
		if(project != null) {
			window.showErrorMessage('This directory has already been registered as a Zope project!')
			return;
		}
		window.showInformationMessage('Registered this directory as a Zope project!')
		console.log('Project registered')
		project = Project.create(context)
		commands.executeCommand('setContext', 'zope-active', true)
		console.log(`data = ${project.toString()}`)
	}))

	// Command: Lookup
	context.subscriptions.push(commands.registerCommand('zope.lookup', () => {
		if(project == null) {
			window.showErrorMessage('The folder currently open isn\'t marked as a Zope project.\n[Register Project](command:zope.register)')
			//window.showErrorMessage(localize('%view.workbench.zope-view.unregistered-folder%', '??'))
			// NOTE: could make use of %view.workbench.zope-view.unregistered-folder%
			return;
		}
		console.log('Lookup routine')
		// NOTE: need to operate this on current selection
		//       could be appended to existing Peek Definition stuff or done separately?
	}))

	// Definition: Lookup
	languages.registerDefinitionProvider({scheme: 'file', language: 'plaintext'}, new LookupProvider())
	// NOTE: will language need to be changed to dtml (if recognition does this automatically)?

	// Listener: Document Change
	window.onDidChangeVisibleTextEditors((editorList: TextEditor[]) => {
		editorList.forEach((it: TextEditor) => {
			const doc = it.document
			// NOTE: need to exit early if this is not a new document
			if(doc.isUntitled || !doc.lineCount || doc.languageId != "plaintext") return;
			if(doc.lineAt(0).text.startsWith("## Script (Python)")) {
				console.log("this document is a Python script!!")
				//doc.languageId = "python"
				// NOTE: this is read-only
			}
		})
	})
}

export function deactivate() {}