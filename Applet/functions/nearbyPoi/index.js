// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    let nearbyPoiR = await cloud.openapi.nearbyPoi.getList(event);

    return {
      nearbyPoiR
    }
  } catch (e) {
    return e
  }
}