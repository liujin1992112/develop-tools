/**
 * xlsx中数据类型
 */
var DataType = {};
DataType.Invalid = 0;
DataType.Int = 1;
DataType.Long = 2;
DataType.Float = 3;
DataType.Bool = 4;
DataType.String = 5;
DataType.Lang = 6;
DataType.Date = 7;
DataType.Time = 8;
DataType.Json = 9;
DataType.TableString = 10;
DataType.Array = 11;
DataType.Dict = 12;
DataType.MapString = 13;

var FieldInfo = function() {
    this.tableName = null;//该字段所在表格
    this.fieldName = null;//字段名
    this.dataType = DataType.Invalid;//字段数据类型
    this.dataTypeString = null;//声明字段数据类型的字符串
    this.desc = null;//字段描述
    this.columnSeq = 0;//该字段在表格中的列号（从0计）
}

FieldInfo.prototype = {
    constructor:FieldInfo,
}

/**
 * xlsx中每一个Sheet对应一个TableInfo类对象
 */
var TableInfo = function() {
    this.tableName = null;
}

TableInfo.prototype = {
    constructor:TableInfo,
}

module.exports = DataType;
module.exports = FieldInfo;
module.exports = TableInfo;