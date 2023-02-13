import NCMApi from "NeteaseCloudMusicApi"
import showPlayLists from "../playLists/index.js"

const { recommend_resource } = NCMApi

export default async function() {
    globalThis.CurrentPageID = 5

    let recommendResourceRes: NCMApi.Response
    try {
        recommendResourceRes= await recommend_resource({
            cookie: globalThis.User.cookie
        })
    } catch(err) {
        console.log("每日推荐歌曲获取失败, 请检查网络连接")
        return
    }

    const recommendPlayListArr: Array<any> = recommendResourceRes.body.recommend as Array<any>
    await showPlayLists(recommendPlayListArr, "每日推荐歌单")
}