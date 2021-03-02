//导入库
const fs = require("fs")
const xlsx = require('node-xlsx');
const path = require('path');
const util = require("util")
const process = require('process');
const program = require('commander');

//导入工具类
const utils = require("./utils/utils");
const DataType = require("./DataType")
const Constants = require("./utils/Constants");

let cwd = process.cwd();//程序的当前工作空间目录,即是vscode中的项目根目录
console.info(`项目根目录:${cwd}`);
console.info(`node 路径:${process.argv[0]}`);
console.info(`程序 入口:${process.argv[1]}`);

let inDir, outDir;
program
    .version('0.0.1')
    .option('-i, --in', 'in dir')
    .option('-o, --out', 'out dir')
program.parse(process.argv);
const options = program.opts();
if (options.in) {
    inDir = path.resolve(program.args[0]);
}
if (options.out) {
    outDir = path.resolve(program.args[1]);
}

function getTableIndentation(level) {
    let indent = "";
    for (let i = 0; i < level; i++) {
        indent += Constants.TABLE_INDENTATION;
    }
    return indent;
}

let destPath = outDir;
if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
}

//将相对路径转换为绝对路径
let cfgPath = inDir
let files = new Array();
console.info("配置输入文件夹路径:" + cfgPath);
console.info("配置输出文件夹路径:" + destPath);
utils.listFiles(cfgPath, files, false);
files.forEach((filePath) => {
    let absolutePath = path.resolve(filePath)
    if (absolutePath.indexOf(Constants.EXCEL_TEMP_FILE_FILE_NAME_START_STRING) == 0) {
        //如果xlsx文件的名称以此为前缀,则说明为xlsx的临时文件
    } else {
        if (path.extname(absolutePath).endsWith("xlsx") || path.extname(absolutePath).endsWith("xls")) {
            // console.log(filePath);
            // console.log(absolutePath);
            let sheetList = xlsx.parse(filePath);
            if (sheetList && sheetList.length > 0) {
                sheetList.forEach(sheet => {
                    if (sheet.name.indexOf(Constants.EXCEL_INVALIS_SHEET_NAME) == 0) {
                        //Excel默认sheet的名称前缀
                    } else {
                        // console.log(sheet);

                        let sheetName = sheet.name;
                        //字段数组名称
                        let fieldNames = sheet.data[Constants.DATA_FIELD_NAME_INDEX];
                        // console.log(fieldNames);

                        //类型数组
                        let types = new Array();
                        let dataTypeArray = sheet.data[Constants.DATA_FIELD_DATA_TYPE_INDEX];
                        dataTypeArray.forEach(element => {
                            types.push(DataType.analyzeDataType(element));
                        });

                        //数据部分
                        let level = 1;
                        let str = "var " + sheetName + "=";
                        if (types[0] == DataType.PrimaryKey) {
                            //生成Map类型json
                            //生成Array类型json
                            str += "{"
                            for (let i = Constants.DATA_FIELD_DATA_START_INDEX; i < sheet.data.length; i++) {
                                const rowData = sheet.data[i];
                                let tmpStr = Constants.LINE_BREAK + getTableIndentation(level) + "\"" + rowData[0] + "\":" + "{";
                                for (let j = 0; j < rowData.length; j++) {
                                    const colData = rowData[j];
                                    let type = types[j];
                                    let tmp = null;
                                    if (type == DataType.Int) {
                                        tmp = parseInt(colData);
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.Float) {
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                        tmp = parseFloat(colData);
                                    } else if (type == DataType.Long) {
                                        tmp = parseFloat(colData);
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.String) {
                                        tmp = colData;
                                        tmpStr += "\"" + fieldNames[j] + "\":\"" + tmp + "\"";
                                    } else if (type == DataType.Array) {
                                        let tmp = "[";
                                        if (colData && colData != "") {
                                            let arr = colData.split(",");
                                            for (let k = 0; k < arr.length; k++) {
                                                tmp += arr[k];
                                                if (k < arr.length - 1) {
                                                    tmp += ","
                                                }
                                            }
                                        }
                                        tmp += "]";
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.Json || type == DataType.Map) {
                                        tmpStr += "\"" + fieldNames[j] + "\":" + colData;
                                    } else if (type == DataType.PrimaryKey) {
                                        tmp = colData;
                                        tmpStr += "\"" + fieldNames[j] + "\":\"" + tmp + "\"";
                                    }
                                    if (j < rowData.length - 1) {
                                        tmpStr += ","
                                    }
                                }
                                tmpStr += "}"
                                str += tmpStr;
                                if (i < sheet.data.length - 1) {
                                    str += ","
                                }
                            }
                            str += Constants.LINE_BREAK;
                            str += "}";
                        } else {
                            //生成Array类型json
                            str += "["
                            for (let i = Constants.DATA_FIELD_DATA_START_INDEX; i < sheet.data.length; i++) {
                                const rowData = sheet.data[i];
                                let tmpStr = Constants.LINE_BREAK + getTableIndentation(level) + "{";
                                for (let j = 0; j < rowData.length; j++) {
                                    const colData = rowData[j];
                                    let type = types[j];
                                    let tmp = null;
                                    if (type == DataType.Int) {
                                        tmp = parseInt(colData);
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.Float) {
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                        tmp = parseFloat(colData);
                                    } else if (type == DataType.Long) {
                                        tmp = parseFloat(colData);
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.String) {
                                        tmp = colData;
                                        tmpStr += "\"" + fieldNames[j] + "\":\"" + tmp + "\"";
                                    } else if (type == DataType.Array) {
                                        let tmp = "[";
                                        if (colData && colData != "") {
                                            let arr = colData.split(",");
                                            for (let k = 0; k < arr.length; k++) {
                                                tmp += arr[k];
                                                if (k < arr.length - 1) {
                                                    tmp += ","
                                                }
                                            }
                                        }
                                        tmp += "]";
                                        tmpStr += "\"" + fieldNames[j] + "\":" + tmp;
                                    } else if (type == DataType.Json || type == DataType.Map) {
                                        tmpStr += "\"" + fieldNames[j] + "\":" + colData;
                                    } else if (type == DataType.PrimaryKey) {
                                        tmp = colData;
                                        tmpStr += "\"" + fieldNames[j] + "\":\"" + tmp + "\"";
                                    }
                                    if (j < rowData.length - 1) {
                                        tmpStr += ","
                                    }
                                }
                                tmpStr += "}"
                                str += tmpStr;
                                if (i < sheet.data.length - 1) {
                                    str += ","
                                }
                            }
                            str += Constants.LINE_BREAK;
                            str += "]";
                        }

                        str += Constants.LINE_BREAK + "module.exports=" + sheetName + ";";
                        let confPath = path.join(path.resolve(destPath), sheetName + ".js");
                        fs.writeFileSync(confPath, str);
                    }
                });
            }
        }
    }
});