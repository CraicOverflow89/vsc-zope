import { CancellationToken, Definition, DefinitionLink, DefinitionProvider, Location, Position, ProviderResult, Range, TextDocument, Uri as URI } from 'vscode';

export class LookupProvider implements DefinitionProvider {

    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | DefinitionLink[]> {

        // TEMP DEBUG
        console.log("LookupProvider.provideDefinition invoked!")

        // TEMP RETURN
        return new Location(URI.file('./temp_source.ts/'), new Range(new Position(0, 0), new Position(0, 1)))
        // NOTE: how to get URI.file to be relative to current directory?
    }

}