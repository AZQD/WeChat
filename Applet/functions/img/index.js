// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    let aiCropR;
    let scanQRCodeR;
    if(event.api === 'aiCrop'){ // 暂未使用
      aiCropR = await cloud.openapi.img.aiCrop(event);
    }
    if(event.api === 'scanQRCode'){
      scanQRCodeR = await cloud.openapi.img.scanQRCode(event);
    }

    return {
      aiCropR,
      scanQRCodeR
    }
  } catch (e) {
    return e
  }
}