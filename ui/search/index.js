import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
import searchSelection from "./searchSelection.js";
import showSongs from "../playList/index.js";
import showArtists from "../artists/index.js";
import showPlayLists from "../playLists/index.js";
import showAlbums from "../albums/index.js";
const { search } = NCMApi;
const searchTypeMap = [
    0,
    1,
    100,
    1000,
    10,
];
export default async function () {
    const searchIndex = await searchSelection();
    const searchType = searchTypeMap[searchIndex];
    if (!searchType)
        return;
    const { keywords } = await inquirer.prompt([
        {
            type: "input",
            name: "keywords",
            message: "搜索内容",
        }
    ]);
    if (keywords === "" || keywords === "q")
        return;
    let currentPage = 0;
    while (true) {
        const searchRes = await search({
            keywords, limit: 30,
            type: searchType,
            offset: currentPage * 30,
        });
        const { result } = searchRes.body;
        const previous = Boolean(currentPage > 0);
        const next = result["hasMore"];
        let res = 0;
        switch (searchIndex) {
            case 1:
                const songs = result["songs"];
                res = await showSongs(songs, "搜索结果", {
                    previous, next
                });
                break;
            case 2:
                const artists = result["artists"];
                await showArtists(artists, "搜索结果");
                break;
            case 3:
                const playLists = result["playlists"];
                res = await showPlayLists(playLists, "搜索结果", {
                    previous, next
                });
                break;
            case 4:
                const albums = result["albums"];
                res = await showAlbums(albums, "搜索结果", {
                    previous, next
                });
                break;
        }
        if (!res)
            break;
        currentPage += res;
    }
}
