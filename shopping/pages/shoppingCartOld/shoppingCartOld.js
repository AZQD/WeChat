// pages/shop/shopList/shopList.js
let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
const PAGESIZE = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartTotalNumber: 0, // 建材商城购物车商品总数，tabbar组件传递使用
    ossDomain: appUtils.globalData.ossDomain,
    cartPageData: [],
    checkAll: false, // 是否全部选中
    cartParams: [], // 购物车SKU明细(已选中的)
    totalPrice: 0, // 总价
    totalNumber: 0, // 总数
    pageIndex: 0,
    lastPage: false,

    scrollLeft: false // 设置横向滚动条位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCartPage();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      lastPage: false,
      cartPageData: [],
      pageIndex: 0,

      cartParams: [],
      totalPrice: 0,
      totalNumber: 0,
      couponPrice: 0 // 现在暂未做优惠相关功能
    });
    this.getCartPage();

    // 子组件tabbar获取购物车数量使用
    let cartTotalNumber = wx.getStorageSync('cartTotalNumber');
    if (!isNaN(cartTotalNumber)) {
      this.setData({cartTotalNumber});
    }
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
        cartPageData: this.data.cartPageData.concat(res.content),
        lastPage: res.last, // first：是否为第一页；last: 是否为最后一页；
        pageIndex: res.last ? this.data.pageIndex : this.data.pageIndex + 1 // 是否需要加载第二页
      });
    });
  },

  // 加减购物车skus的数量
  modifyNumFun (e) {
    const {index, indexChild, type} = e.currentTarget.dataset;
    console.log(index, indexChild, type);
    let cartPageData = this.data.cartPageData;
    let skusItem = cartPageData[index].skus[indexChild];
    if (Number(type)) { // 添加
      skusItem.number++;
    } else {// 减少
      if (skusItem.number > 1) {// 小于等于1就不能再减少了
        skusItem.number--;
      } else {
        return;
      }
    }
    console.log('数量', skusItem.number);

    appUtils.post(api.cart_update, {
      cartSkuParams: [
        {
          skuId: skusItem.skuId,
          number: skusItem.number
        }
      ]

    }).then((res) => {
      console.log('更新购物车', res);
      this.setData({cartPageData});
      if (skusItem.checked) {// 如果选中状态，就更新结算数据
        this.accountsFun();
      }
      this.setData({
        cartTotalNumber: res.number
      });
      wx.setStorageSync('cartTotalNumber', res.number);
    });
  },

  // 选中和取消选中函数
  checkSkusFun (e) {
    const {index, indexChild} = e.currentTarget.dataset;
    console.log(index, indexChild);
    let cartPageData = this.data.cartPageData;
    cartPageData[index].skus[indexChild].checked = !cartPageData[index].skus[indexChild].checked;
    this.setData({cartPageData});

    let checkAll = false;
    parentFor: // 跳出父级for循环
    for (let i = 0; i < cartPageData.length; i++) {
      for (let j = 0; j < cartPageData[i].skus.length; j++) {
        let skusItem = cartPageData[i].skus[j];
        if (skusItem.checked) {
          checkAll = true;
        } else {
          checkAll = false;
          break parentFor;
        }
      }
    }
    this.setData({checkAll});
    this.accountsFun();
  },

  // 全选按钮
  checkAllSkusFun () {
    let cartPageData = this.data.cartPageData;
    if (cartPageData.length) { // 有数据才可以操作
      let checkAll = this.data.checkAll;
      checkAll = !checkAll;
      for (let i = 0; i < cartPageData.length; i++) {
        for (let j = 0; j < cartPageData[i].skus.length; j++) {
          let skusItem = cartPageData[i].skus[j];
          skusItem.checked = checkAll;
        }
      }
      this.setData({cartPageData});
      this.setData({checkAll});
      if (checkAll) {
        this.accountsFun();
      } else {
        this.setData({
          cartParams: [],
          totalPrice: 0,
          totalNumber: 0,
          couponPrice: 0 // 现在暂未做优惠相关功能
        });
      }
    }
  },

  // 删除item
  deleteSkusFun (e) {
    let that = this;
    const {index, indexChild} = e.currentTarget.dataset;
    let cartPageData = this.data.cartPageData;
    let skusItem = cartPageData[index].skus[indexChild];

    console.log(index, indexChild);
    console.log(skusItem);
    wx.showModal({
      content: '确认删除该商品吗？',
      confirmColor: '#FB0E04',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定');
          appUtils.post(api.cart_update, {
            cartSkuParams: [
              {
                skuId: skusItem.skuId,
                number: 0
              }
            ]
          }).then((res) => {
            console.log('更新购物车', res);
            this.setData({
              scrollLeft: true,
              cartTotalNumber: res.number
            });
            wx.setStorageSync('cartTotalNumber', res.number);
            cartPageData[index].skus.splice(indexChild, 1);
            if (!cartPageData[index].skus.length) {
              cartPageData.splice(index, 1);
            }
            this.setData({cartPageData});
            if (skusItem.checked) {// 如果选中状态，就更新结算数据
              this.accountsFun();
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  // 结算数据
  accountsFun () {
    let cartPageData = this.data.cartPageData;
    // let totalPrice = 0, totalNumber = 0, cartParams = [];
    let cartParams = [];
    for (let i = 0; i < cartPageData.length; i++) {
      for (let j = 0; j < cartPageData[i].skus.length; j++) {
        let skusItem = cartPageData[i].skus[j];
        if (skusItem.checked) {
          cartParams.push(skusItem);
          // totalPrice += skusItem.currentPrice * skusItem.number;
          // totalNumber += skusItem.number;
        }
      }
    }
    // totalPrice = totalPrice.toFixed(2);//保留两位小数

    appUtils.post(api.order_cart, {
      cartParams
    }).then((res) => {
      console.log('订单购物车预算', res);
      this.setData({
        cartParams,
        totalPrice: res.orderPrice,
        totalNumber: res.goodsNumber,
        couponPrice: res.couponPrice // 现在暂未做优惠相关功能
      });
      console.log('结算数据totalPrice', res.orderPrice);
      console.log('结算数据totalNumber', res.goodsNumber);
    });
  },

  // 跳转确认订单
  toConfirmOrder () {
    console.log(this.data);
    let {cartPageData, totalPrice, totalNumber, cartParams} = this.data;
    // 购物车有数据&&有选中的商品
    console.log(cartPageData.length);
    console.log(totalPrice);
    console.log(totalNumber);
    if (cartPageData.length && totalNumber) { // 因为有价格面议，所以totalPrice有可能=0；
      let goodsItemData = {}; // 用于确认订单页面数据展示
      goodsItemData.skus = cartParams;
      this.setData({goodsItemData});
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
        cartPageData: [],
        pageIndex: 0,

        cartParams: [],
        totalPrice: 0,
        totalNumber: 0,
        couponPrice: 0 // 现在暂未做优惠相关功能
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