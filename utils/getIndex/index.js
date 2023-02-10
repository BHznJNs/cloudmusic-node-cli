const numberCharStart = "0".charCodeAt(0);
const numberCharEnd = "9".charCodeAt(0);
const pointCharCode = ".".charCodeAt(0);
function getIndex(item) {
    let numStr = "";
    for (const char of item) {
        const charCode = char.charCodeAt(0);
        if (numberCharStart <= charCode && charCode <= numberCharEnd) {
            numStr += char;
        }
        if (charCode === pointCharCode) {
            break;
        }
    }
    return Number(numStr);
}
export default getIndex;
