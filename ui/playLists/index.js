import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import getIndex from "../../utils/getIndex/index.js";
import showPlayList from "../playList/index.js";
import playListInfoResolve from "../../utils/playListInfoResolve/index.js";
const { playlist_track_all } = NCMApi;
export default async function (playListArr, msg, opts = {}) {
    const displayPlayListArr = playListArr
        .map((item, index) => `${index + 1}. ${item.name}`);
    displayPlayListArr.unshift("0. 返回上一级");
    const { previous, next } = opts;
    if (previous)
        displayPlayListArr.push(displayPlayListArr.length + ". 上一页");
    if (next)
        displayPlayListArr.push(displayPlayListArr.length + ". 下一页");
    let currentPage = 0;
    let currentPlayList = -1;
    let status = 0;
    while (true) {
        if (!status) {
            const { targetPlayList } = await inquirer.prompt([
                {
                    type: "list",
                    name: "targetPlayList",
                    message: msg,
                    choices: displayPlayListArr
                }
            ]);
            currentPlayList = getIndex(targetPlayList);
            if (!currentPlayList) {
                break;
            }
            else if (currentPlayList === displayPlayListArr.length - 2 && previous) {
                return -1;
            }
            else if (currentPlayList === displayPlayListArr.length - 1 && next) {
                return 1;
            }
        }
        const playListInfo = playListInfoResolve(playListArr[currentPlayList - 1]);
        const { id, name, count: maxCount } = playListInfo;
        let playListSongs;
        try {
            const params = {
                id, limit: 30,
                offset: 30 * currentPage,
            };
            playListSongs = await playlist_track_all(params);
        }
        catch (e) {
            if (e.body && e.body.msg) {
                console.log(e.body.msg);
            }
            else {
                console.log(`歌单: \"${name}\"数据获取失败, 请检查网络连接`);
            }
            status = 0;
            continue;
        }
        const { songs: songArr } = playListSongs.body;
        const __previous = Boolean(currentPage > 0);
        const __next = Boolean((currentPage + 1) * 30 < maxCount);
        const res = await showPlayList(songArr, "歌单: " + name, {
            previous: __previous,
            next: __next,
        });
        currentPage += res;
        status = res ? 1 : 0;
    }
    return 0;
}
