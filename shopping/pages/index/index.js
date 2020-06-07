let api = require('../../api.js');
let appUtils = require('../../utils/appUtils.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSwiper1: 0, // 初始展示第一个轮播
    bannerArr1: [ // swiper-item数量
      {
        id: 1
      }
    ],
    currentSwiper2: 0, // 初始展示第一个轮播
    bannerArr2: [ // swiper-item数量
      {
        id: 1
      }
    ],
    currentSwiper3: 0, // 初始展示第一个轮播
    bannerArr3: [ // swiper-item数量
      {
        id: 1
      }
    ],
    tabList: [
      {
        id: 0,
        desc: {
          desc1: '全部',
          desc2: '精选物品',
        }
      },
      {
        id: 1,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 2,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 3,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 4,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 5,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 6,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 7,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      },
      {
        id: 8,
        desc: {
          desc1: '手机配件',
          desc2: '漂亮最重要',
        }
      }
    ],
    currentTab: 0,
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
    setTimeout( () => {
      this.setData({
        showSkeleton: false,
        bannerArr1: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        bannerArr2: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        bannerArr3: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
      })
    }, 3000);
  },

  swiperChange1: function (e) {
    this.setData({
      currentSwiper1: e.detail.current
    });
  },
  swiperChange2: function (e) {
    console.log(e.detail);
  },
  swiperChange3: function (e) {
    this.setData({
      currentSwiper3: e.detail.current
    });
  },

  _switchNav: function (e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current
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
});