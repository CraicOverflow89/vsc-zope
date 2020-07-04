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

	// PLACEHOLDER COMMAND
	context.subscriptions.push(commands.registerCommand('zope.register', () => {
		if(project != null) return;
		window.showInformationMessage('Registered this directory as a Zope project!');
		console.log('Project registered');
		project = Project.create(context);
		console.log(`data = ${project.toString()}`);
	}));
}

export function deactivate() {}