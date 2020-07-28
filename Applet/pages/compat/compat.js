// pages/compat/compat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList: [
          {
              id: 0,
              name: '全部'
          },
          {
              id: 1,
              name: '北京'
          },
          {
              id: 2,
              name: '上海'
          },
          {
              id: 3,
              name: '广州'
          },
          {
              id: 4,
              name: '哈尔滨'
          },
          {
              id: 5,
              name: '呼和浩特'
          },
          {
              id: 10000,
              name: '其他'
          }
      ],
      currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

    // 切换tab
    _switchNav: function (e) {
        let tabList = this.data.tabList;
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: tabList[index].id
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