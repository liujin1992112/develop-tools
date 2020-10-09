const Constants = require("../utils/Constants")
const TableInfo = require("./TableInfo")
const FieldInfo = require("./FieldInfo")
const DataType = require("./DataType")
const TableExportToLuaHelper = require("./TableExportToLuaHelper")

var TableAnalyzeHelper = {};

/**
 * 解析xlsl
 * @param {*} sheetList 
 */
TableAnalyzeHelper.analyzeXlsx = function(sheetList) {
    sheetList.forEach((sheet) => {
        // console.log(sheet)
        let tableInfo = TableAnalyzeHelper._analyzeTable(sheet);
    });
}

/**
 * 解析xlsx中每一个Sheet
 * @param {*} sheet 
 */
TableAnalyzeHelper._analyzeTable = function(sheet) {
    let tableName = sheet.name;
    if (tableName.indexOf(Constants.EXCEL_INVALIS_SHEET_NAME) == 0) {
        return null;
    }else {
        if (sheet.data.length <= Constants.DATA_FIELD_DATA_START_INDEX) {
            console.error("每张数据表前三行分别字段变量名、声明字段描述、字段数据类型")
            return null;
        }
    
        if (sheet.data[0].length < 2) {
            return null;
        }
        let tableInfo = new TableInfo();
        tableInfo.tableName = tableName;
        tableInfo.rowCount = sheet.data.length;
        tableInfo.columnCount = sheet.data[Constants.DATA_FIELD_NAME_INDEX].length;
        tableInfo.analyzeFieldInfo(sheet);
        TableExportToLuaHelper.exportTableToLua(tableInfo);
        // console.log(tableInfo);
    }
}
module.exports = TableAnalyzeHelper;