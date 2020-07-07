import { CancellationToken, Definition, DefinitionLink, DefinitionProvider, Location, Position, ProviderResult, Range, TextDocument, Uri as URI, workspace } from 'vscode';

export class LookupProvider implements DefinitionProvider {

    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | DefinitionLink[]> {

        // TEMP DEBUG
        console.log("LookupProvider.provideDefinition invoked!")

        // TEMP RETURN
        return new Location(URI.file(`${workspace.rootPath}/temp_source.ts`), new Range(new Position(0, 0), new Position(0, 1)))
        // NOTE: opens document in new tab (what about the inline view)?
        // NOTE: most importantly, how best to render result when it comes to Zope resource lookup?
    }

}