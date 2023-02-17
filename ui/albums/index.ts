import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"
import getIndex from "../../utils/getIndex/index.js"
import showAlbum from "../playList/index.js"
import playListInfoResolve, { PlayListInfo } from "../../utils/playListInfoResolve/index.js"

const { album } = NCMApi

export default async function(
    albums: Array<any>,
    msg: string,
    opts: {previous?: boolean, next?: boolean} = {},
) {
    const displayAlbumArr: Array<string> = 
    albums.map((item, index) => `${index + 1}. ${item.name}`)
    displayAlbumArr.unshift("0. 返回上一级")
    const { previous, next } = opts
    if (previous) displayAlbumArr.push(displayAlbumArr.length + ". 上一页")
    if (next)     displayAlbumArr.push(displayAlbumArr.length + ". 下一页")

    while(true) {
        const { targetAlbum } = await inquirer.prompt([
            {
                type: "list",
                name: "targetAlbum",
                message: msg,
                choices: displayAlbumArr,
            }
        ])
        const targetAlbumIndex: number = getIndex(targetAlbum)
        if (!targetAlbumIndex) {
            break
        } else if (targetAlbumIndex === displayAlbumArr.length - 2 && previous) {
            return -1 // 上一页
        } else if (targetAlbumIndex === displayAlbumArr.length - 1 && next) {
            return 1 // 下一页
        }


        const albumInfo: PlayListInfo = playListInfoResolve(albums[targetAlbumIndex - 1])
        const { name, id } = albumInfo

        let albumDetail: NCMApi.Response
        try {
            albumDetail = await album({ id })
        } catch {
            console.log(`歌单: \"${name}\"数据获取失败, 请检查网络连接`)
            continue
        }

        const { songs } = albumDetail.body
        await showAlbum(songs as Array<any>, "专辑: " + name)
    }
    return 0
}