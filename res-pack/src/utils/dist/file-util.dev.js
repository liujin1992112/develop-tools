"use strict";

var Fs = require('fs');

var Path = require('path');
/**
 * 文件工具
 */


var FileUtil = {
  /**
   * 读取文件
   * @param {(srcPath: Fs.PathLike, stat: Fs.Stats) => void} handler 处理函数
   * @returns {Buffer|null}
   */
  read: function read(srcPath, stat) {
    if (stats.isFile()) {
      return Fs.readFileSync(srcPath);
    }

    return null;
  },

  /**
   * 复制文件/文件夹
   * @param {Fs.PathLike} srcPath 源路径
   * @param {Fs.PathLike} destPath 目标路径
   */
  copy: function copy(srcPath, destPath) {
    if (!Fs.existsSync(srcPath)) return;
    var stats = Fs.statSync(srcPath);

    if (stats.isDirectory()) {
      if (!Fs.existsSync(destPath)) Fs.mkdirSync(destPath);
      var names = Fs.readdirSync(srcPath);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          this.copy(Path.join(srcPath, name), Path.join(destPath, name));
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
    } else if (stats.isFile()) {
      Fs.writeFileSync(destPath, Fs.readFileSync(srcPath));
    }
  },

  /**
   * 删除文件/文件夹
   * @param {Fs.PathLike} path 路径
   */
  "delete": function _delete(path) {
    if (!Fs.existsSync(path)) return;
    var stats = Fs.statSync(path);

    if (stats.isDirectory()) {
      var names = Fs.readdirSync(path);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;
          this["delete"](Path.join(path, name));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      Fs.rmdirSync(path);
    } else if (stats.isFile()) {
      Fs.unlinkSync(path);
    }
  },

  /**
   * 遍历文件/文件夹并执行函数
   * @param {Fs.PathLike} path 路径
   * @param {(filePath: Fs.PathLike, stat: Fs.Stats) => void} handler 处理函数
   */
  map: function map(path, handler) {
    if (!Fs.existsSync(path)) return;
    var stats = Fs.statSync(path);

    if (stats.isDirectory()) {
      var names = Fs.readdirSync(path);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = names[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var name = _step3.value;
          this.map(Path.join(path, name), handler);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } else if (stats.isFile()) {
      handler(path, stats);
    }
  }
};
module.exports = FileUtil;