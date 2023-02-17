export interface PlayListInfo {
    name: string,
    id: number,
    count: number,
}

export default function(playListItem: any) {
    const result: PlayListInfo = {
        name: playListItem.name,
        id: playListItem.id,
        count: playListItem.trackCount,
    }
    return result
}