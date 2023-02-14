import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import getIndex from "../../utils/getIndex/index.js";
import showPlayList from "../playList/index.js";
import showAlbums from "../albums/index.js";
const { artist_songs } = NCMApi;
export default async function (artist) {
    const displayArr = [
        "0. 返回上一级",
        "1. 歌手名称: " + artist.name,
        "2. 歌手单曲",
        "3. 歌手专辑",
    ];
    while (true) {
        const { targetItem } = await inquirer.prompt([
            {
                type: "list",
                name: "targetItem",
                message: "歌手详情",
                choices: displayArr,
            }
        ]);
        const targetItemIndex = getIndex(targetItem);
        if (!targetItemIndex)
            break;
        if (targetItemIndex === 2) {
            const songsRes = await artist_songs({
                id: artist.id
            });
            await showPlayList(songsRes.body.songs, artist.name + " 的单曲");
        }
        else if (targetItemIndex === 3) {
            await showAlbums(artist);
        }
    }
}
