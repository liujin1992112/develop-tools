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
        let tableInfo = TableAnalyzeHelper._AnalyzeTable(sheet);
    });
}

/**
 * 解析xlsx中每一个Sheet
 * @param {*} sheet 
 */
TableAnalyzeHelper._AnalyzeTable = function(sheet) {
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
        tableInfo.dataCount = sheet.data.length - Constants.DATA_FIELD_DATA_START_INDEX;

        for (let i = 0; i < tableInfo.columnCount; i++) {
            let fieldInfo = TableAnalyzeHelper._AnalyzeOneField(sheet, tableInfo, i, null);
            tableInfo.addField(fieldInfo);
        }

        TableExportToLuaHelper.exportTableToLua(tableInfo);
        // console.log(tableInfo);
    }
}

TableAnalyzeHelper._AnalyzeOneField = function(sheet, tableInfo, columnIndex, parentField) {
    let fieldInfo = new FieldInfo();
    fieldInfo.tableName = sheet.name;
    fieldInfo.fieldName = sheet.data[Constants.DATA_FIELD_NAME_INDEX][columnIndex];
    fieldInfo.dataTypeString = sheet.data[Constants.DATA_FIELD_DATA_TYPE_INDEX][columnIndex];
    fieldInfo.dataType = DataType.analyzeDataType(fieldInfo.dataTypeString);
    fieldInfo.desc = sheet.data[Constants.DATA_FIELD_DESC_INDEX][columnIndex];
    fieldInfo.columnSeq = columnIndex;

    let dt = sheet.data;
    switch(fieldInfo.dataType) {
        case DataType.Int:
            TableAnalyzeHelper._AnalyzeIntType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Long:
            TableAnalyzeHelper._AnalyzeLongType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Float:
            TableAnalyzeHelper._AnalyzeFloatType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Bool:
            TableAnalyzeHelper._AnalyzeBoolType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.String:
            TableAnalyzeHelper._AnalyzeStringType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Lang:
            TableAnalyzeHelper._AnalyzeLangType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Date:
            TableAnalyzeHelper._AnalyzeDateType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Time:
            TableAnalyzeHelper._AnalyzeTimeType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Json:
            TableAnalyzeHelper._AnalyzeJsonType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.TableString:
            TableAnalyzeHelper._AnalyzeTableStringType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.MapString:
            TableAnalyzeHelper._AnalyzeMapStringType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Array:
            TableAnalyzeHelper._AnalyzeArrayType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        case DataType.Dict:
            TableAnalyzeHelper._AnalyzeDictType(fieldInfo, tableInfo, dt, columnIndex, parentField);
            break;
        default:
            nextFieldColumnIndex = columnIndex + 1;
            break;
    }
    console.log(fieldInfo);
    return fieldInfo;
}

TableAnalyzeHelper._AnalyzeIntType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let res = parseInt(dt[i][columnIndex]);
        if(isNaN(res)) {
            //类型转换异常处理
            let error = `表格名称:${tableInfo.tableName} 第${i}行 第${columnIndex} 数据转换为int类型错误`;
            throw new Error(error);
        }else {
            fieldInfo.data.push(res);
        }
    }
}

TableAnalyzeHelper._AnalyzeLongType= function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let res = parseInt(dt[i][columnIndex]);
        if(isNaN(res)) {
            //类型转换异常处理
            let error = `表格名称:${tableInfo.tableName} 第${i}行 第${columnIndex} 数据转换为long类型错误`;
            throw new Error(error);
        }else {
            fieldInfo.data.push(res);
        }
    }
}

TableAnalyzeHelper._AnalyzeFloatType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let res = parseFloat(dt[i][columnIndex]);
        if(isNaN(res)) {
            //类型转换异常处理
            let error = `表格名称:${tableInfo.tableName} 第${i}行 第${columnIndex} 数据转换为float类型错误`;
            throw new Error(error);
        }else {
            fieldInfo.data.push(res);
        }
    }
}

TableAnalyzeHelper._AnalyzeBoolType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let inputData = dt[i][columnIndex].toLowerCase().trim();
        if("1" == inputData || "true" == inputData) {
            fieldInfo.data.push(true);
        }else if("0" == inputData || "false" == inputData) {
            fieldInfo.data.push(false);
        }//TODO:类型转换异常处理
    }
}

TableAnalyzeHelper._AnalyzeStringType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let inputData = dt[i][columnIndex].toLowerCase().trim();
        fieldInfo.data.push(inputData);
    }
}

TableAnalyzeHelper._AnalyzeLangType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeDateType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeTimeType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeJsonType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeTableStringType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeMapStringType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeArrayType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeDictType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}


module.exports = TableAnalyzeHelper;