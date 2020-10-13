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
    let typeString = dataTypeString.trim();
    if (typeString.startsWith("int"))
            return DataType.Int;
    if (typeString.startsWith("long"))
        return DataType.Long;
    else if (typeString.startsWith("float"))
        return DataType.Float;
    else if (typeString.startsWith("string"))
        return DataType.String;
    else if (typeString.startsWith("lang"))
        return DataType.Lang;
    else if (typeString.startsWith("bool"))
        return DataType.Bool;
    else if (typeString.startsWith("date"))
        return DataType.Date;
    else if (typeString.startsWith("time"))
        return DataType.Time;
    else if (typeString.startsWith("json"))
        return DataType.Json;
    else if (typeString.startsWith("tableString"))
        return DataType.TableString;
    else if (typeString.startsWith("mapString"))
        return DataType.MapString;
    else if (typeString.startsWith("array"))
        return DataType.Array;
    else if (typeString.startsWith("dict"))
        return DataType.Dict;
    else
        return DataType.Invalid;
}

module.exports = DataType;