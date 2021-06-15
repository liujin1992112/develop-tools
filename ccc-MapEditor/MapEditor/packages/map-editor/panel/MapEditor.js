const GRID_SPACE = 30;
const CANVAS_EXTRA_VIEW = 300;
const RGB_BLACK = "rgb(0, 0, 0)";
const RGB_GREEN = "rgb(0, 255, 0)";
const RGBA_BLUE = "rgba(0, 0, 255, 0.5)";
const RGBA_RED = "rgba(255, 0, 0, 0.5)";

const RECT_TYPE = {
    NONE: 0,
    BLUE: 1,
    RED: 2
}
const RECT_COLOR = {
    1: RGBA_BLUE,
    2: RGBA_RED
}

//获取右键菜单
var menu_right = document.getElementById("menu-right");
var btn_rect_none = menu_right.children[0];
var btn_rect_blue = menu_right.children[1];
var btn_rect_red = menu_right.children[2];
var btn_fill = menu_right.children[3];
var btn_revoke = menu_right.children[4];//撤销按钮
var btn_save = menu_right.children[5];//保存按钮
var btn_save_bg_map = menu_right.children[6];//保存按钮

//获取canvas
var canvas = document.querySelector("canvas");

//建立一个 CanvasRenderingContext2D 二维渲染上下文
var ctx = canvas.getContext("2d");

var bgImage = null;//整张地图背景图片Image对象
var matrix = null;//地图信息二位矩阵
var matrixRowCount = 0;//地图信息二位矩阵的行数
var matrixColumnCount = 0;//地图信息二位矩阵的列数
var matrixAlterQueue = [];//保存地图修改信息,按照堆栈的方式存储,方便玩家做撤销操作
var rectType = RECT_TYPE.NONE;//标记路径点类型
var canAddRect = false;//是否能够标记路径点
var toFill = false;

/**
 * 绘制地图编辑器网格背景
 */
function drawBG() {
    //计算画布的宽和高
    if (bgImage) {
        canvas.width = (bgImage.width < window.innerWidth ? window.innerWidth : bgImage.width) + CANVAS_EXTRA_VIEW;
        canvas.height = (bgImage.height < window.innerHeight ? window.innerWidth : bgImage.height) + CANVAS_EXTRA_VIEW;
    } else {
        canvas.width = window.innerWidth + CANVAS_EXTRA_VIEW;
        canvas.height = window.innerHeight + CANVAS_EXTRA_VIEW;
    }

    //清空画布指定范围内的内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //用黑色填充画布
    ctx.fillStyle = RGB_BLACK;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //地图背景存在,绘制地图背景
    if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
    }
    //设置线宽,绘制网格
    ctx.lineWidth = 1;
    ctx.strokeStyle = RGB_GREEN;
    //绘制网格的水平线
    for (let i = 0; i < canvas.height / GRID_SPACE; i++) {
        ctx.moveTo(0, GRID_SPACE * i);
        ctx.lineTo(canvas.width, GRID_SPACE * i);
    }
    //绘制网格的垂直线
    for (let i = 0; i < canvas.width / GRID_SPACE; i++) {
        ctx.moveTo(GRID_SPACE * i, 0);
        ctx.lineTo(GRID_SPACE * i, canvas.height);
    }
    ctx.stroke();
}

/**
 * 初始化地图行走信息二位矩阵
 */
function initMatrix() {
    matrixRowCount = Math.ceil(bgImage.height / GRID_SPACE);
    matrixColumnCount = Math.ceil(bgImage.width / GRID_SPACE);
    matrix = new Array();
    for (let r = 0; r < matrixRowCount; r++) {
        matrix[r] = new Array();
        for (let c = 0; c < matrixColumnCount; c++) {
            matrix[r][c] = RECT_TYPE.NONE;
        }
    }
    matrixAlterQueue = [];
}

//绘制地图信息
function drawMatrix() {
    if (!matrix) return;
    for (let r = 0; r < matrixRowCount; r++) {
        for (let c = 0; c < matrixColumnCount; c++) {
            let rectType = matrix[r][c];
            if (rectType != RECT_TYPE.NONE) {
                ctx.fillStyle = RECT_COLOR[rectType];
                ctx.fillRect(c * GRID_SPACE, r * GRID_SPACE, GRID_SPACE, GRID_SPACE);
            }
        }
    }
}

/**
 * 添加矩形块,标记路径点
 * @param {*} e 
 * @returns 
 */
function addRect(e) {
    if (!matrix) return;
    let r = Math.floor(e.offsetY / GRID_SPACE);
    let c = Math.floor(e.offsetX / GRID_SPACE);
    let x = c * GRID_SPACE;
    let y = r * GRID_SPACE;
    if (r >= matrixRowCount || c >= matrixColumnCount) return;
    if (matrix[r][c] == RECT_TYPE.NONE && rectType != RECT_TYPE.NONE) {
        //当前点为空,并且标记的路径点不为空
        matrixAlterQueue.push({ row: r, column: c, type: matrix[r][c] });
        matrix[r][c] = rectType;
        ctx.fillStyle = RECT_COLOR[rectType];
        ctx.fillRect(x, y, GRID_SPACE, GRID_SPACE);
    } else if (matrix[r][c] != RECT_TYPE.NONE && matrix[r][c] != rectType) {
        //当前点不为空,并且路径点不一致
        matrixAlterQueue.push({ row: r, column: c, type: matrix[r][c] });
        matrix[r][c] = rectType;
        drawBG();
        drawMatrix();
    }
}

