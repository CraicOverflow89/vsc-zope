import { commands, ExtensionContext, languages, TextEditor, window } from 'vscode'
import { LookupProvider } from './lookup'
import { Project } from './project'

/**
 * Activates the extension
 *
 * @param context The extension context
 */
export function activate(context: ExtensionContext) {

	// Debug
	console.log('Zope Extension is now active.')
	// TODO: remove this when done (or only print when in debug mode?)

	// Context Status
	const contextUpdate = (isActive: boolean) => {
		commands.executeCommand('setContext', 'zope-active', isActive)
	}

	// Initialise Project
	Project.init(context)

	// TODO: this needs to happen on workspace change
	//       although this whole activate method IS being called again on workspace change
	const project = Project.load('')
	// TODO: need to pass current directory

	// Debug
	console.log(`workspace is registered: ${project.exists()}`)
	console.log(`data = ${project.toString()}`)
	// TODO: remove this when done (or only print when in debug mode?)

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
		// TODO: remove this when done (or only print when in debug mode?)
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
		// TODO: need to operate this on current selection
		//       could be appended to existing Peek Definition stuff or done separately?
		// TODO: remove this when done (or only print when in debug mode?)
	}))

	// Definition: Lookup
	languages.registerDefinitionProvider({scheme: 'file', language: 'dtml'}, new LookupProvider())

	// Listener: Document Change
	window.onDidChangeVisibleTextEditors((editorList: TextEditor[]) => {

		// TODO: need to check only newly opened editors here

		// Iterate Editors
		editorList.forEach((it: TextEditor) => {

			// No Change
			const doc = it.document
			if(doc.isUntitled || !doc.lineCount || doc.languageId != 'plaintext') return

			// Update Language
			const firstLine = doc.lineAt(0).text
			languages.setTextDocumentLanguage(doc, (() => {

				// Detect Python
				if(firstLine.startsWith("## Script (Python)")) return 'python'
	
				// Detect SQL
				else if(firstLine.startsWith("<params>")) return 'sql'
	
				// Default DTML
				return 'dtml'
			})())
		})
	})
}

/**
 * Deactivates the extension
 */
export function deactivate() {}