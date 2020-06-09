// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {

    let msgR = false;
    let imageR = false;

    //  检查文本内容是否违规，返回校验结果
    if(event.msg){
      msgR = await cloud.openapi.security.msgSecCheck({
        content: event.msg
      })
    }

    //  检查图像内容是否违规
    if (event.img) {
      imageR = await cloud.openapi.security.imgSecCheck({
        media: {
          header: {
            'Content-Type': 'application/octet-stream'
          },
          contentType: 'image/png',
          value: Buffer.from(event.img)
        }
      })
    }
    console.log(666, msgR);
    return {
      msgR,
      imageR,
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  } catch (e) {
    console.log(444, e);
    return e
  }
}