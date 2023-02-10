import * as fs from "node:fs";
export function mkDir(path) {
    try {
        fs.mkdirSync(path);
        return true;
    }
    catch {
        return false;
    }
}
export function checkFileExist(path) {
    try {
        fs.accessSync(path, fs.constants.W_OK || fs.constants.R_OK);
        return true;
    }
    catch {
        return false;
    }
}
export function readData(path) {
    try {
        const data = fs.readFileSync(path, {
            encoding: "utf-8"
        });
        return data;
    }
    catch (err) {
        return null;
    }
}
export function saveData(path, data) {
    const dataToSave = (typeof data === "string") ?
        data :
        JSON.stringify(data);
    fs.writeFileSync(path, dataToSave);
}
