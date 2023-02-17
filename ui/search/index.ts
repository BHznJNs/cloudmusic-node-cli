import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"
import searchSelection from "./searchSelection.js"

import showSongs from "../playList/index.js"
import showArtists from "../artists/index.js"
import showPlayLists from "../playLists/index.js"
import showAlbums from "../albums/index.js"

const { search } = NCMApi

const searchTypeMap: Array<number> = [
    0    , // 返回上一级
    1    , // 单曲
    100  , // 歌手
    1000 , // 歌单
    10   , // 专辑
]

export default async function() {
    // 获取搜索类型
    const searchIndex: number = await searchSelection()
    const searchType: number  = searchTypeMap[searchIndex]
    if (!searchType) return

    // 搜索关键词
    const { keywords } = await inquirer.prompt([
        {
            type: "input",
            name: "keywords",
            message: "搜索内容",
        }
    ])
    if (keywords === "" || keywords === "q") return

    let currentPage: number = 0

    while(true) {
        const searchRes: NCMApi.Response = await search({
            keywords, limit: 30,
            type: searchType,
            offset: currentPage * 30,
        })

        const { result } = searchRes.body

        const previous = Boolean(currentPage > 0)
        const next     = result["hasMore"]

        let res: number = 0
        switch(searchIndex) {
            case 1: // 单曲
                const songs: Array<any> = result["songs"]
                res = await showSongs(
                    songs, "搜索结果", {
                    previous, next
                })
                break
            case 2: // 歌手
                const artists: Array<any> = result["artists"]
                await showArtists(artists, "搜索结果")
                break
            case 3: // 歌单
                const playLists: Array<any> = result["playlists"]
                res = await showPlayLists(
                    playLists, "搜索结果", {
                    previous, next
                })
                break
            case 4: // 专辑
                const albums: Array<any> = result["albums"]
                res = await showAlbums(
                    albums, "搜索结果", {
                    previous, next
                })
                break
        }

        if (!res) break
        currentPage += res
    }
}