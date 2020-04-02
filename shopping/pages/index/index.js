// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      // {
      //   type: 1,
      //   path: 'index/index',
      //   name: '首页'
      // },
      // {
      //   type: 0,
      //   path: 'productDetail/productDetail',
      //   name: '商品详情'
      // },
      // {
      //   type: 1,
      //   path: 'shoppingCart/shoppingCart',
      //   name: '购物车',
      // },
      {
        type: 0,
        path: 'confirmOrder/confirmOrder',
        name: '确认订单'
      },
      {
        type: 0,
        path: 'myOrder/myOrder',
        name: '我的订单'
      },
      {
        type: 0,
        path: 'orderDetail/orderDetail',
        name: '订单详情'
      },
      {
        type: 0,
        path: 'addressList/addressList',
        name: '地址管理'
      },
      {
        type: 0,
        path: 'addAddress/addAddress',
        name: '新增地址'
      },
      {
        type: 1,
        path: 'mine/mine',
        name: '个人中心'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  jumpPageFun(e){
    const {type, path} = e.currentTarget.dataset;
    let url = `/pages/${path}`;
    if(type){
      wx.switchTab({url});
    }else{
      wx.navigateTo({url});
    }
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