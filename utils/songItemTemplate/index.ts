export default function(item: any, index: number): string {
    const songName: string = item.name

    const artistsNameArr: Array<string> = []
    const artists: Array<Object> = item.ar
    for (const artist of artists) {
        artistsNameArr.push(artist["name"])
    }
    const artistsName: string = artistsNameArr.join(" & ")

    return `${index}. ${songName} --- ${artistsName}`
}