import { ExtensionContext } from 'vscode';

export class Project {
    context: ExtensionContext
    data: ProjectData = {
        sqlFileList: []
    }

    constructor(context: ExtensionContext, load: boolean = true) {
        this.context = context
        if(load) this.load()
    }

    static create(context: ExtensionContext): Project {
        const result = new Project(context, false)
        result.save()
        return result
    }

    static exists(context: ExtensionContext): boolean {
        return context.workspaceState.get('zope-project') != null
    }

    load(): void {
        const data = this.context.workspaceState.get('zope-project')
        if(typeof data == "string") {
            this.data = JSON.parse(data) as ProjectData
        }
    }

    save(): void {
        this.context.workspaceState.update('zope-project', this.data)
    }

    toString(): string {
        return JSON.stringify(this.data)
    }
}

export interface ProjectData {
    sqlFileList: Array<string>
}