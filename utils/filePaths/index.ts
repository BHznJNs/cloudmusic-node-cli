import * as path from "node:path"

const currentPath: string = path.resolve()
const dataFolderPath: string = path.join(currentPath, "/data/")

export default {
    dataFolderPath,
    userData: dataFolderPath + "userData.json"
}