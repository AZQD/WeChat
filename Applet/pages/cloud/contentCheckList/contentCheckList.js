// pages/contentCheck/contentCheck.js
const regeneratorRuntime = require('../../../utils/runtime');
const PAGESIZE = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    pageIndex: 0,
    lastPage: false // 是否最后一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData();
  },

  getListData(){
    let that = this;
    let {listData, pageIndex, lastPage} = this.data;
    const db = wx.cloud.database({});
    db.collection('contentCheckData').where({
      // _openid: 'user-open-id', // 假设用户的 openid 为 user-open-id
    }).skip(pageIndex * PAGESIZE)
      .limit((pageIndex + 1) * PAGESIZE)
      .orderBy('timestamp', 'desc') // 倒序
      .get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log('listData:', res.data);
        that.setData({
          lastPage: res.data.length !== PAGESIZE,
          pageIndex: pageIndex + 1,
          listData: listData.concat(res.data),
        });
      },
      fail: function (error) {
        console.log('error:', error);
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
    if (!this.data.lastPage) {
      this.getListData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});