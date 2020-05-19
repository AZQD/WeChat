// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    let logisticsR = await cloud.openapi.logistics.getOrder({
      orderId: event.orderId,
      openid: wxContext.OPENID,
      deliveryId: 'ZTO'
    });

    return {
      logisticsR,
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  } catch (e) {
    return e
  }
}