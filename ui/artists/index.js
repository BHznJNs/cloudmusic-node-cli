import inquirer from "inquirer";
import displayArtist from "./display.js";
import getIndex from "../../utils/getIndex/index.js";
export default async function (artists) {
    if (!artists || !artists.length)
        return;
    if (artists.length === 1) {
        await displayArtist(artists[0]);
    }
    else {
        const displayArr = artists.map((artist, index) => `${index + 1}. ${artist.name}`);
        displayArr.unshift("0. 返回上一级");
        const { targetArtist } = await inquirer.prompt([
            {
                type: "list",
                name: "targetArtist",
                message: "选择歌手",
                choices: displayArr,
            }
        ]);
        const targetArtistIndex = getIndex(targetArtist);
        if (!targetArtistIndex)
            return;
        const targetArtistObj = artists[targetArtistIndex - 1];
        await displayArtist(targetArtistObj);
    }
}
