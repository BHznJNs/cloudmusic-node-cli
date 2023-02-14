import NCMApi from "NeteaseCloudMusicApi"

const { album, song_detail, song_url } = NCMApi

const res = await song_url({
    id: 1961264446
})

https://music.163.com/song/media/outer/url?id=1961264446.mp3

console.log(res)
console.log(res.body)

// const res = await album({
//     id: 159551943
// })

// console.log(res)
// console.log(res.body)

// res.body.songs