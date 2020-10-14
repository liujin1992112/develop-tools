const DataType = require("./DataType")

var FieldInfo = function() {
    this.tableName = null;//该字段所在表格
    this.fieldName = null;//字段名
    this.dataType = DataType.Invalid;//字段数据类型
    this.dataTypeString = null;//声明字段数据类型的字符串
    this.desc = null;//字段描述
    this.columnSeq = 0;//该字段在表格中的列号（从0计）

    //如果该字段是array或dict的子元素，存储其父元素的引用
    this.parentField = null;

    //如果该字段不是集合类型，直接依次存储该字段下的所有行的数据，否则存储每行定义的该集合数据是否有效
    this.data = new Array();

    // 如果该字段是array或dict类型，其下属的字段信息存放在该变量中
    this.childField = new Array();

    //array类型的子元素的数据类型
    this.arrayChildDataType = DataType.Invalid;
    //array类型的子元素的数据类型字符串
    this.arrayChildDataTypeString = null; 
}

FieldInfo.prototype = {
    constructor:FieldInfo,

    getDataCount: function() {
        return this.data ? this.data.length : 0;
    }
}
module.exports = FieldInfo;