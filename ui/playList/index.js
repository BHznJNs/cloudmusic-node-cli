import inquirer from "inquirer";
import songItemTemplate from "../../utils/songItemTemplate/index.js";
import getIndex from "../../utils/getIndex/index.js";
import playQueue from "../../utils/playQueue/index.js";
import songInfoResolve from "../../utils/songInfoResolve/index.js";
export default async function (songArr, msg, opts = {}) {
    const displaySongArr = songArr.map((item, index) => songItemTemplate(item, index + 2));
    displaySongArr.unshift("1. 播放全部");
    displaySongArr.unshift("0. 返回上一级");
    const { previous, next } = opts;
    if (previous)
        displaySongArr.push(displaySongArr.length + ". 上一页");
    if (next)
        displaySongArr.push(displaySongArr.length + ". 下一页");
    while (true) {
        const { targetSong } = await inquirer.prompt([
            {
                type: "list",
                name: "targetSong",
                message: msg,
                choices: displaySongArr
            }
        ]);
        const targetSongIndex = getIndex(targetSong);
        if (!targetSongIndex) {
            return 0;
        }
        else if (targetSongIndex === 1) {
            playQueue.stop();
            playQueue.value = songArr;
            continue;
        }
        else if (targetSongIndex === displaySongArr.length - 2 && previous) {
            return -1;
        }
        else if (targetSongIndex === displaySongArr.length - 1 && next) {
            return 1;
        }
        const targetSongObj = songArr[targetSongIndex - 2];
        const songInfo = songInfoResolve(targetSongObj);
        if (!songInfo.access)
            continue;
        playQueue.stop();
        globalThis.Player.src = songInfo.url;
        globalThis.Player.play();
    }
}
