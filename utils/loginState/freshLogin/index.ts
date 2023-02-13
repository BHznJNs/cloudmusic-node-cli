import NCMApi from "NeteaseCloudMusicApi"
import { saveData } from "../../fileOps/index.js"
import filePaths from "../../filePaths/index.js"

const { login_refresh } = NCMApi

export default async function freshLogin(times=0): Promise<boolean> {
    // 最多重试三次
    if (times > 3) return false

    let res: NCMApi.Response
    try {
        res = await login_refresh({
            cookie: globalThis.User.cookie
        })
    } catch {
        console.log("用户登录状态刷新失败, 请检查网络")
        return await freshLogin(times+1)
    }

    if (res.body.code === 200) {
        const newCookie = res.body.cookie
        saveData(filePaths.userData, {
            userID: globalThis.User.id,
            cookie: newCookie
        })
        globalThis.User.cookie = newCookie
        return true
    } else {
        console.log("用户登录状态异常")
        return false
    }
}