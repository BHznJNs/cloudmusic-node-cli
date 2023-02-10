import NCMApi from "NeteaseCloudMusicApi";
import showPlayList from "../playList/index.js";
const { recommend_songs } = NCMApi;
export default async function () {
    globalThis.CurrentPageID = 4;
    let recommendSongRes;
    try {
        recommendSongRes = await recommend_songs({
            cookie: globalThis.User.cookie
        });
    }
    catch (err) {
        console.log("每日推荐歌曲获取失败, 请检查网络连接");
        return;
    }
    const recommendSongArr = recommendSongRes.body.data["dailySongs"];
    await showPlayList(recommendSongArr, "每日推荐");
}
