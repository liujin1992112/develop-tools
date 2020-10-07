const xlsx = require('node-xlsx');
const path = require('path');

//导入工具类
const utils = require("./utils/utils")
const Constants = require("./utils/Constants")

//将相对路径转换为绝对路径
let cfgPath = path.resolve("../config");
let files = new Array();
console.log("配置文件路径:" + cfgPath);
utils.listFiles(cfgPath, files, false);

files.forEach((filePath) => {

    let sheetList = xlsx.parse(filePath);
    sheetList.forEach((sheet) => {

    });
    console.log(filePath);
    // console.log(sheetList);
});
