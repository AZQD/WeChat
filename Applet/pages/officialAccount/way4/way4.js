// pages/officialAccount/way4/way4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: true, // 是否展示公众号组件
    errMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindload: function(e){
    console.log('bindload', e);
    this.setData({
      showFlag: true,
      errMsg: e.detail.errMsg
    });
  },

  binderror: function(e){
    console.log('binderror', e);
    this.setData({
      showFlag: false,
      errMsg: e.detail.errMsg
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
})