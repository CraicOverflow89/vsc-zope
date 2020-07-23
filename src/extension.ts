import { commands, ExtensionContext, languages, TextEditor, window } from 'vscode'
import { LookupProvider } from './lookup'
import { Project } from './project'

// TODO: annotations
export function activate(context: ExtensionContext) {

	// Debug
	console.log('Zope Extension is now active.')

	// Context Status
	const contextUpdate = (isActive: boolean) => {
		commands.executeCommand('setContext', 'zope-active', isActive)
	}

	// Initialise Project
	Project.init(context)

	// NOTE: this needs to happen on workspace change
	//       although this whole activate method IS being called again on workspace change
	const project = Project.load('')
	// NOTE: need to pass current directory

	// Debug
	console.log(`workspace is registered: ${project.exists()}`)
	console.log(`data = ${project.toString()}`)

	// Active Status
	contextUpdate(project.exists())

	// Command: Register
	context.subscriptions.push(commands.registerCommand('zope.register', () => {

		// Already Registered
		if(project.exists()) {
			window.showErrorMessage('This directory has already been registered as a Zope project!')
			return
		}

		// Register Project
		project.register()
		contextUpdate(true)
		window.showInformationMessage('Registered this directory as a Zope project!')

		// Debug
		console.log('Project registered')
		console.log(`data = ${project.toString()}`)
	}))

	// Command: Lookup
	context.subscriptions.push(commands.registerCommand('zope.lookup', () => {

		// Unregistered Project
		if(!project.exists()) {
			window.showErrorMessage('The folder currently open isn\'t marked as a Zope project.\n[Register Project](command:zope.register)')
			return
		}

		// Debug
		console.log('Lookup routine')
		// NOTE: need to operate this on current selection
		//       could be appended to existing Peek Definition stuff or done separately?
	}))

	// Definition: Lookup
	languages.registerDefinitionProvider({scheme: 'file', language: 'plaintext'}, new LookupProvider())
	// NOTE: will language need to be changed to dtml (if recognition does this automatically)?

	// Listener: Document Change
	window.onDidChangeVisibleTextEditors((editorList: TextEditor[]) => {

		// NOTE: need to check only newly opened editors here

		// Iterate Editors
		editorList.forEach((it: TextEditor) => {

			// No Change
			const doc = it.document
			if(doc.isUntitled || !doc.lineCount || doc.languageId != 'plaintext') return

			// Parse Line
			const firstLine = doc.lineAt(0).text

			// Detect Python
			if(firstLine.startsWith("## Script (Python)")) {
				languages.setTextDocumentLanguage(doc, 'python')
			}

			// Detect SQL
			else if(firstLine.startsWith("<params>")) {
				languages.setTextDocumentLanguage(doc, 'sql')
			}
		})
	})
}

// TODO: annotations
export function deactivate() {}