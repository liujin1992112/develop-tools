import { CurrentState } from './common/ComDefine'

const { ccclass, property } = cc._decorator;

/**
 * 地图块
 */
@ccclass
export default class NewClass extends cc.Component {

  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.Node) block: cc.Node = null;

  @property
  text: string = 'hello';

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  state = 0;
  start() {

    // this.node.on(cc.Node.EventType.TOUCH_START, function(e){

    //     this.state = 1;

    // }, this);

    // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){

    //   this.state = 0;

    // }, this);

    // this.node.on(cc.Node.EventType.TOUCH_END, function(e){

    //   this.state = 0;

    // }, this);

    // this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e){
    //   if (this.state == 0)
    //   {
    //     if ( CurrentState == 0)
    //     {
    //         this.block.color = cc.color(255, 0, 0) //block
    //     }
    //     else if (CurrentState == 1)
    //     {
    //       this.block.color = cc.color(255,255,255) //WATER
    //     }
    //     else if (CurrentState == 2) //地图标记物， 可以行走，但是人物要半透明
    //     {
    //       this.block.color = cc.color(80,156,54) //WARK
    //     }
    //     else
    //     {
    //        this.block.color = cc.color(255,255,255)
    //     }
    //   } 
    // }, this);

  }
  setBlock(id) {
    //  this.block.color = cc.color(255, 0, 0) //block
    // this.label.string = id
  }
  // update (dt) {}
}