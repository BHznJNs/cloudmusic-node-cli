import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import filePaths from "../../utils/filePaths/index.js";
import { saveData } from "../../utils/fileOps/index.js";
const { login } = NCMApi;
export default async function showLoginUI() {
    globalThis.CurrentPageID = 1;
    globalThis.IsInputting = true;
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: "邮箱:",
        },
        {
            type: 'input',
            name: 'password',
            message: "密码:",
        },
    ]);
    let loginRes;
    try {
        loginRes = await login(answer);
    }
    catch {
        console.log("登录失败, 请重试!");
        await showLoginUI();
        return;
    }
    if (loginRes.status !== 200) {
        console.log("登录失败, 请重试!");
        await showLoginUI();
        return;
    }
    saveData(filePaths.userData, {
        userID: loginRes.body.account["id"],
        cookie: loginRes.body.cookie
    });
    globalThis.IsInputting = false;
    return true;
}
