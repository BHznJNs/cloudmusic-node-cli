import NCMApi from "NeteaseCloudMusicApi";
import showPlayLists from "../playLists/index.js";
const { user_playlist } = NCMApi;
export default async function () {
    globalThis.CurrentPageID = 3;
    let userPlayListRes;
    try {
        userPlayListRes = await user_playlist({
            uid: globalThis.User.id
        });
    }
    catch {
        console.log("用户歌单数据获取失败, 请检查网络连接");
        return;
    }
    const { playlist: playListArr } = userPlayListRes.body;
    await showPlayLists(playListArr, "我的歌单");
}
