// pages/wxacode/wxacode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    wx.cloud.callFunction({
      name: 'wxacode',
      data: {
        path: 'page/list/list',
        width: 500
      },
      success(res) {
        // errCode = 48001 指没有权限，企业用户才可以调用
        console.log('获取小程序码：', res.result);
        let buffer = res.result.wxacodeR.buffer;
        let qrImg = "data:image/png;base64," + wx.arrayBufferToBase64(buffer.data);
        _that.setData({
          qrImg
        });
      }
    })
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
})