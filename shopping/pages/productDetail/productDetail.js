let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ossDomain: appUtils.globalData.ossDomain,
    goodsItemData: {},

    selectType: '', // 选择规格
    cartParams: [{ // 订单创建购物车SKU明细
      skuId: '', // cartParams商品SKUID
      number: 0 // cartParams商品购买数量
    }],

    submitType: 0, // 0：确定；1：购物车；2：提交订单；

    showShadow: false,

    toggleType: 1, // 1.商品信息；2.产品详情；

    navHeight: 0, // 导航栏高度
    scrollTop: 0, // 滚动条距离顶部距离
    initDetailTop: 0, // 初始详情距离顶部的距离

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
      this.setData({
        BASECOLOR: res,
        BASECOLOROPACITY: appUtils.hexToRgba(res, 0.1).rgba
      });
    });


    // 获取手机系统信息
    wx.getSystemInfo({
      success: (res) => {
        // 导航高度
        this.setData({
          navHeight: res.statusBarHeight + 46
        });
      }, fail (err) {
        console.log(err);
      }
    });

    if (options.goodsId) {
      this.setData({
        goodsId: options.goodsId
      });
    }

    setTimeout( () => {
      this.setData({
        showSkeleton: false
      })
    }, 1500);

    // this.getGoodsItem();
  },

  onPageScroll(e){
    //参数e会返回滚动条滚动的高度
    let navHeight = this.data.navHeight;
    this.setData({ scrollTop: e.scrollTop });

    wx.createSelectorQuery().select('#detailBox')
      .boundingClientRect((rect) => {
        this.setData({
          toggleType: (rect.top - navHeight > 0) ? 1 : 2
        });
      })
      .exec();
  },

  backFun () {
    wx.navigateBack(); // 返回上一个页面
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 商品详情
  getGoodsItem () {
    appUtils.post(api.goods_market_item, {
      goodsId: this.data.goodsId
    }).then((res) => {
      console.log('商品详情', res);
      this.setData({
        goodsItemData: res
      });
      let cartParams = this.data.cartParams;
      cartParams[0].number = res.minNumber || 0; // 初始数量最少是起售量
      this.setData({cartParams});
      setTimeout(() => { // 接口加载完成，获取详情距离顶部的距离
        wx.createSelectorQuery().select('#detailBox')
          .boundingClientRect((rect) => {
            this.setData({
              initDetailTop: rect.top
            });
          })
          .exec();
      }, 500);
    });
  },

  showShadowFun (e) {
    let type = e && e.currentTarget.dataset.type;
    this.setData({
      showShadow: !this.data.showShadow
    });
    if (type) {
      this.setData({
        submitType: Number(type)
      });
    }
  },
  // 取消冒泡
  stopPropagation () {
    return;
  },

  // 选择规格
  chooseSizeFun () {
    this.showShadowFun();
    this.setData({
      submitType: 0
    });
  },

  // 选择规格
  stateToggle: function (e) {
    let index = Number(e.currentTarget.dataset.index);
    let {goodsItemData, cartParams} = this.data;
    this.setData({
      selectType: index
    });
    // cartParams[0].skuId = goodsItemData.skus[index].skuId;
  },
  // 选择规格
  stateToggle2: function (e) {
    let index = Number(e.currentTarget.dataset.index);
    let {goodsItemData, cartParams} = this.data;
    this.setData({
      selectType2: index
    });
    // cartParams[0].skuId = goodsItemData.skus[index].skuId;
  },

  // 加减商品数量
  modifyNumFun (e) {
    const {type} = e.currentTarget.dataset;
    let {goodsItemData, cartParams} = this.data;
    let number = cartParams[0].number;
    if (Number(type)) { // 添加
      number++;
    } else {// 减少
      if (number <= goodsItemData.minNumber) {
        appUtils.tips.toast('起售量至少' + goodsItemData.minNumber + goodsItemData.minUnit);
        return;
      }
      if (number > 0) {// 小于等于1就不能再减少了
        number--;
      }
    }
    cartParams[0].number = number;
    this.setData({cartParams});
  },

  // 购物车数量输入框
  inputValueFun: function (e) {
    console.log('购物车数量输入框', e.detail.value);
    let value = Number(e.detail.value);
    let {cartParams} = this.data;
    cartParams[0].number = value;
    this.setData({cartParams});
  },

  gotoSave () {
    let {goodsItemData, submitType, cartParams, selectType} = this.data;
    if (!cartParams[0].skuId) {
      appUtils.tips.toast('请选择商品');
      return;
    }
    if (!cartParams[0].number) {
      appUtils.tips.toast('请添加商品数量');
      return;
    }
    if (cartParams[0].number < goodsItemData.minNumber) {
      appUtils.tips.toast('起售量至少' + goodsItemData.minNumber + goodsItemData.minUnit);
      return;
    }
    console.log('订单创建购物车SKU明细：', cartParams);
    this.showShadowFun();
    if (submitType === 1) { // 加入购物车
      appUtils.post(api.cart_update, {
        cartSkuParams: cartParams
      }).then((res) => {
        console.log('购物车SKU列表(支持单个或者批量：添加，删除，更新)', res);
        appUtils.tips.toast('已加入', {
          icon: 'success'
        });
      });
    } else if (submitType === 2) { // 提交订单
      console.log('提交订单');
      this.setData({
        confirmOrderData: [{ // 用于确认订单页面数据展示
          goodsThumb: goodsItemData.goodsThumb,
          goodsTitle: goodsItemData.goodsTitle,
          minUnit: goodsItemData.minUnit,
          minNumber: goodsItemData.minNumber,
          skuTitle: goodsItemData.skus[selectType].skuTitle,
          currentPrice: goodsItemData.skus[selectType].currentPrice,
          skuId: cartParams[0].skuId,
          number: cartParams[0].number
        }]
      });
      wx.navigateTo({
        url: '/pages/confirmOrder/confirmOrder'
      });
    } else { // 确定

    }
  },

  // 子页面触发该页面更新购物车
  updatePrevFun (cartParams) {
    this.setData({
      cartParams: cartParams
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
    return {
      title: this.data.goodsItemData.goodsTitle,
      imageUrl: this.data.goodsItemData.goodsThumb
    };
  }
});