// pages/img/img.js
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
      name: 'img',
      data: {
        // imgUrl: 'https://static.clewm.net/cli/images/beautify_demo/classic/4.png'
        // imgUrl: 'https://gqrcode.alicdn.com/img?type=ali&w=320&h=320&el=m&text=http%3A%2F%2Fma.m.1688.com%2Frush.html%3Fsecret%3DrmPOubH3'
        imgUrl: 'https://pic2.58cdn.com.cn/images/xq_img/n_v249f81bed96d14a07acb67a0144945eef.png'
      },
      success(res) {
        console.log('本接口提供基于小程序的条码/二维码识别的API：', res.result);
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