'use strict';

let FileStream = require("fs");
let FilePath = require("path");

module.exports = {

  load() {

  },

  unload() {

  },

  messages: {
    "open"() {
      if (Editor.Panel.findWindow("map-editor")) {
        Editor.warn("已经打开地图编辑器面板");
        return;
      }
      // init 
      this.mapDirURL = null;
      this.mapJson = null;
      this.imageBase64Matrix = null;
      this.rowMax = null;
      this.colMax = null;
      // load
      // 获取开发者在编辑器中选中的资源，以资源的uuid数组的形式返回
      let uuids = Editor.Selection.curSelection("asset");
      if (uuids.length != 1) {
        Editor.warn("请选择一个地图资源文件夹");
        return;
      }

      // 以uuid获取资源信息
      // {
      //   uuid: '77c34078-bdbf-49d4-90c8-399a6e2d923d',
      //   path: 'E:\\Work\\Creator\\MapEditor\\assets\\resources\\map\\map001',
      //   url: 'db://assets/resources/map/map001',
      //   type: 'folder',
      //   isSubAsset: false
      // }
      let assetInfo = Editor.assetdb.assetInfoByUuid(uuids[0]);
      if (assetInfo.type != "folder") {
        Editor.warn("请选择一个地图资源文件夹");
        return;
      }
      this.mapDirURL = assetInfo.url;//地图资源目录
      let assetPath = assetInfo.path;//地图资源目录在操作系统上的绝对路径
      let childFiles = FileStream.readdirSync(assetPath);//获取地图资源目录下的所有资源文件名称(非递归方式)
      let imageBase64Matrix = [];
      let rowMax = 0;
      let colMax = 0;
      for (let fileName of childFiles) {
        if (fileName.endsWith(".meta")) {//过滤meta数据
          continue;
        }
        if (fileName.endsWith(".json")) {
          let filePath = FilePath.join(assetPath, fileName);
          let mapJson = FileStream.readFileSync(filePath).toString("utf-8");
          this.mapJson = JSON.parse(mapJson);//地图编辑后的JSON文件
          continue;
        }
        let imageType = null;
        if (fileName.endsWith(".jpg")) {
          imageType = "jpg";
        }
        if (fileName.endsWith(".png")) {
          imageType = "png";
        }
        if (!imageType) {
          continue;
        }

        //读取图片的行和列号
        let rowColStr = fileName.substring(0, fileName.indexOf("."));
        let rowColStrs = rowColStr.split("_");
        let rowIndex = parseInt(rowColStrs[0]);
        let colIndex = parseInt(rowColStrs[1]);
        if (rowIndex + 1 > rowMax) {
          rowMax = rowIndex + 1;
        }
        if (colIndex + 1 > colMax) {
          colMax = colIndex + 1;
        }
        if (!imageBase64Matrix[rowIndex]) {
          imageBase64Matrix[rowIndex] = [];
        }
        let filePath = FilePath.join(assetPath, fileName);//拼接图片在操作系统上的绝对路径
        let buffer = FileStream.readFileSync(filePath);//读取文件返回Buffer

        //将图片按照Base64编码后给前端显示Data URI
        //参考blog:https://blog.csdn.net/kukudehui/article/details/80409522
        let iamgeBase64 = "data: image/" + imageType + ";base64," + buffer.toString("base64");//base64编码图片
        imageBase64Matrix[rowIndex][colIndex] = iamgeBase64;
      }
      this.imageBase64Matrix = imageBase64Matrix;
      this.rowMax = rowMax;
      this.colMax = colMax;
      if (this.rowMax <= 0 || this.colMax <= 0) {
        Editor.warn(
          "要求目标文件夹内至少存在一张规范命名的图片\n" +
          "格式: 行_列.jpg 或 png\n" +
          "例如 2 x 2 的瓦片地图，则分别命名为 0_0.jpg 0_1.jpg 1_0.jpg 1_1.jpg\n"
        );
        return;
      }
      Editor.Panel.open("map-editor");
    },
    "read-res"() {
      Editor.Ipc.sendToPanel("map-editor", "map-editor:import-res", [this.imageBase64Matrix, this.rowMax, this.colMax, this.mapJson]);
    },
    "save-map"(event, data) {
      let url = this.mapDirURL + "/map.json";
      let method = "create";
      if (Editor.assetdb.exists(url)) {
        method = "saveExists";
      }
      Editor.assetdb[method](url, data, (err) => {
        if (err) {
          Editor.failed("地图数据-保存失败");
        } else {
          Editor.success("地图数据-保存成功");
        }
      });
    }
  }
};