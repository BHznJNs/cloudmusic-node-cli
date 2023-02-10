import * as path from "node:path";
const currentPath = path.resolve();
const dataFolderPath = path.join(currentPath, "/data/");
export default {
    dataFolderPath,
    userData: dataFolderPath + "userData.json"
};
