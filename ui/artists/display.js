import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import getIndex from "../../utils/getIndex/index.js";
import showPlayList from "../playList/index.js";
import showAlbums from "../albums/index.js";
const { artist_songs, artist_album } = NCMApi;
const reqMethodMap = [, , artist_songs, artist_album];
export default async function (artist) {
    const displayArr = [
        "0. 返回上一级",
        "1. 歌手名称: " + artist.name,
        "2. 歌手单曲",
        "3. 歌手专辑",
    ];
    let status = 0;
    let statusIndex = 0;
    let songsPage = 0;
    let albumPage = 0;
    while (true) {
        if (!status) {
            const { targetItem } = await inquirer.prompt([
                {
                    type: "list",
                    name: "targetItem",
                    message: "歌手详情",
                    choices: displayArr,
                }
            ]);
            statusIndex = getIndex(targetItem);
            if (!statusIndex)
                break;
        }
        let res = 0;
        const reqMethod = reqMethodMap[statusIndex];
        const page = (statusIndex === 2) ? songsPage : albumPage;
        const reqRes = await reqMethod({
            id: artist.id,
            limit: 30,
            offset: 30 * page,
        });
        const previous = Boolean(page > 0);
        const next = reqRes.body["more"];
        if (statusIndex === 2) {
            res = await showPlayList(reqRes.body.songs, artist.name + " 的单曲", {
                previous, next
            });
            status = 2;
            songsPage += res;
        }
        else if (statusIndex === 3) {
            const albumArr = reqRes.body.hotAlbums;
            res = await showAlbums(albumArr, artist.name + " 的专辑", {
                previous, next
            });
            status = 3;
            albumPage += res;
        }
        if (!res)
            status = 0;
    }
}
