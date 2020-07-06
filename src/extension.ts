import { commands, ExtensionContext, window } from 'vscode';
import { Project } from './project';

export function activate(context: ExtensionContext) {

	// TEMP DEBUG
	console.log('Zope Extension is now active.');

	// TEST REGISTERED
	console.log(`workspace is registered: ${Project.exists(context)}`)
	// NOTE: need to make this accessible to the viewsWelcome when conditions

	// TEST PROJECT
	let project = Project.exists(context) ? new Project(context) : null;
	// NOTE: will need to create project initially and also change each time the workspace changes
	if(project != null) console.log(`data = ${project.toString()}`);

	// Command: Register
	context.subscriptions.push(commands.registerCommand('zope.register', () => {
		if(project != null) return;
		// NOTE: might want to issue warning that this directory is already registered
		window.showInformationMessage('Registered this directory as a Zope project!');
		console.log('Project registered');
		project = Project.create(context);
		console.log(`data = ${project.toString()}`);
	}));

	// Command: Lookup
	context.subscriptions.push(commands.registerCommand('zope.lookup', () => {
		if(project == null) return;
		// NOTE: might want to issue warning that command will not work outside of zope project
		console.log('Lookup routine');
		// NOTE: need to operate this on current selection
		//       could be appended to existing Peek Definition stuff or done separately?
	}));
}

export function deactivate() {}