import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import getIndex from "../../utils/getIndex/index.js";
import showAlbum from "../playList/index.js";
import playListInfoResolve from "../../utils/playListInfoResolve/index.js";
const { artist_album, album } = NCMApi;
export default async function (artist) {
    const albumRes = await artist_album({
        id: artist.id
    });
    const albumArr = albumRes.body.hotAlbums;
    const displayAlbumArr = albumArr.map((item, index) => `${index + 1}. ${item.name}`);
    displayAlbumArr.unshift("0. 返回上一级");
    while (true) {
        const { targetAlbum } = await inquirer.prompt([
            {
                type: "list",
                name: "targetAlbum",
                message: artist.name + " 的专辑",
                choices: displayAlbumArr,
            }
        ]);
        const targetAlbumIndex = getIndex(targetAlbum);
        if (!targetAlbumIndex)
            break;
        const albumInfo = playListInfoResolve(albumArr[targetAlbumIndex - 1]);
        const { name, id } = albumInfo;
        let albumDetail;
        try {
            albumDetail = await album({ id });
        }
        catch {
            console.log(`歌单: \"${name}\"数据获取失败, 请检查网络连接`);
            continue;
        }
        const { songs } = albumDetail.body;
        await showAlbum(songs, "专辑: " + name);
    }
}
