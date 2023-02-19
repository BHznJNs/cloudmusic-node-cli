import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"
import playQueue from "../../utils/playQueue/index.js"
import getIndex from "../../utils/getIndex/index.js"
import showArtists from "../artists/index.js"
import showPlayList from "../playList/index.js"

const { album, like } = NCMApi

export default async function() {
    globalThis.CurrentPageID = 1

    while(true) {
        const playInfo = globalThis.PlayInfo
        const artistsName: string =
            (!playInfo.artists || !playInfo.artists.length) ?
                "暂无" :
                playInfo.artists
                .map(artist => artist.name)
                .join(" & ")

        const displayArr: Array<string> = [
            "0. 返回上一级",
            "1. 歌名: " + (playInfo.name || "暂无"),
            "2. 歌手: " + artistsName,
            "3. 专辑: " + (playInfo.album.name || "暂无"),
            "4. 当前播放列表",
            "5. 播放模式: " + playQueue.mode,
            "6. 音量: " + globalThis.Player.volume,
            "7. 添加收藏",
        ]

        const { targetSelection } = await inquirer.prompt([
            {
                type: "list",
                name: "targetSelection",
                message: "播放界面",
                choices: displayArr,
            }
        ])

        const targetSelectionIndex: number = getIndex(targetSelection)
        if (!targetSelectionIndex) break

        switch(targetSelectionIndex) {
            case 2: // 展示歌手页
                await showArtists(playInfo.artists)
                break
            case 3: // 展示当前歌曲所在专辑
                if (playInfo.album.id) {
                    const albumRes = await album({
                        id: playInfo.album.id
                    })
                    await showPlayList(
                        albumRes.body.songs as Array<any>,
                        playInfo.album.name + " 专辑详情"
                    )
                }
                break
            case 4: // 展示当前播放列表
                if (playQueue.value) {
                    await showPlayList(playQueue.value, "当前播放列表")
                }
                break
            case 5: // 切换播放模式
                playQueue.toggleMode()
                break
            case 7: // 喜欢歌曲
                if (!playInfo.id) break

                const likeRes: NCMApi.Response = await like({
                    id: playInfo.id,
                    cookie: globalThis.User.cookie
                })
                if (likeRes.status === 200 && likeRes.body.code === 200) {
                    console.log("歌曲喜欢成功")
                }
                break
        }
    }
}