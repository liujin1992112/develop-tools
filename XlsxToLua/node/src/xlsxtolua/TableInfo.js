/**
 * xlsx中每一个Sheet对应一个TableInfo类对象
 */
const Constants = require("../utils/Constants")

const DataType = require("./DataType")
const FieldInfo = require("./FieldInfo")

var TableInfo = function() {
    this.tableName = null;
    this.rowCount = 0;//表行数
    this.columnCount = 0;//表列数
    this.dataCount = 0;//数据行数
    this.allField = new Array();
}



TableInfo.prototype = {
    constructor:TableInfo,

    /**
     * 添加表中字段数据
     * @param {*} fieldInfo 
     */
    addField: function(fieldInfo) {
        this.allField.push(fieldInfo);
    },
 
    getFieldInfo: function(column) {
        return this.allField[column];
    },

    /**
     * 获取客户端所有的字段信息
     */
    getAllClientFieldInfo: function() {
        return this.allField;
    },

    /**
     * 获取Key字段信息
     */
    GetKeyColumnFieldInfo: function() {
        if(this.allField.length > 0) {
            if(this.allField[0].fieldName.toLowerCase() == Constants.EXCEL_KEY_FIELD_NAME) {
                return this.allField[0];
            }
        }
        return null;
    },

}

module.exports = TableInfo;