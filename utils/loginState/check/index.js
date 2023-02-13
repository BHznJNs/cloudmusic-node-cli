import NCMApi from "NeteaseCloudMusicApi";
const { login_status } = NCMApi;
export default async function () {
    let res;
    try {
        res = await login_status({
            cookie: globalThis.User.cookie
        });
    }
    catch {
        console.log("获取登录状态失败, 请检查网络连接");
        process.exit();
    }
    return Boolean((res.body.data["code"] === 200) &&
        (res.body.data["profile"]) &&
        (res.body.data["account"].id === globalThis.User.id));
}
