// pages/shop/shopList/shopList.js
let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
const PAGESIZE = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,

    listData: [],
    checkAll: false, // 是否全部选中
    orderCartData: {}, // 购物车价格计算


    pageIndex: 0,
    lastPage: false,

    scrollLeft: false // 设置横向滚动条位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      listData: [],
      lastPage: false,
      pageIndex: 0,
      checkAll: false,
      orderCartData: {},
      scrollLeft: false
    });
    this.getCartPage();
  },

  // 购物车分页列表
  getCartPage () {
    appUtils.post(api.cart_page, {
      pageNumber: this.data.pageIndex,
      pageSize: PAGESIZE
    }).then((res) => {
      console.log('购物车分页列表', res);
      this.setData({
        checkAll: false, // 每加载一页重置一次checkAll
        listData: this.data.listData.concat(res.content),
        lastPage: res.last, // first：是否为第一页；last: 是否为最后一页；
        pageIndex: res.last ? this.data.pageIndex : this.data.pageIndex + 1 // 是否需要加载第二页
      });
    });
  },

  // 结算数据
  accountsFun () {
    let listData = this.data.listData;
    let cartParams = [];
    for (let i = 0; i < listData.length; i++) {
      let cartItem = listData[i];
      if (cartItem.checked) {
        cartParams.push(cartItem);
      }
    }
    appUtils.post(api.order_cart, {
      cartParams
    }).then((res) => {
      console.log('订单购物车预算', res);
      this.setData({
        orderCartData: res
      });
    })
      .catch((err) => {
        this.setData({
          orderCartData: {}
        });
      });
  },

  // 加减购物车skus的数量
  modifyNumFun (e) {
    const {index, type} = e.currentTarget.dataset;
    let listData = this.data.listData;
    let cartItem = listData[index];
    if (Number(type)) { // 添加
      cartItem.number++;
    } else {// 减少
      if (cartItem.number <= cartItem.minNumber) {
        appUtils.tips.toast('起售量至少' + cartItem.minNumber + cartItem.minUnit);
        return;
      }
      if (cartItem.number > 1) {// 小于等于1就不能再减少了
        cartItem.number--;
      } else {
        return;
      }
    }
    console.log('数量', cartItem.number);

    appUtils.post(api.cart_update, {
      cartSkuParams: [
        {
          skuId: cartItem.skuId,
          number: cartItem.number
        }
      ]

    }).then((res) => {
      console.log('更新购物车', res);
      this.setData({listData});
      if (cartItem.checked) {
        this.accountsFun();
      }
    });
  },

  // 选中和取消选中函数
  checkSkusFun (e) {
    const {index} = e.currentTarget.dataset;
    let listData = this.data.listData;
    listData[index].checked = !listData[index].checked;
    this.setData({listData});

    let checkAll = false;
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].checked) {
        checkAll = true;
      } else {
        checkAll = false;
        break;
      }
    }
    this.setData({checkAll});
    this.accountsFun();
  },

  // 全选按钮
  checkAllSkusFun () {
    let listData = this.data.listData;
    if (listData.length) { // 有数据才可以操作
      let checkAll = this.data.checkAll;
      checkAll = !checkAll;
      for (let i = 0; i < listData.length; i++) {
        listData[i].checked = checkAll;
      }
      this.setData({
        listData,
        checkAll
      });
      this.accountsFun();
    }
  },

  // 删除item
  deleteFun (e) {
    const {index} = e.currentTarget.dataset;
    let listData = this.data.listData;
    let cartItem = listData[index];
    wx.showModal({
      content: '确认删除该商品吗？',
      confirmColor: '#FB0E04',
      success: (res) => {
        if (res.confirm) {
          appUtils.post(api.cart_update, {
            cartSkuParams: [
              {
                skuId: cartItem.skuId,
                number: 0
              }
            ]
          }).then((res) => {
            console.log('更新购物车', res);
            this.setData({
              scrollLeft: true
            });
            listData.splice(index, 1);
            this.setData({listData});
            if (cartItem.checked) {// 如果选中状态，就更新结算数据
              this.accountsFun();
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  // 跳转确认订单
  toConfirmOrder () {
    console.log(this.data);
    let {listData} = this.data;
    let confirmOrderData = listData.filter((item) => item.checked);
    // 购物车有数据&&有选中的商品
    if (confirmOrderData.length) {
      // 用于确认订单页面数据展示
      this.setData({confirmOrderData});
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder'
      });
    } else {
      appUtils.tips.alert('请选中要结算的商品');
    }
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
    setTimeout(() => {
      this.setData({
        lastPage: false,
        listData: [],
        pageIndex: 0
      });
    }, 200);
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
      this.getCartPage();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});