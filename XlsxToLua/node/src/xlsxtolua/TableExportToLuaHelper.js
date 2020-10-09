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
        content += "={";
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
    content += fieldInfo.fieldName;
    content += "=";
    content +=  fieldInfo.data[row];
    content += ","
    return content;
}


TableExportToLuaHelper.prototype = {
    constructor: TableExportToLuaHelper,

}

module.exports = TableExportToLuaHelper;
