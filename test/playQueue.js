const arr = [
    {
        name: "aaa",
        id: 111,
    },
    {
        name: "bbb",
        id: 222,
    },
    {
        name: "ccc",
        id: 333,
    },
]

const queue = {
    __currentQueue: null,
    __currentIndex: -1,
    __currentMaxIndex: -1,

    set value(newVal) {
        this.__currentQueue = newVal
        this.__currentMaxIndex = newVal.length
        this.next()
    },

    next() {
        this.__currentIndex = (this.__currentIndex + 1) % this.__currentMaxIndex
        this.start()
    },

    start() {
        const current = this.__currentQueue[this.__currentIndex]

        console.log(current)
        // play code

        setTimeout(() => {
            this.next()
        }, 5000)
    },
}

queue.value = arr
