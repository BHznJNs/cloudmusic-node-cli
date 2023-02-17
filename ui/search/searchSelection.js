import inquirer from "inquirer";
import getIndex from "../../utils/getIndex/index.js";
const selectionArr = [
    "0. 返回上一级",
    "1. 单曲",
    "2. 歌手",
    "3. 歌单",
    "4. 专辑",
];
export default async function () {
    const { searchType } = await inquirer.prompt([
        {
            type: "list",
            name: "searchType",
            message: "搜索模式",
            choices: selectionArr
        }
    ]);
    return getIndex(searchType);
}
