import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import playList from "../playList/index.js";
import getIndex from "../../utils/getIndex/index.js";
import playListInfoResolve from "../../utils/playListInfoResolve/index.js";
const { user_playlist, playlist_track_all } = NCMApi;
export default async function () {
    globalThis.CurrentPageID = 3;
    let userPlayListRes;
    try {
        userPlayListRes = await user_playlist({
            uid: globalThis.User.id
        });
    }
    catch {
        console.log("用户歌单数据获取失败, 请检查网络连接");
        return;
    }
    const { playlist: playListArr } = userPlayListRes.body;
    const displayPlayListArr = playListArr
        .map((item, index) => `${index + 1}. ${item.name}`);
    displayPlayListArr.unshift("0. 返回上一级");
    while (true) {
        const { targetPlayList } = await inquirer.prompt([
            {
                type: "list",
                name: "targetPlayList",
                message: "我的歌单",
                choices: displayPlayListArr
            }
        ]);
        const targetPlayListIndex = getIndex(targetPlayList);
        if (!targetPlayListIndex)
            break;
        const playListInfo = playListInfoResolve(playListArr[targetPlayListIndex - 1]);
        const { id, name } = playListInfo;
        let playListDetail;
        try {
            playListDetail = await playlist_track_all({ id });
        }
        catch {
            console.log(`歌单: \"${name}\"数据获取失败, 请检查网络连接`);
            continue;
        }
        const { songs: songArr } = playListDetail.body;
        await playList(songArr, "我的歌单: " + name);
    }
}
