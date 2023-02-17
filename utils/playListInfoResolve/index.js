export default function (playListItem) {
    const result = {
        name: playListItem.name,
        id: playListItem.id,
        count: playListItem.trackCount,
    };
    return result;
}
