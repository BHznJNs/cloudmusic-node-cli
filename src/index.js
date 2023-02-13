import "../utils/global/index.js";
import { checkFileExist, mkDir, readData } from "../utils/fileOps/index.js";
import filePaths from "../utils/filePaths/index.js";
import checkLoginState from "../utils/loginState/check/index.js";
import ui from "../ui/index.js";
const { dataFolder } = filePaths;
if (!checkFileExist(dataFolder))
    mkDir(dataFolder);
let isLoggedIn = checkFileExist(filePaths.userData);
(async function main() {
    if (!isLoggedIn) {
        await ui.showLoginUI();
    }
    else {
        const userDataStr = readData(filePaths.userData);
        const userDataObj = JSON.parse(userDataStr);
        globalThis.User.cookie = userDataObj["cookie"];
        globalThis.User.id = userDataObj["userID"];
        isLoggedIn = await checkLoginState();
        if (!isLoggedIn)
            return await main();
    }
    while (true)
        await ui.showMainUI();
})();
