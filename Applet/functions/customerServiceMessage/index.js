// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event', event);
  try {
    let sendR;
    let uploadTempMediaR;

    if(event.api === 'send'){
      sendR = await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        ...event
      });
    }else if(event.api === 'uploadTempMedia'){

      // 获取图片buffer
      const res = await cloud.downloadFile({
        fileID: event.fileID,
      });
      const buffer = res.fileContent;
      console.log('buffer', buffer);

      uploadTempMediaR = await cloud.openapi.customerServiceMessage.uploadTempMedia({
        type: 'image',
        media: {
          contentType: 'image/png',
          value: buffer
        }
      });
      console.log('uploadTempMediaR', uploadTempMediaR);
    }

    return {
      sendR,
      uploadTempMediaR,
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  } catch (e) {
    return e
  }
}