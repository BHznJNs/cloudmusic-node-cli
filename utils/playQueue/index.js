import songInfoResolve from "../songInfoResolve/index.js";
const modeNames = [
    "顺序播放", "随机播放",
];
const queue = {
    __mode: 0,
    get mode() {
        return modeNames[this.__mode];
    },
    toggleMode() {
        this.__mode = this.__mode ^ 1;
        return "已切换为" + modeNames[this.__mode];
    },
    __currentQueue: null,
    __currentIndex: -1,
    __currentMaxIndex: -1,
    get index() {
        return this.__currentIndex;
    },
    get value() {
        return this.__currentQueue;
    },
    set value(newPlayList) {
        globalThis.CurrentPlayList = newPlayList;
        this.__currentQueue = newPlayList;
        this.__currentMaxIndex = newPlayList.length;
        this.next();
    },
    previous() {
        this.__currentIndex = (this.__currentIndex - 1) % this.__currentMaxIndex;
        this.__start();
    },
    next() {
        if (this.__mode === 0) {
            this.__currentIndex = (this.__currentIndex + 1) % this.__currentMaxIndex;
        }
        else {
            this.__currentIndex = Math.round(Math.random() * (this.__currentMaxIndex - 1));
        }
        this.__start();
    },
    async __start() {
        const currentSong = this.__currentQueue[this.__currentIndex];
        const songInfo = songInfoResolve(currentSong);
        if (songInfo.access) {
            console.log("\n现在播放: " + songInfo.name);
            globalThis.Player.src = songInfo.url;
            await globalThis.Player.play();
            globalThis.Player.onended = this.next.bind(this);
        }
        else {
            this.next();
        }
    },
    stop() {
        this.__currentIndex = -1;
        this.__currentMaxIndex = -1;
        this.__currentQueue = null;
    },
};
export default queue;
