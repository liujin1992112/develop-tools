const Constants = require("../utils/Constants")
const TableInfo = require("./XlsxInfo")
const FieldInfo = require("./XlsxInfo")
const DataType = require("./XlsxInfo")
var TableAnalyzeHelper = {};
TableAnalyzeHelper.analyzeXlsx = function(sheetList) {
    sheetList.forEach((sheet) => {
        console.log(sheet)
        TableAnalyzeHelper._analyzeTable(sheet);
        
        
    });
}

TableAnalyzeHelper._analyzeTable = function(sheet) {
    if (sheet.data.length <= Constants.DATA_FIELD_DATA_START_INDEX) {
        console.error("每张数据表前三行分别字段变量名、声明字段描述、字段数据类型")
        return null;
    }

    if (sheet.data[0].length < 2) {
        return null;
    }
    let tableName = sheet.name;
    if (tableName.indexOf(Constants.EXCEL_INVALIS_SHEET_NAME) == 0) {
        return null;
    }else {
        let tableInfo = new TableInfo();
        tableInfo.tableName = tableName;
        TableAnalyzeHelper._analyzeOneField(sheet, tableInfo, 0);
        console.log(tableInfo);
    }
}

TableAnalyzeHelper._analyzeOneField = function(sheet, tableInfo, columnIndex) {
    if (columnIndex > sheet.data[0].length) {
        console.error("需要解析的列号越界");
        return null;
    }

    let fieldInfo = new FieldInfo();
    fieldInfo.tableName = tableInfo.tableName;
    

}
module.exports = TableAnalyzeHelper;