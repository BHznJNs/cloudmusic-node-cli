const songFeeMsg = {
    1: "VIP 歌曲，无法播放",
    4: "当前歌曲需要购买专辑",
};
const songApi = (id) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
function songInfoResolve(songItem) {
    const { id, name, fee } = songItem;
    const album = songItem.al || songItem.album;
    const access = Boolean((fee === 0) || (fee === 8));
    if (!access)
        console.log("\n" + songFeeMsg[fee]);
    globalThis.PlayInfo.id = id;
    globalThis.PlayInfo.name = name;
    globalThis.PlayInfo.artists = songItem.ar || songItem.artists;
    globalThis.PlayInfo.album.id = album.id;
    globalThis.PlayInfo.album.name = album.name;
    const result = {
        id, name, access,
        url: songApi(id),
    };
    return result;
}
export default songInfoResolve;
