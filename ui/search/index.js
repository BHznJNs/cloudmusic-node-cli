import inquirer from "inquirer";
import NCMApi from "NeteaseCloudMusicApi";
const { search } = NCMApi;
export default async function () {
    await inquirer.prompt([
        {
            type: "checkbox"
        }
    ]);
}
