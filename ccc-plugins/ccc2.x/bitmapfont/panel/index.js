const Fs = require('fs');
const { dialog } = require('electron').remote;

// "panel": {
//     "main": "panel/index.js",    //指定面面板入口文件，可以是 js 文件也可以是 html 文件。取决于面板类型（type）。如果面板类型为 simple 则读入的为 html 文件。否则读入 js 文件。
//     "type": "dockable",          //type:规定面板的基本类型  dockable:停靠  simple:简单Web面板
//     "title": "bitmapfont",
//     "width": 400,
//     "height": 600
// }

//采用vue框架开发插件
//Editor.url:如果注册了自定义协议或者官方公开的协议,则返回文件的绝对路径

//Editor.Panel.extend() 函数来注册面板
//参考文案:https://docs.cocos.com/creator/manual/zh/extension/extends-panel.html?h=editor.panel.exte

//面板字段参考:https://docs.cocos.com/creator/manual/zh/extension/reference/panel-json-reference.html

//面板定义参考:https://docs.cocos.com/creator/manual/zh/extension/reference/panel-reference.html

//选择器 $ 获得面板元素
Editor.Panel.extend({
    style: Fs.readFileSync(Editor.url('packages://bitmapfont/panel/index.css', 'utf8')),
    template: Fs.readFileSync(Editor.url('packages://bitmapfont/panel/index.html', 'utf8')),
    $: {
        fontCanvas: "#fontCanvas"
    },


    ready() {
        let self = this;
        this.plugin = new window.Vue({
            el: this.shadowRoot,
            data() {
                return {
                    filePath: "",
                    imageList: [],
                    updateImageList: [],
                    canvasWidth: 256,
                    canvasHeight: 256,
                    fontInfo: '',
                }
            },
            methods: {
                dragEnter(e) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                dragOver(e) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                onDrop(e) {
                    this.removeAll();
                    e.stopPropagation();
                    e.preventDefault();
                    let dt = e.dataTransfer;
                    let files = dt.files;
                    this.showImgData(files);
                },
                showImgData(files) {
                    let that = this;
                    if (files.length) {
                        for (var i = 0; i < files.length; i++) {
                            let file = files[i];
                            if (!/^image\//.test(file.type)) continue;
                            let fileReader = new FileReader();
                            fileReader.onload = (function () {
                                return function (e) {
                                    if (that.updateImageList.indexOf(e.target.result) !== -1) return;
                                    var img = new Image();
                                    img.src = e.target.result;
                                    img.onload = () => {
                                        //将文件名aa.xx按照.进行分割
                                        let fileName = file.name.split('.')[0];
                                        that.imageList.push({
                                            img: e.target.result,//图片的base64编码值
                                            char: fileName.substr(fileName.length - 1, 1),//图片对应的字符
                                            width: img.width,//图片宽度
                                            height: img.height,//图片高度
                                            x: 0,
                                            y: 0,
                                        });
                                        that.updateImageList.push(e.target.result);//将图片保存到更新列表

                                        //加载完成一张图片,则绘制一张图片(可以考虑,等所有图片加载完成后,进行一次性的绘制操作)
                                        that.updateCanvas();
                                    };
                                };
                            })();
                            fileReader.readAsDataURL(file);
                        }
                    }
                },
                updateCanvas() {
                    //图片列表为空,则直接返回
                    if (!this.imageList.length) return;
                    let that = this;
                    let height = 0;
                    let space = 2;

                    //记录绘制图片的位置
                    let x = space;
                    let y = space;

                    //找出图片列表中最高的图片
                    this.imageList.forEach(img => {
                        if (img.height > height) height = img.height;
                    });
                    height = Math.ceil(height);

                    //字体大小按照最高图片计算
                    this.fontSize = height;

                    //清空画布内容
                    let content = self.$fontCanvas.getContext('2d');
                    content.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

                    //将图片列表绘制到Canvas上
                    this.imageList.forEach(img2 => {
                        let img = new Image();
                        img.src = img2.img;
                        //宽度超过画布宽度,则自动换行
                        if (x + img2.width + space > that.canvasWidth) {
                            x = space;
                            y += height + space;
                        }
                        content.drawImage(img, x, y);
                        img2.x = x;
                        img2.y = y;
                        x += img2.width + space;
                    });
                },
                loadFileData() {
                    let str = `info size=${this.fontSize} unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0
common lineHeight=${this.fontSize} base=23 scaleW=${this.canvasWidth} scaleH=${this.canvasHeight} pages=1 packed=0
page id=0 file="${this.fontName}.png"
chars count=${this.imageList.length}\r\n`;
                    this.imageList.forEach(img => {
                        str += `char id=${this.caseConvertEasy(img.char).charCodeAt(0)} x=${img.x} y=${img.y} width=${img.width} height=${img.height} xoffset=0 yoffset=0 xadvance=${img.width} \n`;
                    })
                    this.fontInfo = str;
                },
                caseConvertEasy(str) {
                    return str.split('').map(s => {
                        if (s.charCodeAt() <= 90) {
                            return s.toUpperCase()
                        }
                        return s.toLowerCase()
                    }).join('')
                },
                removeAll() {
                    this.imageList = [];
                    this.updateImageList = [];
                    this.updateCanvas();
                },
                save() {
                    //选择保存位图字体文件后,保存位图字体对应的png和fnt文件
                    this.selectFolder(() => {
                        this.loadFileData();
                        this.savePng();
                        this.saveFnt();
                    })
                },
                selectFolder(func) {
                    //选择存放目录
                    let fontPath = dialog.showSaveDialog({ properties: ['openDirectory',] });
                    if (fontPath) {
                        let fontArr = fontPath.split("\\");
                        this.fontName = fontArr[fontArr.length - 1];//获取保存文件的名称
                        this.filePath = fontPath.replace("\\" + this.fontName, "");
                        if (this.filePath) {
                            Editor.log("选择完成，保存中");
                            func();
                        }
                    }
                },
                saveFnt() {
                    Fs.writeFileSync(this.filePath.replace(/\\/g, "/") + '/' + this.fontName + '.fnt', this.fontInfo);
                },
                savePng() {
                    let src = self.$fontCanvas.toDataURL("image/png");
                    let data = src.replace(/^data:image\/\w+;base64,/, "");
                    let buffer = new window.Buffer(data, 'base64');
                    Fs.writeFileSync(this.filePath.replace(/\\/g, "/") + '/' + this.fontName + '.png', buffer);
                    Editor.log("保存成功");
                }
            }
        })
    },
});