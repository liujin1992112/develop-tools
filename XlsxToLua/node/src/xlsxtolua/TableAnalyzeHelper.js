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
            throw new Error("每张数据表前三行分别字段变量名、声明字段描述、字段数据类型")
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
            let fieldInfo = TableAnalyzeHelper._AnalyzeOneField(sheet.data, tableInfo, i, null);
            tableInfo.addField(fieldInfo);
        }

        TableExportToLuaHelper.exportTableToLua(tableInfo);
        // console.log(tableInfo);
    }
}

TableAnalyzeHelper._AnalyzeOneField = function(dt, tableInfo, columnIndex, parentField) {
    let fieldInfo = new FieldInfo();
    fieldInfo.tableName = tableInfo.tableName;
    fieldInfo.desc = dt[Constants.DATA_FIELD_DESC_INDEX][columnIndex];
    fieldInfo.columnSeq = columnIndex;
    fieldInfo.parentField = parentField;// 引用父FileInfo

    // 如果该字段是array类型的子元素，则不填写变量名（array下属元素的变量名自动顺序编号）
    // 并且如果子元素不是集合类型，也不需配置数据类型（直接使用array声明的子元素数据类型，子元素列不再单独配置），直接依次声明各子元素列
    if (parentField != null && parentField.dataType == DataType.Array) {
        fieldInfo.dataTypeString = parentField.arrayChildDataTypeString;
        fieldInfo.dataType = parentField.arrayChildDataType;
    }else {
        fieldInfo.fieldName = dt[Constants.DATA_FIELD_NAME_INDEX][columnIndex];
        fieldInfo.dataTypeString = dt[Constants.DATA_FIELD_DATA_TYPE_INDEX][columnIndex];
        fieldInfo.dataType = DataType.analyzeDataType(fieldInfo.dataTypeString);
    }

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
    if(parentField != null) {

    }else {
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
    for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < tableInfo.rowCount; i++) {
        let inputData = dt[i][columnIndex].toLowerCase().trim();
        if(!inputData || "" == inputData) {
            fieldInfo.data.push(null);
        }else {
            fieldInfo.jsonString.push(inputData);
            try {
                var json = JSON.parse(dt[i][columnIndex]);//JSON数据异常,捕获
                fieldInfo.data.push(json);
            } catch (error) {
                console.info(error);
            }
        }
    }
}

TableAnalyzeHelper._AnalyzeTableStringType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeMapStringType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

TableAnalyzeHelper._AnalyzeArrayType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {
    // 解析array声明的子元素的数据类型和个数
    let childDefine = TableAnalyzeHelper._GetArrayChildDefine(fieldInfo.dataTypeString);
    let childCount = childDefine.childCount;
    let childDataType = childDefine.childDataType;
    let childDataTypeString = childDefine.childDataTypeString;
    
    //array子元素类型
    fieldInfo.arrayChildDataTypeString = childDataTypeString;
    fieldInfo.arrayChildDataType = childDataType;

    console.log(childDefine)
    let seq = 1;
    let tempCount = childCount;
    while(tempCount > 0) {
        let childFieldInfo = TableAnalyzeHelper._AnalyzeOneField(dt, tableInfo, columnIndex, fieldInfo);
        if(childFieldInfo) {
            childFieldInfo.fieldName = `${seq}`;
            fieldInfo.childField.push(childFieldInfo);
            ++seq;
            --tempCount;
        }
    }
}

TableAnalyzeHelper._AnalyzeDictType = function(fieldInfo, tableInfo, dt, columnIndex, parentField) {

}

/**
 * 解析字段为array的子类型定义
 * @param {*} dataTypeString   解析形如array[type:n]（type为类型，n为array中元素个数）的array类型的声明字符串，获得子元素的类型以及子元素的个数
 */
TableAnalyzeHelper._GetArrayChildDefine = function(dataTypeString) {
    let childCount = 0;
    let childDataType = DataType.Invalid;
    let childDataTypeString = null;
    let leftBracketIndex = dataTypeString.indexOf("[");
    let rightBracketIndex = dataTypeString.lastIndexOf("]");
    if (leftBracketIndex != -1 && rightBracketIndex != -1) {
        if (leftBracketIndex < rightBracketIndex) {
             // 去掉首尾包裹的array[]
            let typeAndCountString = dataTypeString.substring(leftBracketIndex + 1, rightBracketIndex).trim();
            // 通过冒号分离类型和个数（注意不能用Split分隔，可能出现array[array[int:2]:3]这种嵌套结构，必须去找最后一个冒号的位置）
            let lastColonIndex = typeAndCountString.lastIndexOf(':');
            if (lastColonIndex == -1) {
                throw new Error(`array类型数据声明不合法，请采用array[type:n]的形式，冒号分隔类型与个数的定义，你填写的类型为${dataTypeString}`)
            }else {
                let typeString = typeAndCountString.substring(0, lastColonIndex).trim();
                let countString = typeAndCountString.substring(lastColonIndex + 1).trim();
                let inputChildDataType = DataType.analyzeDataType(typeString);
                if (inputChildDataType == DataType.Invalid) {
                    throw new Error(`array类型数据声明不合法，子类型错误，你填写的类型为${dataTypeString}`)
                }

                var count = parseInt(countString);
                if(isNaN(count)) {
                    throw new Error(`array类型数据声明不合法，声明的下属元素个数不是合法的数字，你填写的个数为${countString}`)
                }

                if(count < 1) {
                    throw new Error(`array类型数据声明不合法，声明的下属元素个数不能低于1个，你填写的个数为${countString}`)
                }

                childCount = childCount;
                childDataType = inputChildDataType;
                childDataTypeString = typeString;

                return {childCount: count, childDataType: childDataType, childDataTypeString: childDataTypeString};
            }
        }else {

        }
    }else {
        //如果字段中仅仅定义为array，则默认为string类型
    }
}


module.exports = TableAnalyzeHelper;