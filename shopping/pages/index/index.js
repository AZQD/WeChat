let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSwiper: 1, // 初始展示第一个轮播
    bannerArr: [ // swiper-item数量
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ],
    showSkeleton: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 定义主题色
    app.baseColorFun().then(res => {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 前景颜色值，仅支持 #ffffff 和 #000000
        backgroundColor: res, // 背景颜色值，有效值为十六进制颜色
      });
      this.setData({BASECOLOR: res});
    });
    setTimeout( () => {
      this.setData({
        showSkeleton: false
      })
    }, 3000);
  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
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