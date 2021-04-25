const { ccclass, property } = cc._decorator;

@ccclass
export default class ByteArray extends cc.Component {
    // private static instance: ByteArray = null;
    // public static getInstance(): ByteArray {
    //     this.instance = this.instance || new ByteArray()
    //     return this.instance
    // }

    private m_size: number = 0;
    private m_pos: number = 0;              //读入下标
    private dv: DataView = null;
    private data: any = null;
    private save_data = new Uint8Array;
    private m_pos_mapbegin: number = 15;    //地图部分下标
    private m_pos_size: number = 11;        //地图快数量 int 4个字节
    private m_pos_write: number = 0;        //写入下标
    readInt() {
        var buf = this.dv.getInt32(this.m_pos, true)
        this.m_pos += 4;
        return buf
    }
    readShort() {
        var buf = this.dv.getInt16(this.m_pos, true)
        this.m_pos += 2;
        return buf
    }
    readUShort() {
        var buf = this.dv.getUint16(this.m_pos, true)
        this.m_pos += 2;
        return buf
    }
    readByte() {
        var buf = this.dv.getInt8(this.m_pos)
        this.m_pos += 1;
        return buf
    }
    readUByte() {
        var buf = this.dv.getUint8(this.m_pos)
        this.m_pos += 1;
        return buf
    }
    writeByte(buf) {
        let dpos = this.m_pos_write;
        //console.log("writeByte pos:" + dpos + " buf:"+ buf)
        this.save_data.set([buf], dpos);
        this.m_pos_write += 1;
    }
    //int整数转换为4字节的byte数组
    intToByte4(i) {
        var targets = [];
        targets[0] = (i & 0xFF);
        targets[1] = (i >> 8 & 0xFF);
        targets[2] = (i >> 16 & 0xFF);
        targets[3] = (i >> 24 & 0xFF);
        return targets;
    }
    writeSzie(size) {
        let targets = this.intToByte4(size);
        this.data[this.m_pos_size] = targets[0];
        this.data[this.m_pos_size + 1] = targets[1];
        this.data[this.m_pos_size + 2] = targets[2];
        this.data[this.m_pos_size + 3] = targets[3];

        //创建buf Uint8Array 无法在创建后修改长度 因此计算长度后在进行写入
        this.save_data = new Uint8Array(size + this.m_pos_mapbegin);

        this.save_data.set(this.data.subarray(0, this.data.byteLength), 0);
    }

    loadData(url, callback: Function) {
        var path = cc.url.raw(url);//
        var self = this
        cc.loader.load({ url: path, type: "binary", }, function (err, data) {
            self.data = data
            self.setData(callback)
        });
    }
    setData(callback: Function) {
        console.log("binaryData " + this.data)
        let buffer = new ArrayBuffer(this.data.length);
        this.dv = new DataView(buffer);
        for (var i = 0; i < this.data.length; ++i) {

            this.dv.setUint8(i, this.data[i])
        }
        callback()
    }
    setMapBeginPos() {
        console.log("setMapBeginPos " + this.m_pos);
        this.m_pos_size = 11;
        this.m_pos_mapbegin = 15;
        this.m_pos_write = this.m_pos_mapbegin;
    }
    getData()//保存数据
    {
        return this.save_data;
    }
    start() {

    }

    // update (dt) {}
}