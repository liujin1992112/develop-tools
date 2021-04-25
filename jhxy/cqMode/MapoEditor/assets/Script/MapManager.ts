import ByteArray from './ByteArray'

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {
    private static instance: MapManager = null;
    public static getInstance(): MapManager {
        this.instance = this.instance || new MapManager()
        return this.instance
    }

    public mBlockData = [];
    public mGroundWidth = 0;
    public mGroundHeight = 0;
    public mlogic_width = 0;//地面水平x轴方向块数
    public mlogic_height = 0;//地面垂直y轴方向块数
    public mGroundDir = 0;
    private _ByteArray

    /**
     * 获取地图块总共数量
     * @returns 
     */
    public getBlocklength() {
        return this.mlogic_width * this.mlogic_height;
    }
    public getBlockByteArray() {
        return this._ByteArray;
    }
    onDestroy() {

        this._ByteArray.destroy()
    }
    public initMap(url, callback: Function) {
        this._ByteArray = new ByteArray()
        //"resources/map/v102.mapo"
        this._ByteArray.loadData(url, () => {

            this.initData()
            callback()
        })
    }

    initData() {
        var mVersion = this._ByteArray.readUShort();
        console.log("mVersion " + mVersion)
        if (mVersion == 4) {
            this.mGroundWidth = this._ByteArray.readShort();
            this.mGroundHeight = this._ByteArray.readShort();
            this.mlogic_width = this._ByteArray.readShort();
            this.mlogic_height = this._ByteArray.readShort();
            this.mGroundDir = this._ByteArray.readByte();
            var size = this._ByteArray.readInt();//地图数据大小

            console.log("mGroundWidth " + this.mGroundWidth)
            console.log("mGroundHeight " + this.mGroundHeight)
            console.log("logic_width " + this.mlogic_width)
            console.log("logic_height " + this.mlogic_height)
            console.log("mGroundDir " + this.mGroundDir)
            console.log("size " + size)
            var i = 0;
            var badindex = 0;
            var ind = 0;
            var b;
            var l;
            this._ByteArray.setMapBeginPos();
            while (ind < size) {
                b = this._ByteArray.readUByte();//地图块类型(障碍物、水、正常等),采用无符号一个字节,最多可以表示每一个块8中状态
                l = this._ByteArray.readUByte();//连续相同地图块数量

                console.log("readUByte " + l);
                for (i = 0; i < l; i++) {

                    this.mBlockData[badindex++] = b & 0xFF;
                }
                ind = ind + 2;  //这里加2是因为连续获取了两个readUByte  字节。
            }
        }
    }

    /**
     * 压缩地图数据
     */
    computeZip(bWrite) {
        let cout = 1;   //连续相同的地图块
        let block = 0;  //压缩后不同的地图块数量
        let size = 0;
        for (var i = 0; i < MapManager.getInstance().getBlocklength(); i++) {
            if (this.mBlockData[i] != this.mBlockData[i + 1]) {
                if (bWrite) {
                    this._ByteArray.writeByte(this.mBlockData[i]);//写入地图块类型
                    this._ByteArray.writeByte(cout);//写入连续相同地图块数量
                    //console.log( "buf : " + this.mBlockData[i] + " cout: "+ cout);
                }
                size++;
                block = block + cout;
                cout = 1;
            }
            else {
                if (cout == MapManager.getInstance().mlogic_width - block) {
                    //达到边界
                    if (bWrite) {
                        this._ByteArray.writeByte(this.mBlockData[i]);
                        this._ByteArray.writeByte(cout);
                        //console.log( "buf : " + this.mBlockData[i] + " cout: "+ cout);
                    }
                    size++;
                    block = block + cout;
                    cout = 1;
                } else {
                    cout++;
                }

                if (block == MapManager.getInstance().mlogic_width) {
                    //达到边界
                    block = 0;
                }
            }

            if (size > 900) {
                console.log("block size: " + size * 2);
            }
        }
        console.log("block size: " + size * 2);
        console.log("MapManager.getInstance().getBlocklength() " + MapManager.getInstance().getBlocklength());

        //由于每次写入时,地图块包含:地图块类型,相同连续地图块的数量
        return size * 2;

    }
    zip() {
        //获取压缩后地图大小
        let size = this.computeZip(false);
        this._ByteArray.writeSzie(size);

        //将地图压缩后保存到内存中
        this.computeZip(true);
    }
    start() {

    }

    // update (dt) {}
}