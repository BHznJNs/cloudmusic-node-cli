export interface SongInfo {
    id: number,
    name: string,
    url: string,
    access: boolean,
}

const songFeeMsg: Object = {
    1: "VIP 歌曲，无法播放",
    4: "当前歌曲需要购买专辑",
}

const songApi = (id: number | string) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`

function songInfoResolve(songItem: any) {
    const {id, name, fee} = songItem

    const access = Boolean((fee === 0) || (fee === 8))
    if (!access) {
        console.log("\n" + songFeeMsg[fee])
    }

    globalThis.PlayInfo.id = id
    globalThis.PlayInfo.name = name
    globalThis.PlayInfo.artists = songItem.ar
    globalThis.PlayInfo.album.id = songItem.al.id
    globalThis.PlayInfo.album.name = songItem.al.name

    const result: SongInfo = {
        id, name, access,
        url: songApi(id),
    }
    return result
}

export default songInfoResolve