import NCMApi from "NeteaseCloudMusicApi"

const { artist_detail, artist_songs, artist_album, artist_desc } = NCMApi

const res = await artist_songs({
    id: 1080041
})
// const res = await artist_desc({
//     id: 1080041
// })
// console.log(res)
// console.log(res.body)

res.body.hotAlbums

res.body.songs // Array
console.log(res.body.songs[3])
console.log(res.body.songs[3].album)