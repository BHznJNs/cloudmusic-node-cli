import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"
import getIndex from "../../utils/getIndex/index.js"
import showPlayList from "../playList/index.js"
import playListInfoResolve, { PlayListInfo } from "../../utils/playListInfoResolve/index.js"

const { playlist_track_all } = NCMApi

export default async function(
    playListArr: Array<any>,
    msg: string,
    opts: {previous?: boolean, next?: boolean} = {},
) {
    // 展示数据数组
    const displayPlayListArr: Array<string> =
        playListArr
        .map((item: any, index: number) =>
            `${index + 1}. ${item.name}`
        )
    displayPlayListArr.unshift("0. 返回上一级")
    const { previous, next } = opts
    if (previous) displayPlayListArr.push(displayPlayListArr.length + ". 上一页")
    if (next)     displayPlayListArr.push(displayPlayListArr.length + ". 下一页")
    // 展示数据数组 End

    let currentPage: number = 0
    let currentPlayList: number = -1
    let status: 0 | 1 = 0

    while(true) {
        if (!status) {
            const { targetPlayList } = 
                await inquirer.prompt([
                    {
                        type: "list",
                        name: "targetPlayList",
                        message: msg,
                        choices: displayPlayListArr
                    }
                ])
            currentPlayList = getIndex(targetPlayList)
            if (!currentPlayList) {
                break
            } else if (currentPlayList === displayPlayListArr.length - 2 && previous) {
                return -1 // 上一页
            } else if (currentPlayList === displayPlayListArr.length - 1 && next) {
                return 1 // 下一页
            }
        }

        const playListInfo: PlayListInfo = playListInfoResolve(playListArr[currentPlayList - 1])
        const { id, name, count: maxCount } = playListInfo

        let playListSongs: NCMApi.Response
        try {
            const params = {
                id, limit: 30,
                offset: 30 * currentPage,
            }
            playListSongs = await playlist_track_all(params)
        } catch(e) {
            if (e.body && e.body.msg) {
                console.log(e.body.msg)
            } else {
                console.log(`歌单: \"${name}\"数据获取失败, 请检查网络连接`)
            }
            status = 0
            continue
        }

        const { songs: songArr } = playListSongs.body
        const __previous = Boolean(currentPage > 0)
        const __next     = Boolean((currentPage + 1) * 30 < maxCount)
        const res = await showPlayList(
            songArr as Array<any>,
            "歌单: " + name, {
            previous: __previous,
            next: __next,
        })
        currentPage += res
        status = res ? 1 : 0
    }

    return 0
}
