import Player from "@bhznjns/node-mp3-player"

/*
PageIDList: {
    0: null,
    1: LoginPage,
    2: MainPage,
    3: UserPlayLists,
    4: RecommendSongs,
    5: RecommendPlayLists,
}
*/

globalThis.CurrentPageID = 0
globalThis.IsInputting   = false
globalThis.Player = new Player()
globalThis.User   = {
    cookie: null,
    id: null,
}

// 全局按键监听
process.stdin.on("keypress", (char, key) => {
    const player = globalThis.Player
    const { name, ctrl, shift } = key

    switch (name) {
        case "w":
            if (shift) {
                player.volume += 0.02
                console.log("\n当前音量: " + player.volume.toFixed(2))
            }
            break
        case "s":
            if (shift) {
                player.volume -= 0.02
                console.log("\n当前音量: " + player.volume.toFixed(2))
            }
            break
        case "space":
            (player.isPlaying) ? player.stop() : player.resume()
            break
        case "c":
            if (ctrl) process.exit()
            break
    }
})
