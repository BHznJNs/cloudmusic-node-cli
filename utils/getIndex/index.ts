const numberCharStart: number = "0".charCodeAt(0)
const numberCharEnd  : number = "9".charCodeAt(0)
const pointCharCode  : number = ".".charCodeAt(0)

function getIndex(item: string): number {
    let numStr: string = ""

    for (const char of item) {
        const charCode = char.charCodeAt(0)
        if (numberCharStart <= charCode && charCode <= numberCharEnd) {
            numStr += char
        }
        if (charCode === pointCharCode) {
            break
        }
    }
    return Number(numStr)
}

export default getIndex