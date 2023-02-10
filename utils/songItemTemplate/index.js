export default function (item, index) {
    const songName = item.name;
    const artistsNameArr = [];
    const artists = item.ar;
    for (const artist of artists) {
        artistsNameArr.push(artist["name"]);
    }
    const artistsName = artistsNameArr.join(" & ");
    return `${index}. ${songName} --- ${artistsName}`;
}
