let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    orderStatus: 2, // 订单状态（6：待购单；2：待付款；4：待发货；5：待收货；1：已收货）
    currentOrderIndex: '', // 操作该订单的下标

    listData: [1, 2, 3],
    pageIndex: 0,
    lastPage: false, // 是否最后一页

    goodsItemData: {} // 详情接口数据（代购单才使用）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderStatus) {
      this.setData({
        orderStatus: Number(options.orderStatus)
      });
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   lastPage: false,
    //   pageIndex: 0,
    //   listData: []
    // });
    // this.getList();
  },

  // 获取列表数据
  getList: function () {
    let {orderStatus} = this.data;
    let params = {
      pageNumber: this.data.pageIndex,
      pageSize: appUtils.globalData.pageSize
    };
    if (orderStatus !== 6) { // 常规订单
      params.typeId = 7; // 订单类型（7：建材商城;9：积分商城）
      params.orderStatus = orderStatus;
    }
    appUtils.post(api[orderStatus === 6 ? 'cart_page' : 'order_page'], params).then((res) => {
      console.log(orderStatus === 6 ? '购物车分页列表' : '订单分页列表', res);
      this.setData({
        listData: this.data.listData.concat(res.content),
        lastPage: res.last, // first：是否为第一页；last: 是否为最后一页；
        pageIndex: res.last ? this.data.pageIndex : this.data.pageIndex + 1 // 是否需要加载第二页
      });
    });
  },

  // 顶部菜单切换
  stateToggle: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      lastPage: false,
      orderStatus: Number(type),
      pageIndex: 0,
      listData: []
    });
    this.getList();
  },

  // 购物车分页列表

  // 菜单选中操作
  cartCheckFun (e) {
    let {listData} = this.data;
    let type = Number(e.currentTarget.dataset.type);
    let index = Number(e.currentTarget.dataset.index1);
    let indexChild = Number(e.currentTarget.dataset.index2);
    if (type === 1) { // 取消/全选
      listData[index].checked = !listData[index].checked;
      for (let i = 0; i < listData[index].skus.length; i++) {
        listData[index].skus[i].checked = listData[index].checked;
      }
    } else if (type === 2) { // 取消/选中item
      listData[index].skus[indexChild].checked = !listData[index].skus[indexChild].checked;
      let indexChecked = true;
      for (let i = 0; i < listData[index].skus.length; i++) {
        if (!listData[index].skus[i].checked) {
          indexChecked = false;
          break;
        }
      }
      listData[index].checked = indexChecked;
    }
    this.setData({listData});
  },


  // 设置确认订单的数据
  setGoodsItemFun (e) {
    let index = e.currentTarget.dataset.index;
    let {listData} = this.data;
    // Object.assign 复制对象重新赋值不改变原对象
    let goodsItemData = Object.assign({}, listData[index]); // 用于确认订单页面数据展示
    goodsItemData.skus = [];
    for (let i = 0; i < listData[index].skus.length; i++) {
      if (listData[index].skus[i].checked) { // 过滤出来选中的
        goodsItemData.skus.push(listData[index].skus[i]);
      }
    }
    if (goodsItemData.skus.length > 0) { // 有选中的
      this.setData({goodsItemData});
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder'
      });
    } else {
      appUtils.tips.confirm('', '未选择商品，是否支付该订单中的全部商品？', () => {
        goodsItemData = listData[index]; // 获取所有数据
        this.setData({goodsItemData});
        wx.navigateTo({
          url: '/pages/confirmOrder/confirmOrder'
        });
      }, null, {
        confirmText: '全部支付',
        confirmColor: '#1AAD19'
      });
    }
  },


  // 订单分页列表

  // 待付款
  // 选择支付方式（弹出遮罩）
  paySelect (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentOrderIndex: index
    });
    this.showShadowFun();
  },

  // 真正支付
  payItem (e) {
    let type = Number(e.currentTarget.dataset.type);
    let {listData, currentOrderIndex} = this.data;
    appUtils.orderPayFun({
      payId: Number(type),
      orderCode: listData[currentOrderIndex].orderCode
    }).then((res) => {
      console.log('支付成功！', res);
      appUtils.tips.toast('支付成功！');
      listData.splice(currentOrderIndex, 1); // 在待付款列表移除该订单
      this.setData({listData});
      this.showShadowFun();
    });
  },

  // 取消订单
  cancelItem (e) {
    let orderCode = e.currentTarget.dataset.orderCode;
    let index = e.currentTarget.dataset.index;
    appUtils.tips.confirm('', '确认取消吗？', () => {
      appUtils.post(api.order_cancel, {
        orderCode
      }).then((res) => {
        console.log('取消订单', res);
        let listData = this.data.listData;
        listData.splice(index, 1); // 在待付款列表移除该订单
        this.setData({listData});
      });
    });
  },

  // 待发货
  // 提醒发货
  remindItem (e) {
    let orderCode = e.currentTarget.dataset.orderCode;
    let index = e.currentTarget.dataset.index;
    let formId = e.detail.formId; // 需用真机调试
    // 需要调用接口
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
    let orderCode = e.currentTarget.dataset.orderCode;
    let index = e.currentTarget.dataset.index;
    let formId = e.detail.formId; // 需用真机调试
    // 需要调用接口
    appUtils.post(api.order_finish, {
      orderCode,
      formId
    }).then((res) => {
      console.log('已确认收货', res);
      // appUtils.tips.toast('已确认收货，获得'+res+'积分'); // 动态值
      appUtils.tips.toast(res.orderMsg); // 动态值
      let listData = this.data.listData;
      listData.splice(index, 1); // 在待收货列表移除该订单
      this.setData({listData});
    });
  },

  // 删除订单（暂未用到）
  deleteItem (e) {
    let orderCode = e.currentTarget.dataset.orderCode;
    let index = e.currentTarget.dataset.index;
    appUtils.tips.confirm('', '确认删除吗？', () => {
      appUtils.post(api.order_delete, {
        orderCode
      }).then((res) => {
        console.log('删除订单', res);
        let listData = this.data.listData;
        listData.splice(index, 1);
        this.setData({listData});
      });
    });
  },

  // 查看订单
  toOrderDetail (e) {
    let orderCode = e.currentTarget.dataset.orderCode;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderCode=' + orderCode
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
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});