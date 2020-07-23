import { CancellationToken, Definition, DefinitionLink, DefinitionProvider, Location, Position, ProviderResult, Range, TextDocument, Uri as URI, workspace, window, TextEditorCursorStyle } from 'vscode'

// TODO: annotations
export class LookupProvider implements DefinitionProvider {

    // TODO: annotations
    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | DefinitionLink[]> {

        // TEMP DEBUG
        const debugPosition = (position: Position) => `{line: ${position.line}, char: ${position.character}}`
        console.log(`LookupProvider.provideDefinition ${debugPosition(position)}!`)
        const lookup = (() => {
            const range = document.getWordRangeAtPosition(position)
            if(!range || !range.isSingleLine) return null
            //console.log(` position range is {end: ${debugPosition(range.end)}, start: ${debugPosition(range.start)}}`)
            return document.lineAt(position.line).text.substr(range.start.character, range.end.character - range.start.character)
        })()
        if(!lookup) return

        // Debug
        console.log(` lookup is '${lookup}'`)

        // TEMP RETURN
        return new Location(URI.file(`${workspace.rootPath}/temp_source.ts`), new Range(new Position(0, 0), new Position(0, 0)))
        // NOTE: opens document in new tab (what about the inline view)?
        // NOTE: most importantly, how best to render result when it comes to Zope resource lookup?
    }

}