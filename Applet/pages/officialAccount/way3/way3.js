const regeneratorRuntime = require('../../../utils/runtime');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公众号在云服务的fileID
    official_account_qrcode_fileID: 'cloud://liuchaojie-dev.6c69-liuchaojie-dev-1302189063/private/official_account_qrcode.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击客服时触发
  async clickContact(e){
    console.log('点击客服时触发：', e);
    const mediaId = await this.getMediaIDFun(this.data.official_account_qrcode_fileID);
    wx.cloud.callFunction({
      name: 'customerServiceMessage',
      data: {
        api: 'send',
        msgtype: 'image',
        image: {
          mediaId
        }
      },
      success(res) {
        // res.errCode = 45047 超出发送消息限制
        console.log('发送客服消息给用户：', res.result);
        if(res.result.sendR && (res.result.sendR.errCode === 0)){
          wx.showToast({
            title: '发送成功！',
          });
        }else{
          wx.showToast({
            icon: 'none',
            title: `错误码：${res.result.errCode}`,
          });
        }
      }
    })
  },

  getMediaIDFun(fileID){
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'customerServiceMessage',
        data: {
          api: 'uploadTempMedia',
          fileID
        },
        success(res) {
          console.log('获取mediaId：', res.result);
          const {uploadTempMediaR = {mediaId: ''}} = res.result;
          resolve(uploadTempMediaR.mediaId);
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});