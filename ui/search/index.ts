import inquirer from "inquirer"
import NCMApi from "NeteaseCloudMusicApi"

const { search } = NCMApi

// const res = await search({
//     keywords: "yorushika",
// })
// console.log(res)
// console.log(res.body)
// console.log(res.body.result["songs"])
// console.log(res.body.result["hasMore"])

export default async function() {
    await inquirer.prompt([
        {
            type: "checkbox"
        }
    ])
}