function fillRect(e) {
    if (!matrix || rectType == RECT_TYPE.NONE) return;
    let row = Math.floor(e.offsetY / GRID_SPACE);
    let column = Math.floor(e.offsetX / GRID_SPACE);
    if (row >= matrixRowCount || column >= matrixColumnCount) return;
    if (matrix[row][column] != RECT_TYPE.NONE) return;
    let rowColumnList = [];
    let matrixAlterArray = []
    matrixAlterArray.push({ row: row, column: column, type: matrix[row][column] });
    matrix[row][column] = rectType;
    rowColumnList.push({ row: row, column: column });
    while (rowColumnList.length > 0) {
        let rowColumn = rowColumnList.shift();
        ctx.fillStyle = RECT_COLOR[rectType];
        ctx.fillRect(rowColumn.column * GRID_SPACE, rowColumn.row * GRID_SPACE, GRID_SPACE, GRID_SPACE);
        for (let i = 0; i < 4; i++) {
            let rowColumnTemp;
            if (i == 0) {
                rowColumnTemp = { row: rowColumn.row + 1, column: rowColumn.column };
            } else if (i == 1) {
                rowColumnTemp = { row: rowColumn.row, column: rowColumn.column + 1 };
            } else if (i == 2) {
                rowColumnTemp = { row: rowColumn.row - 1, column: rowColumn.column };
            } else if (i == 3) {
                rowColumnTemp = { row: rowColumn.row, column: rowColumn.column - 1 };
            }
            if (
                rowColumnTemp.row < 0 ||
                rowColumnTemp.column < 0 ||
                rowColumnTemp.row >= matrixRowCount ||
                rowColumnTemp.column >= matrixColumnCount ||
                matrix[rowColumnTemp.row][rowColumnTemp.column] != RECT_TYPE.NONE
            ) {
                continue;
            }
            matrixAlterArray.push({ row: rowColumnTemp.row, column: rowColumnTemp.column, type: matrix[rowColumnTemp.row][rowColumnTemp.column] });
            matrix[rowColumnTemp.row][rowColumnTemp.column] = rectType;
            rowColumnList.push(rowColumnTemp);
        }
    }
    matrixAlterQueue.push(matrixAlterArray);
}

/**
 * 开发者一步一步撤销
 * @returns 
 */
function revoke() {
    let element = matrixAlterQueue.pop();
    if (!element) return;
    if (element instanceof Array) {
        for (let elem of element) {
            let row = elem.row;
            let column = elem.column;
            let type = elem.type;
            matrix[row][column] = type;
        }
        drawBG();
        drawMatrix();
    } else {
        let row = element.row;
        let column = element.column;
        let type = element.type;
        let oldType = matrix[row][column];
        matrix[row][column] = type;
        if (oldType == RECT_TYPE.NONE && type != RECT_TYPE.NONE) {
            ctx.fillStyle = RECT_COLOR[type];
            ctx.fillRect(column * GRID_SPACE, row * GRID_SPACE, GRID_SPACE, GRID_SPACE);
        } else {
            drawBG();
            drawMatrix();
        }
    }
}

function download(filename, text) {
    let aTag = document.createElement("a");
    aTag.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    aTag.setAttribute("download", filename);
    aTag.style.display = "none";
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
}

/**
 * 窗口大小变化,重新绘制
 */
window.onresize = function () {
    drawBG();
    drawMatrix();
}

/**
 * 当用户在 <div> 元素 上右击鼠标时执行显示菜单操作 ：
 * @param {*} e 
 */
window.oncontextmenu = function (e) {
    e.preventDefault();
    menu_right.style.display = "block";
    menu_right.style.left = e.offsetX + "px";
    menu_right.style.top = e.offsetY + "px";
}

/**
 * 当用户在 <div> 元素 上左击鼠标时执行隐藏菜单操作 ：
 * @param {*} e 
 */
window.onclick = function () {
    menu_right.style.display = "none";
}

/**
 * 鼠标移动
 * @param {*} e 
 */
canvas.onmousemove = function (e) {
    if (canAddRect) {
        addRect(e);
    }
}

/**
 * 鼠标按下事件
 * @param {*} e 
 */
canvas.onmousedown = function (e) {
    if (e.button == 0) {
        canAddRect = true;//标记能够标记路径点
        if (toFill) {
            fillRect(e);
            toFill = false;
        } else {
            addRect(e);
        }
    }
}

/**
 * 鼠标抬起事件
 * @param {*} e 
 */
canvas.onmouseup = function (e) {
    if (e.button == 0) {
        canAddRect = false;//取消标记路径点
    }
}

btn_rect_none.onclick = function () {
    rectType = RECT_TYPE.NONE;
    document.getElementById("rect-fill").style.backgroundColor = "rgba(0,0,0,0)";
}

