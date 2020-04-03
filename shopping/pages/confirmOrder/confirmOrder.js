let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    shippingAddress: {}, // 收货地址
    confirmOrderData: {}, // 确认订单数据
    orderCartData: {}, // 订单购物车预算
    showShadow: false // 是否显示支付遮罩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let BASECOLOR = appUtils.globalData.BASECOLOR;
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 前景颜色值，仅支持 #ffffff 和 #000000
      backgroundColor: BASECOLOR, // 背景颜色值，有效值为十六进制颜色
    });
    this.setData({BASECOLOR});

    // 获取当前页面的页桢，触发上个界面
    let pages = getCurrentPages();
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      console.log('上一层页面', prePage.data);
      this.setData({
        confirmOrderData: prePage.data.confirmOrderData
      });
    }
  },

  // 订单购物车预算
  orderCartFun () {
    let addressId = this.data.shippingAddress.addressId;
    let {confirmOrderData} = this.data;
    if (addressId) { // 如果存在地址才计算
      appUtils.post(api.order_cart, {
        addressId,
        cartParams: confirmOrderData.map((item) => ({
          number: item.number,
          skuId: item.skuId
        }))
      }).then((res) => {
        console.log('订单购物车预算', res);
        this.setData({
          orderCartData: res
        });
      });
    }
  },

  // 加减商品数量
  modifyNumFun (e) {
    const {type, index} = e.currentTarget.dataset;
    let {confirmOrderData} = this.data;
    let number = confirmOrderData[index].number;
    if (Number(type)) { // 添加
      number++;
    } else {// 减少
      if (number <= confirmOrderData[index].minNumber) {
        appUtils.tips.toast('起售量至少' + confirmOrderData[index].minNumber + confirmOrderData[index].minUnit);
        return;
      }
      if (number > 1) {// 小于等于1就不能再减少了
        number--;
      }
    }
    confirmOrderData[index].number = number;
    this.setData({confirmOrderData});
    this.orderCartFun();
    // 获取当前页面的页桢，触发上个界面
    let pages = getCurrentPages();
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      prePage.updatePrevFun && prePage.updatePrevFun(
        confirmOrderData.map((item) => ({
          number: number, // 只有商品详情跳转到确认订单页面才会执行，因为是单商品，所以只有一个
          skuId: item.skuId
        }))
      );
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 先看缓存是否有收货地址，如果没有则获取收货地址列表的第一条
    let shippingAddress = wx.getStorageSync('shippingAddress');
    if (shippingAddress) {
      this.setData({shippingAddress});
      this.orderCartFun();
    } else {
      appUtils.post(api.address_page, {
        pageNumber: 0,
        pageSize: appUtils.globalData.pageSize
      }).then((res) => {
        console.log('收货地址分页列表', res);
        this.setData({
          shippingAddress: res.content[0] || {}
        });
        this.orderCartFun();
      });
    }
  },

  // 跳转地址对应页面
  toAddressPage (e) {
    let {type} = e.currentTarget.dataset;
    if (type) {// 前往地址列表
      wx.navigateTo({
        url: '/pages/addressList/addressList?addressId=' + this.data.shippingAddress.addressId
      });
    } else {// 新增地址
      wx.navigateTo({
        url: '/pages/addAddress/addAddress'
      });
    }
  },

  // 选择支付方式
  choosePayFun () {
    if (this.data.shippingAddress.addressId) {
      this.showShadowFun();
    } else {
      appUtils.tips.toast('请添加收获地址');
    }
  },

  // 取消冒泡
  stopPropagation () {
    return;
  },

  // 遮罩显示隐藏
  showShadowFun () {
    this.setData({
      showShadow: !this.data.showShadow
    });
  },

  // 支付
  gotoSave (e) {
    let type = Number(e.currentTarget.dataset.type);
    let {confirmOrderData, shippingAddress} = this.data;
    appUtils.orderCreateFun({
      payId: type,
      addressId: shippingAddress.addressId,
      cartParams: confirmOrderData.map((item) => ({
        number: item.number,
        skuId: item.skuId
      }))
    }).then((res) => {
      console.log('支付成功！', res);
      appUtils.tips.toast('支付成功！', {
        close: () => {
          // 跳转订单详情
          wx.reLaunch({
            url: '/pages/orderDetail/orderDetail?orderCode=' + res.orderCode[0]
          });
        }
      });
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});