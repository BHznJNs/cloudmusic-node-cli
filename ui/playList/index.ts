import inquirer from "inquirer"
import songItemTemplate from "../../utils/songItemTemplate/index.js"
import getIndex from "../../utils/getIndex/index.js"
import playQueue from "../../utils/playQueue/index.js"
import songInfoResolve, { SongInfo } from "../../utils/songInfoResolve/index.js"

export default async function(songArr: Array<any>, msg: string) {
    const displaySongArr: Array<string> =
        songArr.map((item, index) => songItemTemplate(item, index + 2))
    displaySongArr.unshift("1. 播放全部")
    displaySongArr.unshift("0. 返回上一级")

    while (true) {
        const { targetSong } =
            await inquirer.prompt([
                {
                    type: "list",
                    name: "targetSong",
                    message: msg,
                    choices: displaySongArr
                }
            ])
        const targetSongIndex: number = getIndex(targetSong)
        if (!targetSongIndex) {
            break
        } else if (targetSongIndex === 1) {
            playQueue.value = songArr
            continue
        }

        const targetSongObj: any = songArr[targetSongIndex - 2]
        const songInfo: SongInfo = songInfoResolve(targetSongObj)
        if (!songInfo.access) continue

        playQueue.stop()
        globalThis.Player.src = songInfo.url
        globalThis.Player.play()
    }
}