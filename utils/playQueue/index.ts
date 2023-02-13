import songInfoResolve, { SongInfo } from "../songInfoResolve/index.js"

/**
 * mode codes:
 * 0 -> 顺序播放
 * 1 -> 随机播放
 */

type ToggleModeMsg = string

interface PlayQueue {
    __mode: number,
    toggleMode(): ToggleModeMsg,

    __currentQueue: Array<any> | null,
    __currentIndex: number,
    __currentMaxIndex: number,

    get index(): number,
    get value(): Array<any>,
    set value(newVal: Array<any>),

    previous(): void,
    next(): void,
    __start(cb: Function): void,
    stop(): void,
}

const toggleModeMsgs: Array<string> = [
    "已切换为顺序播放",
    "已切换为随机播放",
]

const queue: PlayQueue = {
    __mode: 0,
    toggleMode() {
        // 0 -> 1 || 1 -> 0
        this.__mode = this.__mode ^ 1
        return toggleModeMsgs[this.__mode]
    },

    __currentQueue: null,
    __currentIndex: -1,
    __currentMaxIndex: -1,

    get index() {
        return this.__currentIndex
    },
    get value() {
        return this.__currentQueue
    },
    set value(newPlayList: Array<any>) {
        this.__currentQueue = newPlayList
        this.__currentMaxIndex = newPlayList.length
        this.next()
    },

    previous() {
        this.__currentIndex = (this.__currentIndex - 1) % this.__currentMaxIndex
        this.__start()
    },
    next() {
        if (this.__mode === 0) {
            this.__currentIndex = (this.__currentIndex + 1) % this.__currentMaxIndex
        } else {
            this.__currentIndex = Math.round(Math.random() * (this.__currentMaxIndex - 1))
        }
        
        this.__start()
    },
    async __start() {
        const currentSong = this.__currentQueue[this.__currentIndex]
        const songInfo: SongInfo = songInfoResolve(currentSong)

        if (songInfo.access) {
            console.log("\n现在播放: " + songInfo.name)

            globalThis.Player.src = songInfo.url
            await globalThis.Player.play()

            globalThis.Player.onended = this.next.bind(this)
        } else {
            this.next()
        }
    },
    stop() {
        this.__currentIndex = -1
        this.__currentMaxIndex = -1
        this.__currentQueue = null
    },
}

export default queue