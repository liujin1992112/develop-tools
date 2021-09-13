"use strict";

var xxtea = require("./3rd/xxtea/xxtea"); //导入文件操作库


var fs = require('fs'); //导入node的process进程库


var process = require('process');

var FileUtil = require("./utils/file-util"); //npm install commander


var program = require('commander');

var _require = require("fs"),
    Stats = _require.Stats;

var path = require("path");

program.version('0.0.1').option('-i, --in', 'in dir').option('-o, --out', 'out dir').option('-ek, --ek', 'out file type(json、js)');
program.parse(process.argv);
var options = program.opts();
console.log(options);
console.log(program.args);
var inDir, outDir, outType;

if (options["in"]) {
  inDir = program.args[0];
}

if (options.out) {
  outDir = program.args[1];
}

var file_filters = [".png", ".jpg", ".jpeg"];
/**
 * 判断是否为图片资源
 */

function isImage(filePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = file_filters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ext = _step.value;

      if (filePath.endsWith(ext)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

FileUtil.map(inDir, function (filePath, stat) {
  var ext = path.extname(filePath);

  if (isImage(ext)) {
    // console.log(filePath);
    console.log(FileUtil.read(path, stat));
  }
});
var str = "Hello World! 你好，中国🇨🇳！";
var key = "1234567890"; // var encrypt_data = xxtea.encrypt(str, key);

var encrypt_data = xxtea.encryptToString(str, key);
console.log(encrypt_data);
var decrypt_data = xxtea.decryptToString(encrypt_data, key);
console.log(decrypt_data);
console.assert(str === decrypt_data);