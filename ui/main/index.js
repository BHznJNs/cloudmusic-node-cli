import inquirer from "inquirer";
import userPlayLists from "../userPlayLists/index.js";
import recommendSongs from "../recommendSongs/index.js";
import recommendPlayLists from "../recommendPlayLists/index.js";
const pageMap = new Map([
    ["我的歌单", userPlayLists],
    ["每日推荐歌曲", recommendSongs],
    ["每日推荐歌单", recommendPlayLists],
]);
export default async function () {
    globalThis.CurrentPageID = 2;
    const { targetPage } = await inquirer.prompt([
        {
            type: "list",
            name: "targetPage",
            message: "主界面",
            choices: [
                "我的歌单",
                "每日推荐歌曲",
                "每日推荐歌单",
            ]
        }
    ]);
    await (pageMap.get(targetPage))();
}
