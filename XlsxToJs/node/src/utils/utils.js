const path = require('path');
const fs=require('fs');

var utils = {};
utils.listFiles = function(filePath, outFiles, isIncludeSubfolder = false) {
    utils._dfsFolder(filePath, outFiles, isIncludeSubfolder);
}

/**
 * 递归遍历目录文件
 * @param {*} filePath 文件目录
 * @param {*} outFiles 
 * @param {*} isIncludeSubfolder    是否包含子目录文件
 */
utils._dfsFolder = function(filePath, outFiles, isIncludeSubfolder) {
    if (!fs.existsSync(filePath)) {
        console.error(`path:${filePath} is not exist!`);
    }else {
        //遍历此路径下面的文件(采用同步方式读取目录)
        let filenames = fs.readdirSync(filePath);
        filenames.forEach(filename => {
            let filedir = path.join(filePath, filename);
            let stat = fs.statSync(filedir);
            let isDir = stat.isDirectory();
            let isFile = stat.isFile();
            if (isIncludeSubfolder) {//包含子目录
                if (isDir) {//目录,递归子目录
                    utils._dfsFolder(filedir, outFiles, isIncludeSubfolder);
                }else if (isFile) {//文件
                    outFiles.push(filedir);
                }
            }else {//不包含字母
                if (isFile) {
                    outFiles.push(filedir);
                }
            }
        });
    }
}
    
module.exports = utils;