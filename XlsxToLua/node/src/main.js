/**
 * vscode快捷键  
 * ctrl + 向上箭头 ： 将当前行向上移动
 * ctrl + 向下箭头 ： 将当前行向下移动
 * alt + shift + 向上箭头 : 将当前行向上拷贝
 * alt + shift + 向下箭头 : 将当前行向下拷贝
 */
const xlsx = require('node-xlsx');
const path = require('path');
const process = require('process');

//导入工具类
const utils = require("./utils/utils");
const Constants = require("./utils/Constants");

const TableAnalyzeHelper = require("./xlsxtolua/TableAnalyzeHelper");

function App() {
    let cwd = process.cwd();//程序的当前工作空间目录,即是vscode中的项目根目录
    console.log(`项目根目录:${cwd}`);
    console.log(`node 路径:${process.argv[0]}`);
    console.log(`程序 入口:${process.argv[1]}`);

    //将相对路径转换为绝对路径
    let cfgPath = path.resolve("config");
    let files = new Array();
    console.log("配置文件夹路径:" + cfgPath);
    utils.listFiles(cfgPath, files, false);

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
        }
    });
}

App();