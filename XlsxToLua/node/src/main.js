const xlsx = require('node-xlsx');
const path = require('path');

//导入工具类
const utils = require("./utils/utils")
const Constants = require("./utils/Constants")

const TableAnalyzeHelper = require("./xlsxtolua/TableAnalyzeHelper")

//将相对路径转换为绝对路径
let cfgPath = path.resolve("../config");
let files = new Array();
console.log("配置文件路径:" + cfgPath);
utils.listFiles(cfgPath, files, true);

files.forEach((filePath) => {

    let basename = path.basename(filePath);//获取文件名称
    console.log(basename.indexOf(Constants.EXCEL_TEMP_FILE_FILE_NAME_START_STRING))
    if (basename.indexOf(Constants.EXCEL_TEMP_FILE_FILE_NAME_START_STRING) == 0) {
            //如果xlsx文件的名称以此为前缀,则说明为xlsx的临时文件
    }else {
        console.info(`解析表格:${basename}`);
        let sheetList = xlsx.parse(filePath);
        TableAnalyzeHelper.analyzeXlsx(sheetList);
       
        console.log(filePath);
        // console.log(sheetList);
    }
});
