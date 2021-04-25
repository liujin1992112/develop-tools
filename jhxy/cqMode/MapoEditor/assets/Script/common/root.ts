import { FishState, FishType, MAX_SIZE, TILE_WIDTH, TILE_HEIGHT } from './ComDefine'
import MapManager from '../MapManager'
import BinManager from '../BinManager'
const { ccclass, property } = cc._decorator;

/**
 * 地图数据格式定义如下：
 * ================地图头部信息================
 * 1|2    字节:地图版本号
 * 3|4    字节:地面块宽度
 * 5|6    字节:地面块高度
 * 7|8    字节:地面水平x轴方向块数
 * 9|10   字节:地面垂直y轴方向块数
 * 11     字节:地面块的方向
 * 12|13|14|15  字节:地图数据的大小
 * ==================地图数据==================
 * 地图数据采用压缩算法写入:连续相同的土块  存储在2个字节里面,第一个字节存储图块类型,第二个字节存储连续相同图块的数量
 */
@ccclass
export default class root extends cc.Component {

    @property(cc.Node) content: cc.Node = null;
    @property(cc.Node) map: cc.Node = null;
    @property(cc.Node) backgroundRoot: cc.Node = null;
    @property(cc.Prefab) block: cc.Prefab = null;
    @property(cc.Prefab) blocklist: cc.Prefab = null;

    @property(cc.Prefab) background: cc.Prefab = null;
    @property(cc.Prefab) backgroundlist: cc.Prefab = null;

    @property(cc.Node) mainCamera: cc.Node = null

    @property(cc.Label) pos: cc.Label = null;

    @property(cc.ScrollView) scrollview: cc.ScrollView = null;

    @property(cc.Toggle) radioButton: cc.Toggle[] = [];

    speed = 1
    blockArray = [];

    type = 0;


