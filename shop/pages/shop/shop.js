// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedData:[
      {
        id: 1,
        goodImg: '/images/shop/goodImg.png',
        price: 100
      },
      {
        id: 2,
        goodImg: '/images/shop/goodImg.png',
        price: 200
      },
      {
        id: 3,
        goodImg: '/images/shop/goodImg.png',
        price: 300
      },
      {
        id: 4,
        goodImg: '/images/shop/goodImg.png',
        price: 400
      },
      {
        id: 5,
        goodImg: '/images/shop/goodImg.png',
        price: 500
      },
      {
        id: 6,
        goodImg: '/images/shop/goodImg.png',
        price: 600
      },
      {
        id: 7,
        goodImg: '/images/shop/goodImg.png',
        price: 700
      },
      {
        id: 8,
        goodImg: '/images/shop/goodImg.png',
        price: 800
      },
    ],
    activeMenu: 0,
    toggleData: [
      {
        id: 1,
        desc1: '全部拼团',
        desc2: '来拼吧'
      },
      {
        id: 2,
        desc1: '爆款热卖',
        desc2: '百万人在拼'
      },
      {
        id: 3,
        desc1: '百元内好物',
        desc2: '百万人在拼'
      },
      {
        id: 4,
        desc1: '低价拼',
        desc2: '血拼进行'
      },
      {
        id: 5,
        desc1: '全部拼团',
        desc2: '来拼吧'
      },
      {
        id: 6,
        desc1: '爆款热卖',
        desc2: '百万人在拼'
      },
      {
        id: 7,
        desc1: '百元内好物',
        desc2: '百万人在拼'
      },
      {
        id: 8,
        desc1: '低价拼',
        desc2: '血拼进行'
      }
    ],
    listData: [
      {
        id: 1,
        goodImg: '/images/shop/goodImg.png',
        desc1: '维尼小巷风单肩菱格链条斜挎宝',
        desc2: '菱格链条时尚单肩包',
        avatarsArr: [
          {
            id: 1,
            avatarImg: 'http://i.bootstrapmb.com/2019/10/211026214.jpg'
          },
          {
            id: 2,
            avatarImg: 'http://i.bootstrapmb.com/2020/2/101248148.jpg'
          },
          {
            id: 3,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          },
          {
            id: 4,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          }
        ],
        number: '12948',
        currentPrice: '268',
        originPrice: '300',
        regiment: '99',
      },
      {
        id: 2,
        goodImg: '/images/shop/goodImg.png',
        desc1: '维尼小巷风单肩菱格链条斜挎宝',
        desc2: '菱格链条时尚单肩包',
        avatarsArr: [
          {
            id: 1,
            avatarImg: 'http://i.bootstrapmb.com/2019/10/211026214.jpg'
          },
          {
            id: 2,
            avatarImg: 'http://i.bootstrapmb.com/2020/2/101248148.jpg'
          },
          {
            id: 3,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          },
          {
            id: 4,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          }
        ],
        number: '12948',
        currentPrice: '268',
        originPrice: '300',
        regiment: '99',
      },
      {
        id: 3,
        goodImg: '/images/shop/goodImg.png',
        desc1: '维尼小巷风单肩菱格链条斜挎宝',
        desc2: '菱格链条时尚单肩包',
        avatarsArr: [
          {
            id: 1,
            avatarImg: 'http://i.bootstrapmb.com/2019/10/211026214.jpg'
          },
          {
            id: 2,
            avatarImg: 'http://i.bootstrapmb.com/2020/2/101248148.jpg'
          },
          {
            id: 3,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          },
          {
            id: 4,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          }
        ],
        number: '12948',
        currentPrice: '268',
        originPrice: '300',
        regiment: '99',
      },
      {
        id: 4,
        goodImg: '/images/shop/goodImg.png',
        desc1: '维尼小巷风单肩菱格链条斜挎宝',
        desc2: '菱格链条时尚单肩包',
        avatarsArr: [
          {
            id: 1,
            avatarImg: 'http://i.bootstrapmb.com/2019/10/211026214.jpg'
          },
          {
            id: 2,
            avatarImg: 'http://i.bootstrapmb.com/2020/2/101248148.jpg'
          },
          {
            id: 3,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          },
          {
            id: 4,
            avatarImg: 'http://i.bootstrapmb.com/2018/12/200224420.jpg'
          }
        ],
        number: '12948',
        currentPrice: '268',
        originPrice: '300',
        regiment: '99',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toggleItemFun: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      activeMenu: type
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
})