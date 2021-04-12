// pages/pullDownRefresh/pullDownRefresh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    isNextPage: true, // 是否有下一页
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  // 首页推荐列表
  getList: function () {
    // 模拟接口请求
    console.log('params:', 'isNextPage='+this.data.isNextPage,  'page='+this.data.page, );
    setTimeout(() => {
      let res = {
        list: [11, 22, 33],
        isNextPage: true
      };
      this.setData({
        listData: this.data.listData.concat(res.list),
        isNextPage: res.isNextPage,
        page: res.isNextPage ? this.data.page + 1 : this.data.page // 是否需要加载第二页
      });
      // 隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
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
    // 在当前页面显示导航条加载动画
    // 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showNavigationBarLoading();

    // 重置数据，重新加载
    this.setData({
      listData: [],
      isNextPage: true,
      page: 1
    });
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isNextPage) {
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})