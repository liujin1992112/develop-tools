const xxtea = require("./3rd/xxtea/xxtea");

//导入文件操作库
const fs = require('fs');

//导入node的process进程库
const process = require('process');

const FileUtil = require("./utils/file-util")

//npm install commander
const program = require('commander');

const { Stats } = require("fs");

const path = require("path");


program
    .version('0.0.1')
    .option('-i, --in', 'in dir')
    .option('-o, --out', 'out dir')
    .option('-ek, --ek', 'out file type(json、js)')
program.parse(process.argv);
const options = program.opts();

console.log(options);
console.log(program.args);

let inDir, outDir, outType;
if (options.in) {
    inDir = program.args[0];
}
if (options.out) {
    outDir = program.args[1];
}

let file_filters = [".png", ".jpg", ".jpeg"];

/**
 * 判断是否为图片资源
 */
function isImage(filePath) {
    for (const ext of file_filters) {
        if (filePath.endsWith(ext)) {
            return true;
        }
    }
    return false;
}

FileUtil.map(inDir, (filePath, stat) => {
    let ext = path.extname(filePath);
    if (isImage(ext)) {
        console.log(filePath);
        // console.log(FileUtil.read(path));
    }
});

var str = "Hello World! 你好，中国🇨🇳！";
var key = "1234567890";
// var encrypt_data = xxtea.encrypt(str, key);
var encrypt_data = xxtea.encryptToString(str, key);
console.log(encrypt_data);
var decrypt_data = xxtea.decryptToString(encrypt_data, key);
console.log(decrypt_data);
console.assert(str === decrypt_data);
