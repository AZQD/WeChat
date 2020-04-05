let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    orderCode: '', // 订单编号
    orderDetailData: {},
    paySelectType: 1, // 1：待付款：立即支付；2：已收货：再来一单

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

    // console.log('options', options);
    this.setData({
      orderCode: options.orderCode
    });

    setTimeout( () => {
      this.setData({
        showSkeleton: false
      })
    }, 1500);

    this.getOrderItem();
  },

  // 订单详情
  getOrderItem () {
    let orderCode = this.data.orderCode;
    appUtils.post(api.order_item, {
      orderCode
    }).then((res) => {
      console.log('订单详情', res);
      this.setData({
        orderDetailData: res
      });
    });
  },

  // 待付款/已完成
  // 选择支付方式（弹出遮罩）
  paySelect (e) {
    this.showShadowFun();
    this.setData({
      paySelectType: Number(e.currentTarget.dataset.type)
    });
  },

  // 真正支付（待付款/已完成）
  payItem (e) {
    let type = Number(e.currentTarget.dataset.type);
    let {orderCode, orderDetailData, paySelectType} = this.data;
    if (paySelectType === 1) { // 1：待付款：立即支付；
      appUtils.orderPayFun({
        payId: type,
        orderCode
      }).then((res) => {
        console.log('支付成功！', res);
        appUtils.tips.toast('支付成功！');
        orderDetailData.orderStatus = 4;
        this.setData({orderDetailData});
        this.showShadowFun();
      });
    } else if (paySelectType === 2) { // 2：已收货：再来一单
      let cartParams = [];
      for (let i = 0; i < orderDetailData.orderItemList.length; i++) {
        let item = orderDetailData.orderItemList[i];
        cartParams.push({
          skuId: item.skuId,
          number: item.number
        });
      }
      appUtils.orderCreateFun({
        payId: type,
        addressId: orderDetailData.orderAddress.addressId,
        cartParams
      }).then((res) => {
        console.log('支付成功！', res);
        appUtils.tips.toast('支付成功！');
        this.showShadowFun();
      });
    }
  },

  // 取消订单
  cancelItem () {
    let orderCode = this.data.orderCode;
    appUtils.tips.confirm('', '确认取消吗？', () => {
      appUtils.post(api.order_cancel, {
        orderCode
      }).then((res) => {
        console.log('取消订单', res);
        let orderDetailData = this.data.orderDetailData;
        orderDetailData.orderStatus = 3;
        this.setData({orderDetailData});
        appUtils.tips.toast('已取消', {
          close: () => {
            wx.navigateBack(); // 返回上一个页面
          }
        });
      });
    });
  },

  // 待发货
  // 提醒发货
  remindItem (e) {
    let orderCode = this.data.orderCode;
    // 需要调用接口
    let formId = e.detail.formId; // 需用真机调试
    appUtils.post(api.order_message_delivery, {
      orderCode,
      formId
    }).then((res) => {
      console.log('已提醒发货', res);
      appUtils.tips.toast('已提醒发货', {
        icon: 'success'
      });
    });
  },

  // 待收货
  // 确认收货
  confirmItem (e) {
    let orderCode = this.data.orderCode;
    let formId = e.detail.formId; // 需用真机调试
    // 需要调用接口
    appUtils.post(api.order_finish, {
      orderCode,
      formId
    }).then((res) => {
      console.log('已确认收货', res);
      // appUtils.tips.toast('已确认收货，获得'+res+'积分'); // 动态值
      appUtils.tips.toast(res.orderMsg); // 动态值
      let orderDetailData = this.data.orderDetailData;
      orderDetailData.orderStatus = 1; // 已完成
      this.setData({orderDetailData});
    });
  },

  // 已收货
  // 再来一单（见上方代码）

  // 申请售后
  toAfterSale () {
    let orderCode = this.data.orderCode;
    wx.navigateTo({
      url: '/pages/purchaser/afterSale/afterSale?orderCode=' + orderCode
    });
  },

  // 删除订单（暂未用到）
  deleteItem (e) {
    let orderCode = this.data.orderCode;
    let shopId = e.currentTarget.dataset.shopId;
    appUtils.tips.confirm('', '确认删除吗？', () => {
      appUtils.post(api.order_delete, {
        orderCode
      }).then((res) => {
        console.log('删除订单', res);
        wx.navigateBack();
      });
    });
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