import Player from "@bhznjns/node-mp3-player";
import playQueue from "../playQueue/index.js";
globalThis.CurrentPageID = 0;
globalThis.IsInputting = false;
globalThis.Player = new Player();
globalThis.PlayInfo = {
    name: null,
    id: 0,
    album: {
        name: null,
        id: 0,
    },
    artists: null,
};
globalThis.CurrentPlayList = null;
globalThis.User = {
    cookie: null,
    id: null,
};
process.stdin.on("keypress", (char, key) => {
    const player = globalThis.Player;
    const { name, ctrl, shift } = key;
    switch (name) {
        case "w":
            if (shift) {
                player.volume += 0.02;
                console.log("\n当前音量: " + player.volume.toFixed(2));
            }
            break;
        case "s":
            if (shift) {
                player.volume -= 0.02;
                console.log("\n当前音量: " + player.volume.toFixed(2));
            }
            break;
        case "x":
            if (shift)
                console.log("\n" + playQueue.toggleMode());
            break;
        case "left":
            if (playQueue.value)
                playQueue.previous();
            break;
        case "right":
            if (playQueue.value)
                playQueue.next();
            break;
        case "space":
            (player.isPlaying) ? player.stop() : player.resume();
            break;
        case "c":
            if (ctrl)
                process.exit();
            break;
    }
});
