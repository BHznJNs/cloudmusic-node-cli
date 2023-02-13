import * as path from "node:path";
const currentPath = path.resolve();
const dataFolderPath = path.join(currentPath, "/data/");
export default {
    dataFolder: dataFolderPath,
    userData: dataFolderPath + "userData.json"
};
