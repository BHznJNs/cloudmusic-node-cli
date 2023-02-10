import "../utils/global/index.js"
import { checkFileExist, mkDir, readData } from "../utils/fileOps/index.js"
import filePaths from "../utils/filePaths/index.js"
import ui from "../ui/index.js"

// 创建数据文件夹
const { dataFolderPath } = filePaths
if (checkFileExist(dataFolderPath)) {
    mkDir(dataFolderPath)
}

// 是否已登录
const isLoggedIn: boolean = checkFileExist(filePaths.userData)

;(async () => {
    if (!isLoggedIn) {
        await ui.showLoginUI()
    } else {
        const userDataStr: string = readData(filePaths.userData)
        const userDataObj: Object = JSON.parse(userDataStr)
        globalThis.User.cookie = userDataObj["cookie"]
        globalThis.User.id = userDataObj["userID"]
    }
    while(true) {
        await ui.showMainUI()
    }
})()
