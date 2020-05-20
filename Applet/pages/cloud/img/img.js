// pages/img/img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://pic2.58cdn.com.cn/images/xq_img/n_v2c0c5abd5d4ff45fd9a74ccb73a59bb41.png', // 二维码url
    transformPath: '', // 识别二维码生成的路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  scanQRCodeFun () {
    let _that = this;
    let imgUrl = this.data.imgUrl;
    wx.cloud.callFunction({
      name: 'img',
      data: {
        api: 'scanQRCode',
        imgUrl
      },
      success (res) {
        console.log('本接口提供基于小程序的条码/二维码识别的API：', res.result);
        const {errCode, codeResults = []} = res.result.scanQRCodeR;
        if (errCode === 0) {
          _that.setData({
            transformPath: codeResults[0].data
          });
        }
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
});