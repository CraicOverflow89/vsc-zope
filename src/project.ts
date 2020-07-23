import { ExtensionContext } from 'vscode'
import { runInThisContext } from 'vm'

// TODO: annotations
export class Project {
    static context: ExtensionContext
    static storeKey = 'zope-project'
    private path: string
    private isRegistered: boolean

    private constructor(path: string) {
        this.path = path
        this.isRegistered = this.loadData()
    }

    /**
     * Checks if the current project is registered
     *
     * @returns boolean project registered status
     */
    exists(): boolean {
        return this.isRegistered
    }

    /**
     * Collates project data for storage
     *
     * @returns object of data
     */
    private getData(): {} {
        return {
            path: this.path
        }
    }

    /**
     * Initialises the Project class
     *
     * @param context the all important ExtensionContext
     * @returns void
     */
    static init(context: ExtensionContext): void {
        Project.context = context
    }

    /**
     * Loads a new project
     *
     * @param path the project path
     * @returns Project the new Project
     */
    static load(path: string): Project {
        return new Project(path)
    }

    /**
     * Loads data from workspace storage
     *
     * @returns boolean if data was found for this workspace
     */
    private loadData(): boolean {

        // Read Data
        const data = Project.context.workspaceState.get(Project.storeKey)

        // No Data
        if(data == null) return false

        // Validate Data
        const invalidData = (value: any) => {
            // TODO: handle corrupt data
            console.error('Corrupt workspace data.', value)
            return false
        }
        if(typeof data != "object") return invalidData(data)
        // TODO: validate object contents
        //       assign values to properties
        //       throw if path is not same as value passed to constructor?

        // Report Success
        return true
    }

    /**
     * Registers the current project for extension usage
     *
     * @returns void
     */
    register(): void {
        this.saveData()
        this.isRegistered = true
    }

    /**
     * Updates data in workspace storage
     *
     * @returns void
     */
    private saveData(): void {
        Project.context.workspaceState.update(Project.storeKey, this.getData())
    }

    /**
     * Provides a string representation of the project
     *
     * @returns string project representation
     */
    toString(): string {
        return this.isRegistered ? JSON.stringify(this.getData()) : 'unregistered'
    }
}