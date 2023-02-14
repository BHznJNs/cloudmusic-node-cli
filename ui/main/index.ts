import inquirer from "inquirer"
import playerPage from "../playerPage/index.js"
import userPlayLists from "../userPlayLists/index.js"
import recommendSongs from "../recommendSongs/index.js"
import recommendPlayLists from "../recommendPlayLists/index.js"
import showSearch from "../search/index.js"

const pageMap = new Map([
    ["播放器", playerPage],
    ["我的歌单", userPlayLists],
    ["每日推荐歌曲", recommendSongs],
    ["每日推荐歌单", recommendPlayLists],
    ["搜索", showSearch],
])

export default async function() {
    globalThis.CurrentPageID = 3

    const { targetPage } =
        await inquirer.prompt([
            {
                type: "list",
                name: "targetPage",
                message: "主界面",
                choices: [
                    "播放器",
                    "我的歌单",
                    "每日推荐歌曲",
                    "每日推荐歌单",
                    "搜索",
                ]
            }
        ])
    await (pageMap.get(targetPage))()
}