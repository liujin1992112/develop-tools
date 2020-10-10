const Constants = require("../utils/Constants")

const DataType = require("./DataType")


var TableExportToLuaHelper = function() {

}

// 用于缩进lua table的字符串
TableExportToLuaHelper._LUA_TABLE_INDENTATION_STRING = "\t";

// 生成lua文件上方字段描述的配置
// 每行开头的lua注释声明
TableExportToLuaHelper._COMMENT_OUT_STRING = "-- ";

// 变量名、数据类型、描述声明之间的间隔字符串
TableExportToLuaHelper._DEFINE_INDENTATION_STRING = "   ";

// dict子元素相对于父dict变量名声明的缩进字符串
TableExportToLuaHelper._DICT_CHILD_INDENTATION_STRING = "   ";

// 变量名声明所占的最少字符数
TableExportToLuaHelper._FIELD_NAME_MIN_LENGTH = 30;

// 数据类型声明所占的最少字符数
TableExportToLuaHelper._FIELD_DATA_TYPE_MIN_LENGTH = 30;

/**
 * 静态方法,获取lua脚本的缩进
 * @param {*} level 
 */
TableExportToLuaHelper.getLuaTableIndentation = function(level) {
    let indent = "";
    for(let i = 0; i < level; i++) {
        indent += TableExportToLuaHelper._LUA_TABLE_INDENTATION_STRING;
    }
    return indent;
}

TableExportToLuaHelper.exportTableToLua = function(tableInfo) {

    // 当前缩进量
    let currentLevel = 1;
    // 生成数据内容开头
    let content = "return {\n";

    let rowCount = tableInfo.rowCount;
    let columnCount = tableInfo.columnCount;
    let dataCount = tableInfo.dataCount;
    let allField = tableInfo.getAllClientFieldInfo();
    let keyColumnField = tableInfo.GetKeyColumnFieldInfo();
    let isAddKeyToLuaTable = keyColumnField ? true : false;
    for(let row = 0; row < dataCount; row++) {
        content += TableExportToLuaHelper.getLuaTableIndentation(currentLevel);
        if(isAddKeyToLuaTable) {
            if(keyColumnField.dataType == DataType.Int || keyColumnField.dataType == DataType.Long) {
                content += `[${keyColumnField.data[row]}]`;
            }else if(keyColumnField.dataType == DataType.String) {
                content += `["${keyColumnField.data[row]}"]`;
            }
        }else {

        }
        content += `[${row}]`;
        content += " = {";
        currentLevel++;
        for(let column = 0; column < columnCount; column++) {
            content += TableExportToLuaHelper._getOneField(allField[column], row, currentLevel);
        }
        content += "}\n";
        currentLevel--;
    }

    // 生成数据内容结尾
    content += "\n}";
    console.log(content);
},

TableExportToLuaHelper._getOneField = function(fieldInfo, row, level) {
    let content = "";

    // 变量名前的缩进
    content += TableExportToLuaHelper.getLuaTableIndentation();

    // 变量名
    content += fieldInfo.fieldName;
    content += " = ";

    let value = null;
    switch(fieldInfo.dataType) {
        case DataType.Int:
        case DataType.Long:
        case DataType.Float:
            value = TableExportToLuaHelper._GetNumberValue(fieldInfo, row, level)
            break;
        case DataType.String:
            value = TableExportToLuaHelper._GetStringValue(fieldInfo, row, level);
            break;
        case DataType.Bool:
            value = TableExportToLuaHelper._GetBoolValue(fieldInfo, row, level);
            break;
        case DataType.Lang:
            value = TableExportToLuaHelper._GetLangValue(fieldInfo, row, level);
            break;
        case DataType.Date:
            value = TableExportToLuaHelper._GetDateValue(fieldInfo, row, level);
            break;
        case DataType.Time:
            value = TableExportToLuaHelper._GetTimeValue(fieldInfo, row, level);
            break;
        case DataType.Json:
            value = TableExportToLuaHelper._GetJsonValue(fieldInfo, row, level);
            break;
        case DataType.TableString:
            value = TableExportToLuaHelper._GetTableStringValue(fieldInfo, row, level);
            break;
        case DataType.MapString:
            value = TableExportToLuaHelper._GetMapStringValue(fieldInfo, row, level);
            break;
        case DataType.Dict:
        case DataType.Array:
            value = TableExportToLuaHelper._GetSetValue(fieldInfo, row, level);
            break;
    }

    content +=  value;
    content += ","
    return content;
}

TableExportToLuaHelper._GetNumberValue = function(fieldInfo, row, level) {
    if (fieldInfo.data[row] == null)
        return "nil";
    else
        return fieldInfo.data[row].ToString();
}

TableExportToLuaHelper._GetStringValue = function(fieldInfo, row, level) {
    // 将单元格中填写的英文引号进行转义，使得单元格中填写123"456时，最终生成的lua文件中为xx = "123\"456"
    // 将单元格中手工按下的回车变成"\n"输出到lua文件中，单元格中输入的"\n"等原样导出到lua文件中使其能被lua转义处理。之前做法为Replace("\\", "\\\\")，即将单元格中输入内容均视为普通字符，忽略转义的处理
    let str = new String(fieldInfo.data[row]);
    str.replace("\n", "\\n").replace("\"", "\\\"");
    
    let content = "";
    content += "\"";
    content += str;
    content += "\"";

    return content;
}

TableExportToLuaHelper._GetBoolValue = function(fieldInfo, row, level)
{
    if (fieldInfo.data[row] == true)
        return "true";
    else
        return "false";
}

TableExportToLuaHelper.prototype = {
    constructor: TableExportToLuaHelper,

}

module.exports = TableExportToLuaHelper;
