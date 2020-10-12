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
    this.allField = null;
}



TableInfo.prototype = {
    constructor:TableInfo,

    analyzeFieldInfo: function(sheet) {
        this.dataCount = sheet.data.length - Constants.DATA_FIELD_DATA_START_INDEX;
        this.allField = new Array();
        for (let i = 0; i < this.columnCount; i++) {
            let fieldInfo = this._analyzeOneField(sheet, i);
            this.allField.push(fieldInfo);
        }
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

    _analyzeOneField: function(sheet, columnIndex) {
        let fieldInfo = new FieldInfo();
        fieldInfo.tableName = sheet.name;
        fieldInfo.fieldName = sheet.data[Constants.DATA_FIELD_NAME_INDEX][columnIndex];
        fieldInfo.dataTypeString = sheet.data[Constants.DATA_FIELD_DATA_TYPE_INDEX][columnIndex];
        fieldInfo.dataType = DataType.analyzeDataType(fieldInfo.dataTypeString);
        fieldInfo.desc = sheet.data[Constants.DATA_FIELD_DESC_INDEX][columnIndex];
        fieldInfo.columnSeq = columnIndex;

        let data = new Array();
        fieldInfo.data = data;
        for(let i = Constants.DATA_FIELD_DATA_START_INDEX; i < this.rowCount; i++) {
            data.push(sheet.data[i][columnIndex]);
        }
        // console.log(fieldInfo)
        return fieldInfo;
    },


}

module.exports = TableInfo;