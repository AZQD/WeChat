// pages/shop/shopList/shopList.js
let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    addressId: '', // 显示选中的地址
    addressPageData: [],
    pageIndex: 0,
    lastPage: false,
    from: '' // mine：个人中心；
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

    if (options.addressId) {
      this.setData({
        addressId: options.addressId
      });
    }
    this.setData({
      from: options.from
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      addressPageData: [],
      pageIndex: 0
    });
    this.getAddressPage();
  },

  // 收货地址分页列表
  getAddressPage () {
    appUtils.post(api.address_page, {
      pageNumber: this.data.pageIndex,
      pageSize: appUtils.globalData.pageSize
    }).then((res) => {
      console.log('收货地址分页列表', res);
      this.setData({
        addressPageData: this.data.addressPageData.concat(res.content),
        lastPage: res.last, // first：是否为第一页；last: 是否为最后一页；
        pageIndex: res.last ? this.data.pageIndex : this.data.pageIndex + 1 // 是否需要加载第二页
      });
    });
  },

  // 新增/编辑地址
  toAddAddress (e) {
    let addressId = e.currentTarget.dataset.addressId;
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?addressId=' + addressId
    });
  },


  // 选择当前地址，并返回上一层页面
  selectAddressFun (e) {
    return;
    if (this.data.from === 'mine') {return;}
    let addressPageData = this.data.addressPageData;
    let index = e.currentTarget.dataset.index;
    // 选中的地址作为收货地址
    wx.setStorageSync('shippingAddress', addressPageData[index]);
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.lastPage) {
      this.getAddressPage();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});