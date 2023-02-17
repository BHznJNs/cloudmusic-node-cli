import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"
import getIndex from "../../utils/getIndex/index.js"
import showPlayList from "../playList/index.js"
import showAlbums from "../albums/index.js"

const { artist_songs, artist_album } = NCMApi
const reqMethodMap: Array<undefined | Function> = 
    [,, artist_songs, artist_album]

export default async function(artist: any) {
    const displayArr: Array<string> = [
        "0. 返回上一级",
        "1. 歌手名称: " + artist.name,
        "2. 歌手单曲",
        "3. 歌手专辑",
    ]

    let status: 0 | 2 | 3 = 0 // 0 -> 重新选择 | 2 -> 选择单曲 | 3 -> 选择专辑
    let statusIndex: number = 0
    let songsPage: number = 0
    let albumPage: number = 0

    while(true) {
        if (!status) {
            const { targetItem } = await inquirer.prompt([
                {
                    type: "list",
                    name: "targetItem",
                    message: "歌手详情",
                    choices: displayArr,
                }
            ])
            statusIndex = getIndex(targetItem)
            if (!statusIndex) break
        }
        

        let res: number = 0
        const reqMethod: Function = reqMethodMap[statusIndex]
        const page: number = (statusIndex === 2) ? songsPage : albumPage
        const reqRes: NCMApi.Response = await reqMethod({
            id: artist.id,
            limit: 30,
            offset: 30 * page,
        })
        const previous: boolean = Boolean(page > 0)
        const next: boolean     = reqRes.body["more"] as boolean

        if (statusIndex === 2) {
            res = await showPlayList(
                reqRes.body.songs as Array<any>,
                artist.name + " 的单曲", {
                previous, next
            })
            status = 2
            songsPage += res
        } else if (statusIndex === 3) {
            const albumArr: Array<any> =
                reqRes.body.hotAlbums as Array<any>

            res = await showAlbums(
                albumArr,
                artist.name + " 的专辑", {
                previous, next
            })
            status = 3
            albumPage += res
        }
        if (!res) status = 0
    }
}