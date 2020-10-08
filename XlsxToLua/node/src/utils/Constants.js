var Constants = {};

// Excel临时文件的文件名前缀
Constants.EXCEL_TEMP_FILE_FILE_NAME_START_STRING = "~$";

// Excel默认sheet的名称前缀
Constants.EXCEL_INVALIS_SHEET_NAME = "Sheet";

// 每张数据表前三行分别字段变量名、声明字段描述、字段数据类型
// 注意:暂时定义前三个,后期拓展
Constants.DATA_FIELD_NAME_INDEX = 0;
Constants.DATA_FIELD_DESC_INDEX = 1;
Constants.DATA_FIELD_DATA_TYPE_INDEX = 2;


Constants.DATA_FIELD_DATA_START_INDEX = 3;


module.exports = Constants;