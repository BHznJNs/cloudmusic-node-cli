import "../utils/global/index.js";
import { checkFileExist, mkDir, readData } from "../utils/fileOps/index.js";
import filePaths from "../utils/filePaths/index.js";
import ui from "../ui/index.js";
const { dataFolderPath } = filePaths;
if (checkFileExist(dataFolderPath)) {
    mkDir(dataFolderPath);
}
const isLoggedIn = checkFileExist(filePaths.userData);
(async () => {
    if (!isLoggedIn) {
        await ui.showLoginUI();
    }
    else {
        const userDataStr = readData(filePaths.userData);
        const userDataObj = JSON.parse(userDataStr);
        globalThis.User.cookie = userDataObj["cookie"];
        globalThis.User.id = userDataObj["userID"];
    }
    while (true) {
        await ui.showMainUI();
    }
})();