    start() {

        let message = { name: "hello", pwd: "pwd" };

        this.map.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            //cc.log("touch move");
            /*
            var lx = e.getDeltaX();
            var ly = e.getDeltaY();
            var x = this.mainCamera.x;
            var y = this.mainCamera.y;
         //   if(x - lx * this.speed<70000 && x -lx * this.speed>-7000){
                this.mainCamera.x = x - lx * this.speed;
          //  }
          //  if(y - ly * this.speed<50000 && y - ly * this.speed>-50000){
                this.mainCamera.y = y - ly * this.speed;
        //    }
            */

        }, this);
        this.map.on(cc.Node.EventType.TOUCH_END, function (e) {

            var pos = this.map.convertToNodeSpaceAR(e.getLocation());
            //console.log("pos x : " + pos.x + " pos y: " + pos.y);
            let x = Math.ceil(pos.x / TILE_WIDTH);
            //传奇地图的坐标系是左上角
            let y = MapManager.getInstance().mlogic_height - Math.ceil(pos.y / TILE_HEIGHT) + 1;

            //console.log("x: " + x + " y: " + y);
            this.pos.string = "x: " + x + " y: " + y;

        }, this);

        this.map.on(cc.Node.EventType.TOUCH_MOVE, function (e) {

            var pos = this.map.convertToNodeSpaceAR(e.getLocation());
            //console.log("pos x : " + pos.x + " pos y: " + pos.y);
            let x = Math.ceil(pos.x / TILE_WIDTH);
            //传奇地图的坐标系是左上角
            let y = MapManager.getInstance().mlogic_height - Math.ceil(pos.y / TILE_HEIGHT) + 1;

            //console.log("x: " + x + " y: " + y);
            this.pos.string = "x: " + x + " y: " + y;

            let i = (y - 1) * MapManager.getInstance().mlogic_width + x % (MapManager.getInstance().mlogic_width) - 1;

            //console.log("blockArray i " + i);

            var sj = this.blockArray[i].getComponent("block");

            if (this.type != 0) {
                let BlockData;
                let color;

                if (this.type == 1) {
                    BlockData = 1;
                    color = cc.color(255, 0, 0) //block(障碍物),16进制表示:0x01  二进制表示:0000 0001
                }
                else if (this.type == 2) {
                    BlockData = 4;
                    color = cc.color(255, 255, 255) //WATER(水),16进制表示:0x04  二进制表示:0000 0100
                }
                else if (this.type == 3) {
                    BlockData = 2;
                    color = cc.color(80, 156, 54) //WARK(错误),16进制表示:0x02   二进制表示:0000 0010
                }

                //数据修改
                MapManager.getInstance().mBlockData[i] = BlockData;

                //块修改
                sj.block.color = color; //block
            }
            //console.log("content x: " + this.content.x + " y: "+ this.content.y);
        }, this);


        var t = this;
        // this.closeBtn.on(cc.Node.EventType.TOUCH_START, function(e) {
        //     t.close()
        // }, this),
        // this.canDrag && (this.title.on(cc.Node.EventType.TOUCH_START, function(e) {
        //     t._startDrag = !0
        // }, this),
        // this.title.on(cc.Node.EventType.TOUCH_END, function(e) {
        //     t._startDrag = !1
        // }, this),
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
        //     if (t._startDrag) {
        //         var i = t.node.parent.convertToNodeSpaceAR(e.getLocation()).sub(t.title.position);
        //         i.x < -(cc.winSize.width - t.node.width) / 2 ? i.x = -(cc.winSize.width - t.node.width) / 2 : i.x > (cc.winSize.width - t.node.width) / 2 && (i.x = (cc.winSize.width - t.node.width) / 2),
        //         i.y < -(cc.winSize.height - t.node.height) / 2 ? i.y = -(cc.winSize.height - t.node.height) / 2 : i.y > (cc.winSize.height - t.node.height) / 2 && (i.y = (cc.winSize.height - t.node.height) / 2),
        //         t.node.position = i
        //     }
        // }, this))

        console.log("map x: " + this.map.x + " y: " + this.map.y);

        //Biz 文件加载
        //BinManager.getInstance().loadBiz(1,2)
    }

    radioButtonClicked(toggle) {
        var index = this.radioButton.indexOf(toggle);
        var title = "RadioButton";
        switch (index) {
            case 0:
                title += "1";
                break;
            case 1:
                title += "2";
                break;
            case 2:
                title += "3";
                break;
            default:
                break;
        }

        this.type = index;
        console.log(" index " + index);
    }

    setScaleAdd() {
        this.map.scale += 0.1;
        this.backgroundRoot.scale += 0.1;
    }

    setScaleSub() {
        this.map.scale -= 0.1;
        this.backgroundRoot.scale -= 0.1;
    }

    loadResSync(url) {
        return new Promise((reovle, reject) => {
            cc.loader.loadRes(url, cc.SpriteFrame, (err, res) => {
                if (err) {
                    //reject([err, null]);
                    reject(err);
                }
                else {
                    //reovle([err, res]);
                    reovle(res);
                }
            });
        }).catch(err => {
            //console.log(err);
        });
    }

    loadMap() {
        //清理
        this.map.removeAllChildren()

        let loadUrl = cc.find("root/tool/loadUrl").getComponent(cc.EditBox);

        cc.log("loadUrl " + loadUrl.string)

        let url = "resources/map/" + loadUrl.string + ".mapo";
        var self = this;

        MapManager.getInstance().initMap(url, async () => {
            cc.log("initMap")

            //设置 map 大小
            this.map.width = MapManager.getInstance().mlogic_width * TILE_WIDTH
            this.map.height = MapManager.getInstance().mlogic_height * TILE_HEIGHT

            self.backgroundRoot.width = self.map.width;
            self.backgroundRoot.height = self.map.height;
            self.content.width = self.map.width;
            self.content.height = self.map.height;

            //获取地图块总共数量
            let sj = null;
            let totalBlocks = MapManager.getInstance().getBlocklength();
            for (var i = 0; i < totalBlocks; i++) {
                if (i % (MapManager.getInstance().mlogic_width) == 0) {
                    //初始化每一行块列表
                    var blocklist = cc.instantiate(self.blocklist)
                    sj = blocklist.getComponent("block_list");
                    self.map.addChild(blocklist);
                }
                //向行块列表中添加块
                this.blockArray[i] = sj.addBlock(MapManager.getInstance().mBlockData[i], i);
            }

            let rowMax = Math.ceil(this.map.height / 512) + 1;
            let colMax = Math.ceil(this.map.width / 512) + 1;
            console.log(" rowMax " + rowMax);
            console.log(" colMax " + colMax);
            let array = [];
            for (let row = 1; row < rowMax; row++) {
                let blockArray = [];
                for (let col = 1; col < colMax; col++) {
                    let url = "map/" + loadUrl.string + "/" + loadUrl.string + "_r" + row + "_c" + col + ".jpg";

                    //console.log("loader 1 " + url);
                    let data = await this.loadResSync(url).then(res => {

                        if ((typeof res) == "object") {
                            // console.log("(typeof res) " + (typeof res));
                            // console.log("loader 2 " + url);
                            if (!array[row]) // "undefined")
                            {
                                var backgroundlist = cc.instantiate(self.backgroundlist);
                                backgroundlist.width = self.map.width;

                                array[row] = backgroundlist;

                                self.backgroundRoot.addChild(backgroundlist);
                            }
                            var background = cc.instantiate(self.background)
                            background.getComponent(cc.Sprite).spriteFrame = res as cc.SpriteFrame;
                            array[row].height = background.height;
                            array[row].addChild(background);
                        }
                    });
                }
            }
        })
    }

    saveMap() {
        //重新排布数据
        MapManager.getInstance().zip();

        if (cc.sys.isBrowser) {
            console.log("浏览器");
            let arry = MapManager.getInstance().getBlockByteArray();
            let loadUrl = cc.find("root/tool/loadUrl").getComponent(cc.EditBox);
            let textFileAsBlob = new Blob([arry.getData()], { type: 'application/mapo' });
            // let textFileAsBlob = new Blob(["textToWrite"], {type:'application/mapo'});
            let downloadLink = document.createElement("a");
            downloadLink.download = loadUrl.string + ".mapo";
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                // downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                // downloadLink.onclick = "destroyClickedElement";
                // downloadLink.style.display = "none";
                // document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }
    // update (dt) {}
}