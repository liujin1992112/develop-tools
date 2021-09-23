//导入文件操作库
const fs = require('fs');

const https = require('https');
const { URL } = require('url');

//导入node的process进程库
const process = require('process');

const FileUtil = require("./utils/file-util")

//npm install commander
const program = require('commander');

const path = require("path");

let inDir;

program
    .version('0.0.1')
    .option('-d, --dir', 'in dir')
program.parse(process.argv);
const opts = program.opts();

if (opts.dir) {
    inDir = path.resolve(program.args[0]);
}

let exts = ["*.bmp", ".jpeg", ".jpg", ".png"];
let max = 5200000; // 5MB == 5242848.754299136

const options = {
    method: 'POST',
    hostname: 'tinypng.com',
    path: '/web/shrink',
    headers: {
        rejectUnauthorized: false,
        'Postman-Token': Date.now(),
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
};

/**
 * 判断是否为图片资源
 */
function isAllowImageUpload(file, stats) {
    // 必须是文件，小于5MB，后缀 jpg||png
    if (stats.size <= max &&
        stats.isFile() &&
        exts.includes(path.extname(file))) {
        return true;
    }
    return false;
}

console.log(`压缩目录:${inDir}`);

// 生成随机IP， 赋值给 X-Forwarded-For
function getRandomIP() {
    return Array.from(Array(4)).map(() => parseInt(Math.random() * 255)).join('.')
}

// 过滤文件格式，返回所有bmp,jpg,png图片
function fileFilter(imgPath, stats) {
    if (isAllowImageUpload(imgPath, stats)) {
        // 通过 X-Forwarded-For 头部伪造客户端IP
        options.headers['X-Forwarded-For'] = getRandomIP();

        fileUpload(imgPath);
    }
}

// 异步API,压缩图片
// {"error":"Bad request","message":"Request is invalid"}
// {"input": { "size": 887, "type": "image/png" },"output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }}
function fileUpload(imgPath) {
    var req = https.request(options, function (res) {
        res.on('data', buf => {
            let obj = JSON.parse(buf.toString());
            if (obj.error) {
                console.log(`[${imgPath}]：压缩失败！报错：${obj.message}`);
            } else {
                //压缩成功
                fileUpdate(imgPath, obj);
            }
        });
    });

    //读取图片二进制数据,写入到请求流中
    req.write(fs.readFileSync(imgPath), 'binary');
    req.on('error', e => {
        console.error(e);
    });
    req.end();
}

// 该方法被循环调用,请求图片数据
function fileUpdate(imgPath, obj) {
    let options = new URL(obj.output.url);
    let req = https.request(options, res => {
        let body = '';
        res.setEncoding('binary');
        res.on('data', function (data) {
            body += data;
        });

        res.on('end', function () {
            //替换原始文件
            fs.writeFile(imgPath, body, 'binary', err => {
                if (err) {
                    return console.error(err);
                }
                console.log(`${imgPath} 压缩成功，原始大小：${obj.input.size}  压缩大小：${obj.output.size}  优化比例：${obj.output.ratio}`);
            });
        });
    });
    req.on('error', e => {
        console.error(e);
    });
    req.end();
}

console.log("开始压缩...");
FileUtil.map(inDir, (filePath, stat) => {
    fileFilter(filePath, stat);
});