btn_rect_blue.onclick = function () {
    rectType = RECT_TYPE.BLUE;
    document.getElementById("rect-fill").style.backgroundColor = "blue";
}

btn_rect_red.onclick = function () {
    rectType = RECT_TYPE.RED;
    document.getElementById("rect-fill").style.backgroundColor = "red";
}

btn_fill.onclick = function () {
    toFill = true;
}

btn_revoke.onclick = function () {
    revoke();
}

/**
 * 设置地图数据
 * @param {*} imageBase64Matrix 采用Base64编码图片的矩阵
 * @param {*} rowMax 
 * @param {*} colMax 
 * @param {*} mapJson 
 */
function setMapData(imageBase64Matrix, rowMax, colMax, mapJson) {
    //创建背景地图画布
    let canvasTemp = document.createElement("canvas");
    let ctxTemp = canvasTemp.getContext("2d");
    let imageTotalCount = 0;
    let imageLoadCount = 0;
    let images = [];
    for (let row = 0; row < rowMax; row++) {
        for (let col = 0; col < colMax; col++) {
            let imageBase64 = imageBase64Matrix[row][col];
            let image = new Image();
            image.src = imageBase64;//显示Base64编码后的图片
            image.onload = () => {
                if (!(images[row] instanceof Array)) {
                    images[row] = [];
                }
                images[row][col] = image;
                imageLoadCount++;//已经加载的图片数量
                if (imageTotalCount == imageLoadCount) {//所有图片加载完成
                    //计算画布的宽和高
                    let canvasWidth = 0;
                    let canvasHeight = 0;
                    for (let r = 0; r < images.length; r++) {
                        for (let c = 0; c < images[r].length; c++) {
                            if (c == 0) canvasHeight += images[r][c].height;
                            if (r == 0) canvasWidth += images[r][c].width;
                        }
                    }
                    //设置背景地图画布的宽度和高度
                    canvasTemp.width = canvasWidth;
                    canvasTemp.height = canvasHeight;

                    //将图片绘制到背景地图画布上
                    let imageX = 0;
                    let imageY = 0;
                    for (let r = 0; r < images.length; r++) {
                        imageX = 0;
                        for (let c = 0; c < images[r].length; c++) {
                            ctxTemp.drawImage(images[r][c], imageX, imageY);
                            imageX += images[r][c].width;
                            if (c == images[r].length - 1) imageY += images[r][c].height;
                        }
                    }

                    //HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI
                    //即是：整张背景地图的Base64编码后的图片
                    //"data:image/png;base64,整张背景地图的Base64编码"
                    //参考blog:https://blog.csdn.net/kukudehui/article/details/80409522
                    bgImage = new Image();
                    bgImage.src = canvasTemp.toDataURL("image/png");
                    bgImage.onload = () => {
                        //初始化地图信息二位矩阵
                        initMatrix();

                        //重新绘制背景地图和网格线
                        drawBG();

                        //解析地图数据
                        if (mapJson) {
                            let a = mapJson.rowCount != matrixRowCount;
                            let b = mapJson.columnCount != matrixColumnCount;
                            let c = mapJson.gridSize != GRID_SPACE;
                            if (a || b || c) {
                                Editor.warn("导入的地图数据不匹配");
                                return;
                            }
                            matrix = mapJson.matrix;
                            drawMatrix();
                        }
                    }
                }
            };
            imageTotalCount++;//总共需要加载的图片数量
        }
    }
}

function saveBgMap() {
    if (bgImage) {
        //Editor.Ipc.sendToMain (message[, ...args, callback, timeout])
        let res = Editor.Ipc.sendToMain("dialog:save-file", {
            title: "保存背景地图", filters: [
                { name: 'Images', extensions: ['jpg', 'png'] },
            ]
        }, (res) => {
            console.log(res);
        });
        console.log(res);
    } else {
        Editor.Ipc.sendToMain("dialog:message-box", { title: "提示", message: "背景图片不能为空或者背景图片正在加载中..." });
    }
}

btn_save_bg_map.onclick = saveBgMap;

/**
 * 保存地图数据
 */
function save() {
    if (matrix) {
        let data = {
            matrix: matrix,
            rowCount: matrixRowCount,
            columnCount: matrixColumnCount,
            width: bgImage.width,
            height: bgImage.height,
            gridSize: GRID_SPACE
        };
        //渲染进程向主进程发送'map-editor:save-map'保存地图信息消息
        Editor.Ipc.sendToMain("map-editor:save-map", JSON.stringify(data));
    } else {
        Editor.warn("没有数据可保存");
    }
}

btn_save.onclick = save;//给保存按钮绑定事件处理函数

var onKeyControlLeft = false;

document.onkeydown = function (e) {
    if (e.code == "ControlLeft") {
        onKeyControlLeft = true;
    }
    if (e.code == "KeyZ" && onKeyControlLeft) {
        revoke();
    }
    else if (e.code == "KeyS" && onKeyControlLeft) {
        save();
    }
};

document.onkeyup = function (e) {
    if (e.code == "ControlLeft") {
        onKeyControlLeft = false;
    }
};

drawBG();