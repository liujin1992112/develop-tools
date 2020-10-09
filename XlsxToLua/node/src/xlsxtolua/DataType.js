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

DataType.analyzeDataType = function(dataTypeString) {
    let typeString = dataTypeString.toLowerCase();
    switch(typeString) {
        case "int":
            return DataType.Int;
        case "long":
            return DataType.Long;
        case "float":
            return DataType.Float;
        case "bool":
            return DataType.Bool;
        case "string":
            return DataType.String;
        case "date":
            return DataType.Date;
        case "time":
            return DataType.Time;
        case "json":
            return DataType.Json;   
        case "tablestring":
            return DataType.TableString;
        case "array":
            return DataType.Array;
        case "dict":
            return DataType.Dict;
        case "mapstring":
            return DataType.MapString;
        default:
            return DataType.Invalid; 
    }
}

module.exports = DataType;