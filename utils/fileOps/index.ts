import * as fs from "node:fs"

export function mkDir(path: string) {
    try {
        fs.mkdirSync(path)
        return true
    } catch {
        return false
    }
}

export function checkFileExist(path: string): boolean {
    try {
        fs.accessSync(path, fs.constants.W_OK || fs.constants.R_OK)
        return true
    } catch {
        return false
    }
}

export function readData(path: string): string | null {
    try {
        const data = fs.readFileSync(path, {
            encoding: "utf-8"
        })
        return data
    } catch(err) {
        return null
    }
}

export function saveData(path: string, data: string | Object): void {
    const dataToSave: string = (typeof data === "string") ?
                                data :
                                JSON.stringify(data)
    fs.writeFileSync(path, dataToSave as string)
}