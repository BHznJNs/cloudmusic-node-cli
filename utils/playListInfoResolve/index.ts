export interface PlayListInfo {
    name: string,
    id: number,
}

export default function(playListItem: any) {
    const result: PlayListInfo = {
        name: playListItem.name,
        id: playListItem.id
    }
    return result
}