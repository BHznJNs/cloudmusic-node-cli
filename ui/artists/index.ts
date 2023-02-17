import inquirer from "inquirer"
import displayArtist from "./display.js"
import getIndex from "../../utils/getIndex/index.js"

export default async function(artists: Array<any>, msg:string = "选择歌手") {
    if (!artists || !artists.length) return

    if (artists.length === 1) {
        // 如果只有一个歌手
        await displayArtist(artists[0])
    } else {
        // 如果有多个歌手
        const displayArr: Array<string> =
            artists.map((artist, index) => `${index + 1}. ${artist.name}`)
        displayArr.unshift("0. 返回上一级")

        const { targetArtist } = await inquirer.prompt([
            {
                type: "list",
                name: "targetArtist",
                message: msg,
                choices: displayArr,
            }
        ])
        const targetArtistIndex: number = getIndex(targetArtist)
        if (!targetArtistIndex) return // 返回上一级

        const targetArtistObj = artists[targetArtistIndex - 1]
        await displayArtist(targetArtistObj)
    }
}