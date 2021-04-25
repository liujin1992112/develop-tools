const { ccclass, property } = cc._decorator;

/**
 * 地图中每一行块列表集合
 */
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab) block: cc.Prefab = null

    // onLoad () {}

    start() { }

    addBlock(data, id) {
        var block = cc.instantiate(this.block)
        this.node.addChild(block);

        var sj = block.getComponent("block");
        sj.setBlock(id)

        //block(障碍物),16进制表示:0x01      二进制表示:0000 0001
        //WATER(水),    16进制表示:0x04      二进制表示:0000 0100
        //WARK(错误),   16进制表示:0x02      二进制表示:0000 0010
        //注意:采用无符号一个字节,最多可以表示每一个块8中状态
        if ((data & 0x1) != 0) {
            sj.block.color = cc.color(255, 0, 0) //block
        } else if ((data & 0x4) != 0) {
            sj.block.color = cc.color(255, 255, 255) //WATER
            console.log("addBlock WATER");
        } else if ((data & 0x2) != 0) {
            //地图标记物， 可以行走，但是人物要半透明
            sj.block.color = cc.color(80, 156, 54) //WARK
        } else {
            // console.log("WATER " + data);
            sj.block.color = cc.color(255, 255, 255)
        }

        return block;
        // for(var i = 0 ; i <  blocks.length; i ++)
        // {

        // }
    }
    // update (dt) {}
}